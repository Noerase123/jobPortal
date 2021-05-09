var BASE_URL = 'http://localhost:3000/api'

axios.defaults.baseURL = BASE_URL

const token = sessionStorage.getItem('token')

var id, poster_name
var listOrigin = document.getElementById('listData')

async function userData() {
    try {
        let response = await axios.post('/user/userData',{},{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        let data = response.data
        poster_name = `${data.user.firstName} ${data.user.lastName}`
        
    } catch (error) {
        console.log(error)
    }
}

function dateToYMD(date) {
    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
}

function createJobTemp(jobID, jobTitle, location, payment, poster_name, timePosted) {
    let card = document.createElement('li')
        card.classList.add('card')
        card.classList.add('list-group-item')
        card.setAttribute('style','background-color:#fff')
    let flex = document.createElement('div')
        flex.classList.add('d-flex')
        flex.classList.add('justify-content-between')
    let div1 = document.createElement('div')
    let p = document.createElement('p')
    let p2 = document.createElement('p')
    let link = document.createElement('a')
        link.setAttribute('style','font-size:22px;color: #3A5F0B;')
        link.setAttribute('href','#')
        link.setAttribute('id', jobID)
        link.setAttribute('onclick','getData(this.id)')
        link.setAttribute('data-toggle', 'modal')
        link.setAttribute('data-target','.bd-example-modal-lg')
    let div2 = document.createElement('div')
        div2.setAttribute('style','position: absolute; right:0;')
    
    card.appendChild(flex)
    flex.appendChild(div1)
    div1.appendChild(p)
    p.appendChild(link)
    link.innerHTML = `<i class="fas fa-suitcase job-title" style="margin-right: 10px;"></i>${jobTitle}`
    div1.appendChild(p2)
    p2.innerHTML = `<i class="fas fa-map-pin" style="margin-right: 14px;"></i> ${location}
                    <br/><br/>
                    <i class="fas fa-money-bill-wave-alt" style="margin-right: 5px;"></i> ${payment}`
    flex.appendChild(div2)
    // div2.innerHTML = `<p style="color:grey;">Recruiter was hiring ${timePosted}</p>
    //                     <p style="color:grey;">Posted by ${poster_name}</p>`
    div2.innerHTML = `<p style="color:grey;">Recruiter was hiring 4 hours ago</p>
                        <p style="color:grey;">Posted by ${poster_name}</p>`

    return card
}

async function jobList() {

    try {
        await axios.get('/job/list', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            let data = response.data.data
            if (data.length > 0) {
                let postPerPage = 10
                let currentPage = 1
                let iLastPost = currentPage * postPerPage
                let iFirstPost = iLastPost - postPerPage
                let currentPost = data.slice(iFirstPost, iLastPost)

                currentPost.map(row => {
                    listOrigin.appendChild(createJobTemp(row['uuid'], row['title'], row['city'], row['payment_amount'], row['poster_name'], row['time_posted']))
                })
            } else {
                listOrigin.innerHTML = '<h4 class="text-start"><b>No Data at the moment.</b></h4>'
                $('#pagination').html('')
                $('#pagination-lower').html('')
            }
        })
        .catch(error => {
            console.error(error)
            listOrigin.innerHTML = '<h3 class="d-flex justify-content-center"><b>Server Error</b></h3>'
            $('#pagination').html('')
            $('#pagination-lower').html('')
        });
    }
    catch(e) {
        console.log(e)
    }
    
}

async function getData(jobID) {
    try {
        id = jobID
        await axios.get('/job/list/' + jobID, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            let data = res.data
            let date = new Date(data.date_created)
            // console.log(data)
            $('#jobTitle').html(data.title)
            $('#amount').html(data.payment_amount)
            $('#jobLocation').html(data.city)
            $('#jobDescription').html(data.description)
            $('#jobPoster').html(data.poster_name)
            $('#datePosted').html(dateToYMD(date))
            
            $('#jobEmail').html(`<b>${data.email}</b>`)
            $('#jobPhone').html(`<b>${data.phone_number}</b>`)
            $('#jobAdd').html(`<b>${data.address}</b>`)
            $('#jobPoster2').html(`<b>${data.poster_name}</b>`)
        })
        .catch(error => console.log(error))
    }
    catch (error) {
        console.log(error)
    }
}

async function PostJob() {
    try {
        // let response = await axios.post('/user/userData',{},{
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // })

        // let data = response.data
        // let poster_name = `${data.user.firstName} ${data.user.lastName}`

        const payload = {
            title: $('#title').val(),
            description: $('#description').val(),
            payment_amount: $('#payment_amount').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            email: $('#email').val(),
            phone_number: $('#phone_number').val(),
            address: $('#address').val(),
            poster_name: poster_name
        }

        await axios.post('/job/add', payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                // location.reload()
                let data = res.data.getData
                $('#postJobModal').modal('hide')
                listOrigin.appendChild(createJobTemp(data['uuid'], data['title'], data['location'], data['payment'], data['poster_name'], data['timePosted']))
            })
            .catch(err => console.log(err))
    }
    catch(e) {
        console.log(e)
    }
}

function updateJob(label, id) {

    if (label === 'update') {

        const payload = {
            title: $('#title').val(),
            description: $('#description').val(),
            payment_amount: $('#payment_amount').val(),
            city: $('#city').val(),
            state: $('#state').val(),
            email: $('#email').val(),
            phone_number: $('#phone_number').val(),
            address: $('#address').val(),
            poster_name: 'John Smith'
        }
    
        axios.put('/job/update/' + id, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(error => console.log(error))
            
    } else if (label === 'delete') {
    
        axios.put('/job/delete/' + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                // console.log(res.data)
                $('.bd-example-modal-lg').modal('hide')
            })
            .catch(error => console.log(error))
    }
}

function validation() {

    let val = $('#payment_amount').val()
    $('#payment_amount').val(`$${val}`)
}

function jobFilter() {
    var value = $(this).val().toLowerCase();
    $("#jobList li ").filter(function() {
        setTimeout(() => {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        }, 350);
    });
}

function sessionValidation() {
    if (token === 'undefined') {
        location.href = "index.html"
        sessionStorage.removeItem('token')
    }
    else {
        localStorage.href = 'jobListings.html'
    }
}

function init() {
    sessionValidation()

    jobList()

    document.getElementById('logoutBtn').onclick = function() {
        sessionStorage.removeItem('token')
        location.href = "index.html"
    }
    document.getElementById('logoutBtn2').onclick = function() {
        sessionStorage.removeItem('token')
        location.href = "index.html"
    }
    document.getElementById('searchBar').onkeyup = jobFilter
    document.getElementById('JobForm').addEventListener('submit', function(e) {
        e.preventDefault()
        validation()
        PostJob()
    })
    document.getElementById('edit').addEventListener('click', function () {

        // updateJob('update',id)
    })
    document.getElementById('delete').addEventListener('click', function () {
        updateJob('delete', id)
    })
}

window.onload = init()
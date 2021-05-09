var BASE_URL = 'http://localhost:3000/api'

axios.defaults.baseURL = BASE_URL

var loginBtn = document.getElementById("loginBtn")
var formLogin = document.getElementById("formLogin")

//==========================LOGIN==========================================
function init() {
    if (sessionStorage.key('token') !== null) {
        
        if (sessionStorage.getItem('token') !== undefined) {
            location.href = "jobListings.html"
        } else if (sessionStorage.getItem('token') !== null) {
            location.href = 'jobListings.html'
        }
    }
    
}

formLogin.addEventListener('submit', function(e) {
    e.preventDefault()

    try {
        const payload = {
            username: $('#inputUsername').val(),
            password: $('#inputPass').val()
        }

        axios.post('/user/login', payload)
        .then(res => {
            console.log(res)
            let data = res.data
            let token = data.token
            let authLogin = data.message
            
            if (authLogin === 'Auth Login') {
                sessionStorage.setItem('token',token)
                location.href = "jobListings.html"
            } else {
                $('.bd-example-modal-sm').modal('show')
            }

        }).catch(error => console.log(error))
    } catch(error) {
        console.log(error)
    }

})

window.onload = init()
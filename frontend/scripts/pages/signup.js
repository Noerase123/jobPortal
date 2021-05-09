let BASE_URL = 'http://localhost:3000/api'
axios.defaults.baseURL = BASE_URL

var signupForm = document.getElementById('signupForm')

async function signup() {
    try {
        
        const payload = {
            firstname: $('#inputFirstName').val(),
            lastname: $('#inputLastName').val(),
            location: $('#inputLocation').val(),
            email: $('#inputEmail').val(),
            phone_number: $('#inputContactNum').val(),
            username: $('#inputUsername').val(),
            password: $('#inputPassword').val()
        }
    
        let confirmPass = $('#inputCPassword').val()
        let pass = $('#inputPassword').val()
        if (confirmPass === pass) {
            
            axios.post('/user/signup', payload)
                .then(res => {
                    // console.log(res.data)
                    setTimeout(() => {
                        location.href = "index.html"
                    }, 2000);
                })
                .catch(error => console.log(error))
        }
        else {
            
        }

    } catch (error) {
        console.log(error)
    }
}

signupForm.addEventListener('submit', function(e) {
    e.preventDefault()

    signup()
})

function init() {

}

window.onload = init()
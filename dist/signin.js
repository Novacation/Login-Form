const $ = require('jquery')

//executado quando o usuário clica no botão sign-in

const sendSignin = async () => {
  try {
    const login = $('#loginForm').val()
    const password = $('#passwordForm').val()

    const response = await $.ajax({
      url: "http://localhost:8081/Auth/check-signin",
      method: "POST",
      data: {
        login: login,
        password: password
      }
    })

    return response

  } catch (error) {
    console.log(`Error: ${error}`)
  }
}


$("#btn-signin").click(() => {
  (async () => {
    try {
      const response = await sendSignin()
      console.log(response.access)
      if (response.access) {

        const accessToken = {
          token: response.token
        }

        window.localStorage.setItem('noVacationToken', JSON.stringify(accessToken))
        
        window.location.href = "http://localhost:8081/Auth/main-page"

      } else {
        const errorMessage = response.message

        alert(errorMessage)
      }
    } catch (error) {
      alert('The login process failed.')
    }
  })()
})


$("#btn-signup").click(e => {
  window.location.href = "http://localhost:8081/Auth/signup"
})
const $ = require('jquery')


$("#btn-signup").click(async () => {
    try {
        const login = $("#loginForm").val()
        const password = $("#passwordForm").val()
        const confirmPassword = $("#confirmPasswordForm").val()

        const verifyResponse = verifyFormLength(login, password, confirmPassword)
        if (verifyResponse.access) {
            const response = await sendSignup(login, password)

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
        } else {
            alert(verifyResponse.errorMessage)
        }
    } catch (error) {
        console.log(`btn-signup error: ${error}`)
        return false
    }
})


$("#btn-signin").click(() => {
    window.location.href = "http://localhost:8081/Auth/signin"
})


const verifyFormLength = (login, password, confirmPassword) => {
    let message = ''
    let isOk = true

    if (login.length < 6) {
        message += 'Login inválido. Precisa ter pelo menos 6 caracteres.'
        isOk = false
    }

    if (password.length < 6) {
        message += '\nSenha inválida. Precisa ter pelo menos 6 caracteres.'
        isOk = false
    }

    if (password != confirmPassword) {
        console.log(password)
        console.log(confirmPassword)
        message += '\nOs campos de senha precisam ser iguais.'
        isOk = false
    }

    if (isOk) {
        return {
            access: true
        }
    } else {
        return {
            access: false,
            errorMessage: message
        }
    }
}

const sendSignup = async (login, password) => {
    try {
        const response = await $.ajax({
            url: "http://localhost:8081/Auth/check-signup",
            method: "POST",
            data: {
                login: login,
                password: password
            }
        })

        return response
    } catch (error) {
        console.log(`sendSignup error: ${error}`)
        return false
    }
}
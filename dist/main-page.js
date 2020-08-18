const $ = require('jquery')

$('#sign-out').click(() => {
    if (window.localStorage.getItem('noVacationToken')) {
        window.localStorage.removeItem('noVacationToken')
        alert('Logout feito com sucesso!')
    } else {
        alert('Você não está logado!')
    }
})


$('#sign-up').click(() => {
    window.location.href = 'http://localhost:8081/Auth/signup'
})

$('#sign-in').click(async () => {
    try {
        const token = JSON.parse(window.localStorage.getItem('noVacationToken'))

        if (token) {

            const response = await $.ajax({
                url: "http://localhost:8081/Auth/check-token",
                method: "POST",
                data: {
                    noVacationToken: token.token
                }
            })

            if (response.verifyResponse == false) {
                window.localStorage.removeItem('noVacationToken')

                window.location.href = 'http://localhost:8081/Auth/signin'
            } else {
                alert('Você já está logado. Caso queira mudar de usuário, é necessário realizar o logout')
            }

        } else {
            window.location.href = 'http://localhost:8081/Auth/signin'
        }
    } catch (error) {
        console.log('Erro: ' + error);
    }
})


$('#img-btn1').click(() => {
    const isToken = window.localStorage.getItem('noVacationToken')
    if (isToken) {
        const token = JSON.parse(window.localStorage.getItem('noVacationToken')).token

        $('#inviInput').val(token)

        $('#invisibleForm').submit()
    } else {
        alert('Token não encontrado, faça login novamente.')
    }
})


$('#img-btn2').click(() => {

    const isToken = window.localStorage.getItem('noVacationToken')
    if (isToken) {
        const token = JSON.parse(window.localStorage.getItem('noVacationToken')).token

        $('#inviInput2').val(token)

        $('#invisibleForm2').submit()
    } else {
        alert('Token não encontrado, faça login novamente.')
    }
})
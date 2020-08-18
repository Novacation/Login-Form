const $ = require('jquery')


$('#btnSendComment').click(e => {
    const commentVal = $('#txtComment').val()

    if (commentVal.length == 0) {
        alert("Type a comment!")
    } else {
        const token = JSON.parse(window.localStorage.getItem('noVacationToken'))
        
        if (token) {
            const response = (async () => {
                try {
                    return await $.ajax({
                        url: "http://localhost:8081/Auth/send-comment",
                        method: "POST",
                        headers: {
                            "Authorization": token.token
                        },
                        data: {
                            clientComment: commentVal,
                            table: 'newscomments'
                        }
                    })
                } catch (error) {
                    return false
                }
            })

            $('#txtComment').val('')

            response().then(result => {
                alert(result.message)
            })
        }
    }
})
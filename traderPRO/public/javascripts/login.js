 $(document).ready(function () {   

    $('#login-submit').click( function () {
        var username = $('#login-field-username input').val();
        var password = $('#login-field-password input').val();

        var data = JSON.stringify({
            'params' : {
                'username' : username, 
                'password' : password
            }
        })

        console.log(data);

        $.ajax('index',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                console.log('POST Worked');
            }
        });

    });

});
 $(document).ready(function () {   

    $('#login-submit').click( function () {
        var username = $('#login-field-username input').val();
        var password = $('#login-field-password input').val();

        var data = JSON.stringify({
            'todo' : 'validate',
            'params' : {
                'username' : username, 
                'password' : password
            }
        })

        $.ajax('index',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                if (results) {
                    console.log("Validated");
                }
            }
        });

    });
    $('#createUser-submit').click( function () {
        var username = $('#login-field-username input').val();
        var password = $('#login-field-password input').val();

        var data = JSON.stringify({
            'todo' : 'create',
            'params' : {
                'username' : username, 
                'password' : password
            }
        })

        $.ajax('index',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                if (results) {
                    console.log(results);
                }
            }
        });

    });

});
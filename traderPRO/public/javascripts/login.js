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
        writeAjax(data);
    });

    function writeErr(errMsg) {
        $('#login-form .error').empty();
        $('#login-form .error').html('<p style= "color:red">'+errMsg+'</p>');
        $('#login-form .error p').fadeOut( 2000);
    }

    function writeAjax(data){
        $.ajax('index',{
            type : 'POST',
            contentType : 'application/json',
            dataType : 'JSON',
            data : data,
            success : function (results) {
                var succCode = results.success;
                if (succCode < 0) {
                    writeErr(errCheck(succCode));
                }
                if (succCode == 0) {
                    window.location.replace('http://localhost:3100/portfolioOverview');
                }
            }
        });
    }


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
        writeAjax(data);
    });
});
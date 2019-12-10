var app =
{
    initialize: function()
    {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function()
    {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function(id)
    {
        var db = openDatabase('ravenous', '1.0', 'system db', 2 * 1024 * 1024);
        var submit = document.querySelector("#RegisterUserButton");

        submit.addEventListener("click", function()
        {
            //Assigning the handlers
            var fName = document.querySelector("#fn");
            var lName = document.querySelector("#ln");
            var email = document.querySelector("#un");
            var emailVal = document.querySelector("#un").value;
            var password = document.querySelector("#pw1");
            var passwordVerification = document.querySelector("#pw2");

            //Reassigning all text boxes to be white
            fName.style.backgroundColor = "white";
            lName.style.backgroundColor = "white";
            email.style.backgroundColor = "white";
            password.style.backgroundColor = "white";
            passwordVerification.style.backgroundColor = "white";

            //Check to see if any field is left blank
            if (fName.value == "" || lName.value == "" || email.value == "" || password.value == "" || passwordVerification.value == "")
            {
                if (fName.value == "") {fName.style.backgroundColor = "red";}
                if (lName.value == "") {lName.style.backgroundColor = "red";}
                if (email.value == "") {email.style.backgroundColor = "red";}
                if (password.value == "") {password.style.backgroundColor = "red";}
                if (passwordVerification.value == "") {passwordVerification.style.backgroundColor = "red";}
                alert("Incorrect Data: Please enter information on all the fields");
            }

            //Check to see if a valid email is entered
            //Reference: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
            else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailVal))
            {
                email.style.backgroundColor = "red";
                alert("Incorrect Data: Please enter a valid email address")
            }

            //Check to see if the two password fields match up
            else if (password.value != passwordVerification.value)
            {
                password.style.backgroundColor = "red";
                passwordVerification.style.backgroundColor = "red";
                alert("Incorrect Data: Please enter the same password twice");
            }

            //If the program made it this far, all the tests have passed - related to the text box fields
            else
            {
                db.transaction(function (tx)
                {
                    tx.executeSql('INSERT INTO users (email,fName,lName,password) VALUES ('+'"'+email.value.trim().toLowerCase()+'",'+'"'+fName.value+'",'+'"'+lName.value+'",'+'"'+password.value+'"'+')');
                    //alert("Success: You have been successfully registered as a new user");
                    //window.location.href="index.html";
                },error,success,null);

                function error(err)
                {
                    alert("Incorrect Data: That email has already been registered before");
                }
                function success()
                {
                  alert("Success: You have been successfully registered as a new user");
                  window.location.href="index.html";
                }
            }
        });
    }
};

app.initialize();
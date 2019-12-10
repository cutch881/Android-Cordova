var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
       var db = openDatabase('ravenous', '1.0', 'system db', 2 * 1024 * 1024);

      db.transaction(function (tx){
           tx.executeSql('SELECT * FROM share WHERE shareEmail ='+"'"+localStorage.getItem("email")+"'",[], function (tx, results){
                   //select * not advisable
                   var shareFriends = document.getElementById('users')
                   var totalSharedFriends = results.rows.length, x;

                for(x = 0; x < totalSharedFriends; x++)
                  {
                       var email = results.rows.item(x).userEmail
                       var row = document.createElement('tr');
                       row.className = email;
                       row.innerHTML = "<td class="+email+ ">"+email+"</td>";
                       shareFriends.appendChild(row);
                  }
           });
       });

        //event listener for when they enter user
       document.getElementById('subm').addEventListener("click", addShare);
       function addShare(){
              db.transaction(function (tx){
                     tx.executeSql('SELECT email from users WHERE email ='+"'"+document.getElementById("shareForm").value.toLowerCase().trim()+"'",[], function (tx, results){
                     var emailFound = null;
                     var totalSh = results.rows.length, x;
                     for(x=0; x < totalSh; x++){
                       emailFound = results.rows.item(x).email
                     }


                     if(emailFound == localStorage.getItem("email"))
                     {
                        alert('Can not use your own email')
                     }
                     else if (emailFound!= null)
                     {
                       db.transaction(function (tx){

                          tx.executeSql('INSERT INTO share (userEmail, shareEmail) VALUES (' +  "'" + emailFound + "'" + "," + "'" + localStorage.getItem('email') + "'" + ")");
                          location.reload(true);
                       });
                     }

                     else
                     {
                       alert('User NOT FOUND');
                     }
                  });

          });
  }


   //event for removing access for user entered.
   document.getElementById('delet').addEventListener("click", deleteShare);
     function deleteShare(){
          db.transaction(function (tx){
                               tx.executeSql('SELECT email from users WHERE email ='+"'"+document.getElementById("shareForm").value.toLowerCase().trim()+"'",[], function (tx, results){
                               var emailFound = null;
                               var totalSh = results.rows.length, x;
                               for(x=0; x < totalSh; x++){
                                 emailFound = results.rows.item(x).email
                               }

                               if(emailFound == localStorage.getItem("email"))
                               {
                                  alert('Can not use your own email')
                               }

                               else if (emailFound!= null){
                                   db.transaction(function (tx){
                                     tx.executeSql('DELETE FROM share WHERE userEmail =' + "'" + emailFound + "' AND shareEmail ="+"'"+localStorage.getItem("email")+"'");
                                     location.reload(true);
                                   });
                               }

                               else
                               {
                                    alert('User NOT FOUND');
                               }
                           });
                  });
           }
    }
};
app.initialize();
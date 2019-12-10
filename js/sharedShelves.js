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
        db.transaction(function (tx) {

        tx.executeSql('SELECT * FROM share WHERE userEmail='+"'"+localStorage.getItem("email")+"'",[], function (tx, results) {
            var sharedShelf=document.getElementById('usersTable');
            var numOfShares = results.rows.length, x;
            for (x = 0; x < numOfShares; x++) {
                 var email= results.rows.item(x).shareEmail;
                 var row =document.createElement('tr');
                 row.className=email;
                 row.innerHTML= "<td class="+email+" onclick="+"location.href='OtherUserShelf.Html'>"+email+"</td>";
                 sharedShelf.appendChild(row);
                 row.addEventListener('click',function(){
                        localStorage.setItem("shareEmail",this.className);
                 });
            }

        });

        });
    }
};

app.initialize();
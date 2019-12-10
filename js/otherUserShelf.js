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
        document.getElementById('header').innerHTML="Shelf for: "+localStorage.getItem("shareEmail");
        db.transaction(function (tx) {
         tx.executeSql('SELECT * FROM books, bookShelf WHERE books.isbn=bookShelf.isbn AND bookShelf.emailUser='+"'"+localStorage.getItem("shareEmail")+"'",[], function (tx, results) {
             var otherShelf=document.getElementById('otherShelf');
             var num = results.rows.length, x;
              console.log("check");
              for (x = 0; x < num; x++) {
                 var isbn= results.rows.item(x).isbn;
                 var title= results.rows.item(x).bookName;
                 var pageReached= results.rows.item(x).pageReached;
                 var pageMax=results.rows.item(x).pages;
                 var row=document.createElement('tr');
                 row.className=title;
                 var imgColumn=document.createElement('td');
                 var infoColumn=document.createElement('td');
                 imgColumn.innerHTML="<img src=img/BookCovers/"+isbn+".jpg>";
                 infoColumn.innerHTML="Title: " + title+ "<br><br>" +"Page Reached: "+pageReached+ " out of "+pageMax+"<br><br>";
                 row.appendChild(imgColumn);
                 row.appendChild(infoColumn);
                 otherShelf.appendChild(row);
                 document.getElementById("noBooks").innerHTML ='';
              }
                if(otherShelf.rows.length == 0)
                 {
                    document.getElementById("noBooks").innerHTML="No books";
                 }
            },null);
        });

    }
};

app.initialize();
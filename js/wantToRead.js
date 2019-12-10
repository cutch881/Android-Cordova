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
       var wantToReadShelf=document.getElementById('wantToReadShelf');
            db.transaction(function (tx) {
                        tx.executeSql('SELECT * FROM books, wantToRead WHERE books.isbn=wantToRead.isbn AND wantToRead.emailUser='+"'"+localStorage.getItem("email")+"'",[], function (tx, results) {
                          //var wantToReadShelf=document.getElementById('wantToReadShelf');
                          var wantToReadShelfLen = results.rows.length, w;
                          for (w = 0; w < wantToReadShelfLen; w++) {
                                var isbnWantToReadShelf = results.rows.item(w).isbn;
                                var titleWantToReadShelf = results.rows.item(w).bookName;
                                var author = results.rows.item(w).author;
                                var pages = results.rows.item(w).pages;
                                var tableWantToReadShelfRow = document.createElement('tr');
                                tableWantToReadShelfRow.className=titleWantToReadShelf;
                                var imgColumnWantToReadShelf = document.createElement('td');
                                var infoColumnWantToReadShelf=document.createElement('td');
                                var addButton =document.createElement('button');
                                var removeButton=document.createElement('button');
                                addButton.innerHTML="Add to book shelf";
                                removeButton.innerHTML="Remove";
                                addButton.className=isbnWantToReadShelf;
                                removeButton.className=isbnWantToReadShelf;

                                addButton.addEventListener('click',function()
                                {
                                  var isbnAddClass = this.className;
                                  db.transaction(function (tx) {
                                    tx.executeSql('INSERT INTO bookShelf (emailUser,isbn, pageReached) VALUES('+'"'+localStorage.getItem("email")+'",'+'"'+isbnAddClass+'",'+'0)');
                                    tx.executeSql('DELETE FROM wantToRead WHERE isbn='+"'"+ isbnAddClass+"' AND emailUser="+"'"+localStorage.getItem("email")+"'");
                                    window.location.reload(true);
                                  });
                                  alert('Book now in Main Shelf');
                                });

                                removeButton.addEventListener('click',function()
                                {
                                    var isbnRemoveClass = this.className;
                                    db.transaction(function (tx) {
                                     tx.executeSql('DELETE FROM wantToRead WHERE isbn='+"'"+ isbnRemoveClass+"' AND emailUser="+"'"+localStorage.getItem("email")+"'");
                                     window.location.reload(true);
                                  });

                                });

                                imgColumnWantToReadShelf.innerHTML="<img src=img/BookCovers/"+isbnWantToReadShelf +".jpg>";
                                infoColumnWantToReadShelf.innerHTML="<div>Title: " + titleWantToReadShelf+ "<br><br>"+"Author: "+author+"<br><br>" +"Pages: "+pages+"</div><br><br>";
                                infoColumnWantToReadShelf.appendChild(addButton);
                                infoColumnWantToReadShelf.appendChild(removeButton);
                                tableWantToReadShelfRow.appendChild(imgColumnWantToReadShelf);
                                tableWantToReadShelfRow.appendChild(infoColumnWantToReadShelf);
                                wantToReadShelf.appendChild(tableWantToReadShelfRow);
                                document.getElementById("noBooks").innerHTML ='';
                          }
                           if(wantToReadShelf.rows.length == 0)
                           {
                             document.getElementById("noBooks").innerHTML="No books in the Want To Read Shelf";
                           }
                        }, null);
                   });
        }
};

app.initialize();
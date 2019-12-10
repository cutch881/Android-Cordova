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
            var tableSearch = document.getElementById("collection");

           db.transaction(function (tx) {

               tx.executeSql('SELECT * FROM books', [], function (tx, results) {
                     var len = results.rows.length, i;
                     for (i = 0; i < len; i++) {
                        var ISBN = results.rows.item(i).isbn;
                        var bookName = results.rows.item(i).bookName;
                        var author = results.rows.item(i).author;
                        var year = results.rows.item(i).year;
                        var description = results.rows.item(i).description;
                        var pages = results.rows.item(i).pages;

                        var tableSearchRow = document.createElement('tr');
                        tableSearchRow.className=bookName;
                        //tableSearchRow.setAttribute("id",ISBN) or .id;
                        var imgColumn = document.createElement('td');
                        var aboutColumn = document.createElement('td');
                        var addButton=document.createElement('button');
                        var wanToReadButton=document.createElement('button');
                        addButton.innerHTML="Add to Shelf";
                        wanToReadButton.innerHTML="Add to Want To Read";
                        addButton.className=ISBN;
                        wanToReadButton.className=ISBN;
                        var classIsbn ="";

                        addButton.addEventListener('click',function(){
                            classIsbn = this.className;
                            var emailOfUser =localStorage.getItem("email");
                            var query ='INSERT INTO bookShelf (emailUser,isbn, pageReached) VALUES ('+'"'+emailOfUser+'",'+'"'+classIsbn+'",'+'0)';

                            db.transaction(function (tx) {
                               tx.executeSql(query); //(query,var,sucess function,error function)
                            },error,null); //({excute, error function,sucess function}

                             function error(err) // entire function can be placed in
                               {
                                 alert("Already in Personal Shelf");
                               }

                            db.transaction(function (tx) {
                                 tx.executeSql('SELECT isbn FROM wantToRead WHERE isbn='+"'"+ classIsbn+"' AND emailUser="+"'"+emailOfUser+"'", [], function (tx, results) {
                                 var lenWantToRead = results.rows.length, y;
                                 var match =null
                                 for (y = 0; y < lenWantToRead; y++) {
                                       match = results.rows.item(y).isbn;
                                    }
                                 if(match != null)
                                 {
                                   db.transaction(function (tx) {
                                      tx.executeSql('DELETE FROM wantToRead WHERE isbn='+"'"+ classIsbn+"' AND emailUser="+"'"+emailOfUser+"'"); //(query,var,sucess function,error function)
                                      alert("This book was in the 'Want To Read'shelf, it's now in the personal shelf");
                                    });
                                 }

                                },null);
                              });
                        });

                        var classIsbnWantToRead="";
                        wanToReadButton.addEventListener('click',function(){
                            classIsbnWantToRead=this.className;
                            var bookFoundInMainShelf = null;
                            db.transaction(function (tx) {
                               tx.executeSql('SELECT isbn FROM bookShelf WHERE isbn='+"'"+ classIsbnWantToRead+"' AND emailUser="+"'"+localStorage.getItem("email")+"'", [], function (tx, results) {
                                  var lenOfMainShelf = results.rows.length, m;
                                  for (m = 0; m < lenOfMainShelf; m++) {
                                     bookFoundInMainShelf = results.rows.item(m).isbn;
                                  }

                                  if(bookFoundInMainShelf != null)
                                  {
                                    alert("This book is already in your personal shelf for current readings");
                                  }
                                  else
                                  {

                                    db.transaction(function (tx) {
                                       tx.executeSql('INSERT INTO wantToRead (emailUser,isbn) VALUES ('+'"'+localStorage.getItem("email")+'",'+'"'+classIsbnWantToRead+'"'+')');
                                    },errorWantToRead,null);

                                    function errorWantToRead(err) // entire function can be placed in
                                     {
                                        alert("Already in Want To Read Shelf");
                                     }
                                  }

                               }, null);
                            });
                        });


                        imgColumn.innerHTML="<img src=img/BookCovers/"+ISBN+".jpg>";
                        aboutColumn.innerHTML="<div>Name: "+bookName+"<br><br>" + "Author: "+
                                               author+"<br><br>"+"Description: "+ description+"<br><br>" +
                                               "Year: "+year+"<br><br>" +"Pages "+pages+"<br><br>"+
                                               "ISBN: "+ISBN+"<br><br> </div>";

                        aboutColumn.appendChild(wanToReadButton);
                        aboutColumn.appendChild(addButton);
                        tableSearchRow.appendChild(imgColumn);
                        tableSearchRow.appendChild(aboutColumn);
                        tableSearch.appendChild(tableSearchRow);
                     }

                  }, null);
               });
    }
};
app.initialize();
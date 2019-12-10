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
               var favouritesShelf=document.getElementById('favTable');
                    db.transaction(function (tx) {
                      tx.executeSql('SELECT * FROM books, favourites WHERE books.isbn=favourites.isbn AND favourites.emailUser='+"'"+localStorage.getItem("email")+"'",[], function (tx, results) {
                                  //var favouritesShelf=document.getElementById('favTable');
                                  var favouritesShelfLen = results.rows.length, k;
                                  for (k = 0; k < favouritesShelfLen; k++) {
                                        var isbnFavouritesShelf = results.rows.item(k).isbn;
                                        var bookName = results.rows.item(k).bookName;
                                        var pageReached = results.rows.item(k).pageReached;
                                        var pageMax= results.rows.item(k).pages;
                                        var tableFavouritesShelfRow = document.createElement('tr');
                                        tableFavouritesShelfRow.className=bookName;
                                        var imgColumnFavouritesShelf = document.createElement('td');
                                        var infoFavouritesShelf=document.createElement('td');
                                        var removeButton=document.createElement('button');
                                        var update= document.createElement('button');
                                        var page = document.createElement('input');
                                        page.setAttribute("type","number");
                                        page.setAttribute('placeholder',"Enter Page Reached");
                                        page.className=pageMax;
                                        removeButton.className =isbnFavouritesShelf;
                                        removeButton.innerHTML="Remove";
                                        update.className=isbnFavouritesShelf;
                                        update.innerHTML="Update";
                                        removeButton.addEventListener('click',function(){
                                           var isbnBookRemove = this.className;
                                           db.transaction(function (tx) {
                                                tx.executeSql('DELETE FROM favourites WHERE isbn='+"'"+ isbnBookRemove+"' AND emailUser="+"'"+localStorage.getItem("email")+"'");
                                                window.location.reload(true);
                                           });
                                        });


                                      update.addEventListener('click',function(){
                                            var isbnUpdateBook=this.className;
                                            var max=parseInt(this.previousSibling.className);
                                            var newPage=parseInt(this.previousSibling.value);

                                             if(newPage > max)
                                              {
                                                   console.log(newPage);
                                                    alert("You cannot be past page "+max)
                                              }

                                              else if(newPage<0)
                                              {
                                                alert("No negative values");
                                              }

                                              else if(newPage%1 != 0)
                                              {
                                                alert('No decimals');
                                              }
                                             else
                                             {
                                               db.transaction(function (tx) {
                                                 tx.executeSql('UPDATE favourites SET pageReached=' +"'"+newPage+"'"+ 'WHERE isbn='+"'"+ isbnUpdateBook+"' AND emailUser="+"'"+localStorage.getItem("email")+"'");
                                                 tx.executeSql('UPDATE bookShelf SET pageReached=' +"'"+newPage+"'"+ 'WHERE isbn='+"'"+ isbnUpdateBook+"' AND emailUser="+"'"+localStorage.getItem("email")+"'");
                                                 window.location.reload(true);
                                              });
                                           }


                                        });

                                        imgColumnFavouritesShelf.innerHTML="<img src=img/BookCovers/"+isbnFavouritesShelf +".jpg>";
                                        infoFavouritesShelf.innerHTML="<div>Title: " + bookName+ "<br><br>"+"Page Reached: "+pageReached+" out of "+pageMax+"</div><br><br>";
                                        infoFavouritesShelf.appendChild(removeButton);
                                        infoFavouritesShelf.appendChild(page);
                                        infoFavouritesShelf.appendChild(update);
                                        tableFavouritesShelfRow.appendChild(imgColumnFavouritesShelf);
                                        tableFavouritesShelfRow.appendChild(infoFavouritesShelf);
                                        favouritesShelf.appendChild(tableFavouritesShelfRow);
                                        document.getElementById("noBooks").innerHTML ='';
                                  }

                                  if(favouritesShelf.rows.length == 0)
                                  {
                                     document.getElementById("noBooks").innerHTML="No books in the Favourites Shelf";
                                  }
                                  else
                                  {
                                     document.getElementById("noBooks").innerHTML="";
                                  }

                                }, null);

                           });

    }
};

app.initialize();
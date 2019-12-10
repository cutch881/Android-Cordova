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
      var emailOfUser;
      var shelf=document.getElementById('shelf');
      db.transaction(function (tx) {
                       emailOfUser =localStorage.getItem("email");
                       tx.executeSql('SELECT * FROM books, bookShelf WHERE books.isbn=bookShelf.isbn AND bookShelf.emailUser='+"'"+emailOfUser+"'",[], function (tx, results) {
                         //var shelf=document.getElementById('shelf');
                         var shelfLen = results.rows.length, a;
                         for (a = 0; a < shelfLen; a++) {
                               var isbnMyShelf = results.rows.item(a).isbn;
                               var title = results.rows.item(a).bookName;
                               var pageReached= results.rows.item(a).pageReached;
                               var pageMax= results.rows.item(a).pages;
                               var tableMyShelfRow = document.createElement('tr');
                               tableMyShelfRow.className=title;
                               var imgColumnMyShelf = document.createElement('td');
                               var infoSection=document.createElement('td');
                               var addToFav= document.createElement('button');
                               var remove= document.createElement('button');
                               var update= document.createElement('button');
                               var page = document.createElement('input');
                               page.setAttribute("type","number");
                               page.setAttribute('placeholder',"Enter Page Reached");
                               page.className=pageMax;
                               addToFav.innerHTML="Add To Favorite";
                               remove.innerHTML="Remove";
                               update.innerHTML="Update";
                               addToFav.className=isbnMyShelf;
                               remove.className=isbnMyShelf;
                               update.className=isbnMyShelf;
                               imgColumnMyShelf.innerHTML="<img src=img/BookCovers/"+isbnMyShelf+".jpg>";
                               infoSection.innerHTML="<div>Title: " + title+ "<br><br>" +"Page Reached: "+pageReached+ " out of "+pageMax+" </div><br><br>";

                               addToFav.addEventListener('click',function(){
                                    var isbnBook = this.className;
                                    var pageNum;
                                 db.transaction(function (tx) {
                                    tx.executeSql('SELECT * FROM bookShelf WHERE isbn='+"'"+isbnBook+"'"+'AND emailUser='+"'"+emailOfUser+"'",[], function (tx, results){
                                     var l = results.rows.length, u;
                                     for (u = 0; u < l; u++) {
                                       var pageNum = results.rows.item(u).pageReached;
                                      }
                                       db.transaction(function (tx) {
                                          tx.executeSql('INSERT INTO favourites (emailUser,isbn,pageReached) VALUES ('+'"'+localStorage.getItem("email")+'",'+'"'+isbnBook+'",'+'"'+pageNum+'"'+')');
                                           },errorFavourites,null);

                                           function errorFavourites(err) // entire function can be placed in
                                           {
                                             alert("Already in Favorites Shelf");
                                           }
                                   },null);
                                 });
                               });

                               remove.addEventListener('click',function(){
                                   var isbnBookRemove = this.className;
                                   db.transaction(function (tx) {
                                        tx.executeSql('DELETE FROM bookShelf WHERE isbn='+"'"+ isbnBookRemove+"' AND emailUser="+"'"+localStorage.getItem("email")+"'");
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
                                    alert('Nothing inputted');
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


                               infoSection.appendChild(addToFav);
                               infoSection.appendChild(remove);
                               infoSection.appendChild(page);
                               infoSection.appendChild(update);
                               tableMyShelfRow.appendChild(imgColumnMyShelf);
                               tableMyShelfRow.appendChild(infoSection);
                               shelf.appendChild(tableMyShelfRow);
                               document.getElementById("noBooks").innerHTML ='';
                         }

                          if(shelf.rows.length == 0)
                           {
                             document.getElementById("noBooks").innerHTML="No books in the Personal Shelf";
                           }

                       }, null);
                  });
    }
};

app.initialize();
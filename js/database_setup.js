    var db = openDatabase('ravenous', '1.0', 'system db', 2 * 1024 * 1024);
   //chrome://inspect
   /*db.transaction(function (tx) {
           tx.executeSql('DROP TABLE share');
           tx.executeSql('DROP TABLE users');
           tx.executeSql('DROP TABLE books');
           tx.executeSql('DROP TABLE bookShelf');
           tx.executeSql('DROP TABLE favourites');
           tx.executeSql('DROP TABLE wantToRead');
      });*/

  db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS users (email varchar(50), fName varchar(30), lName varchar(30), password varchar(50), PRIMARY KEY(email))');
          tx.executeSql('INSERT INTO users (email,fName,lName, password) VALUES ("tom_waits@gmail.com", "Tom", "Waits", "ComeOnUpToTheHouse")');
          tx.executeSql('INSERT INTO users (email,fName,lName, password) VALUES ("bob_ross@gmail.com", "Bob", "Ross", "HappyLittleTrees")');
          tx.executeSql('INSERT INTO users (email,fName,lName, password) VALUES ("mark_lanegan@gmail.com", "Mark", "Lanegan", "StrangeReligion")');
          tx.executeSql('INSERT INTO users (email,fName,lName, password) VALUES ("nick_cave@gmail.com", "Nick", "Cave", "TheShipSong")');
          tx.executeSql('INSERT INTO users (email,fName,lName, password) VALUES ("leonard_cohen@gmail.com", "Leonard", "Cohen", "BirdOnAWire")');
     });
     db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS share(userEmail varchar(50), shareEmail varchar(50), PRIMARY KEY(userEmail, shareEmail))');
            tx.executeSql('INSERT INTO share (userEmail, shareEmail)VALUES("tom_waits@gmail.com", "bob_ross@gmail.com")');
            tx.executeSql('INSERT INTO share (userEmail, shareEmail)VALUES("tom_waits@gmail.com", "mark_lanegan@gmail.com")');
            tx.executeSql('INSERT INTO share (userEmail, shareEmail)VALUES("tom_waits@gmail.com", "nick_cave@gmail.com")');
            tx.executeSql('INSERT INTO share (userEmail, shareEmail)VALUES("tom_waits@gmail.com", "leonard_cohen@gmail.com")');
            tx.executeSql('INSERT INTO share (userEmail, shareEmail)VALUES("bob_ross@gmail.com", "tom_waits@gmail.com")');
      });

     db.transaction(function (tx) {
         tx.executeSql('CREATE TABLE IF NOT EXISTS books (isbn varchar(50), bookName varchar(40), author varchar(30), year varchar(5),description varchar(255), pages int, PRIMARY KEY(isbn))');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780486406510", "A Tale of Two Cities","Charles Dickens", "1859","The story is set in the late 18th century against the background of the French Revolution.", 477)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780486282114", "Frankenstein","Mary Shelley", "1818","The story of Victor Frankenstein, a young scientist who creates a hideous sapient creature in an unorthodox scientific experiment.", 176)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780571084838", "Lord of the Flies","William Golding", "1973","The tale of a party of shipwrecked schoolboys, marooned on a coral island, who at first enjoy the freedom of the situation but soon divide into fearsome gangs.", 176)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9781950010394", "Trump - The Biography"," J.R. MacGregor" ,"2019","Discover the incredible life and achievements of the Trump family. From their arrival to America and the businesses they founded, to Donald J Trump’s successful ascent to the Whitehouse and his long-standing career beforehand.", 177)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780553380163", "A Brief History of Time","Stephen Hawking", "1998","This book deals with profound questions as: How did the universe begin—and what made its start possible? Does time always flow forward? Is the universe unending—or are there boundaries?", 240)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9781843441304", "The Great Gatsby","F. Scott Fitzgerald", "1925","Set in Jazz Age New York, the novel tells the tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth", 160)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9781455525256", "Gordon Ramsay-Home Cooking","Gordon Ramsay", "2013","Based on a new cooking show, this book will give experienced as well as novice cooks the desire, confidence and inspiration to get cooking.", 320)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9781108451673", "Heart of Darkness","Joseph Conrad", "1902","This Novella is about a voyage up the Congo River into the Congo Free State in the Heart of Africa. Charles Marlow, the narrator, tells his story to friends aboard a boat anchored on the River Thames.", 280)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780676973778", "Life of Pi","Yann Martel ", "2001","After the tragic sinking of a cargo ship, a solitary lifeboat remains bobbing on the Pacific. The only survivors from the wreck are a sixteen-year-old boy named Pi, a hyena, a zebra (with a broken leg), a female orangutan--and a 450-pound Bengal tiger.", 356)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780544309760", "The Things They Carried","Tim O Brien", "1990","The book is a collection of linked short stories, about a platoon of American soldiers fighting on the ground in the Vietnam War. His third book about the war, it is based upon his experiences as a soldier in the 23rd Infantry Division.", 256)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9781443426794", "Ellen In Pieces","Caroline Adderson", "2014","In this witty, compelling and genre-bending novel, a single mother navigates the loves, lusts and losses of middle age to arrive at a final, bittersweet contentment. Ellen McGinty: sexy, impulsive, loud-mouthed, chock full of regrets.", 304)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9781594483295", "The Brief Wondrous Life of Oscar Wao","Junot Diaz", "2007","This novel written by Dominican American author Junot Díaz. Although a work of fiction, the novel is set in New Jersey in the United States, where Díaz was raised, and it deals with the Dominican Republic experience under dictator Rafael Trujillo", 339)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780676974560", "Atonement","Ian McEwan", "2002","Atonement is a 2001 novel by British author Ian McEwan. It tells the story of protagonist Briony Tallis crime and how it changes her life, as well as those of her sister Cecilia and her lover Robbie Turner, and her consequential effort to atone.", 351)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780140276336", "White Teeth","Zadie Smith", "2001","This novel is about two friends, the Bangladeshi Samar Iqbal and the Englishman Archie Jones—and their families in London. The novel is centered around relationships with people from formerly British colonized countries.", 464)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780312429218", "2666","Roberto Bolaño", "2004","This book revolves around an elusive German author and the unsolved and ongoing murders of women in Santa Teresa, a violent city inspired by Ciudad Juárez and its epidemic of female homicides.", 912)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780006393092", "The Corrections","Jonathan Franzen", "2002","This book revolves around the troubles of an elderly Midwestern couple and their three adult children, tracing their lives from the mid-20th century to one last Christmas together near the turn of the millennium.", 568)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780735252813", "The Diviners","Margaret Laurence", "1974","This is the powerful story of an independent woman who refuses to abandon her search for love. For Morag Gunn, growing up in a small Canadian prairie town is a toughening process – putting distance between herself and a world that wanted no part of her.", 560)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780140042597", "On the Road","Jack Kerouac", "1957","This novel is based on the travels of Kerouac and his friends across the US. It is considered a defining work of the postwar Beat and Counterculture generations, with its protagonists living life against a backdrop of jazz, poetry, and drug use.", 320)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9781840226355", "Ulysses","James Joyce", "1922","Ulysses chronicles the peripatetic appointments and encounters of Leopold Bloom in Dublin on 16 June 1904. Ulysses is the Latin name of Odysseus, the hero of Homers epic poem the Odyssey, and the novel establishes parallels between the poem and novel.", 702)');
         tx.executeSql('INSERT INTO books (isbn,bookName,author, year,description, pages) VALUES ("9780143199113", "Eleanor Oliphant is Completely Fine","Gail Honeyman", "2017","The novel focuses on 29-year-old Eleanor Oliphant, a social misfit who becomes enamoured of a singer she sees performing named Johnnie Lomond, whom she believes she is destined to be with.", 383)');
      });

      db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS bookShelf (emailUser varchar(50),isbn varchar(50), pageReached int, PRIMARY KEY(emailUser,isbn))');
            tx.executeSql('INSERT INTO bookShelf (emailUser,isbn,pageReached) VALUES ("tom_waits@gmail.com","9780486406510",77)');
            tx.executeSql('INSERT INTO bookShelf (emailUser,isbn,pageReached) VALUES ("tom_waits@gmail.com","9781950010394",25)');
            tx.executeSql('INSERT INTO bookShelf (emailUser,isbn, pageReached) VALUES ("bob_ross@gmail.com","9781455525256",35)');
      });


      db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS favourites (emailUser varchar(50),isbn varchar(50), pageReached int, PRIMARY KEY(emailUser,isbn))');

      });


      db.transaction(function (tx) {
           tx.executeSql('CREATE TABLE IF NOT EXISTS wantToRead(emailUser varchar(50),isbn varchar(50),PRIMARY KEY(emailUser,isbn))');
      });




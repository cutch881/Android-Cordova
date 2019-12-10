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

        var filterInput=document.getElementById('filterInput');

        filterInput.addEventListener('keyup',filterTitles);

        function filterTitles()
        {
            var filterValue=document.getElementById('filterInput').value.trim().toLowerCase();
            var table = document.getElementById('collection');
            var row = table.querySelectorAll('tr');
            for(var i = 0; i < row.length; i++)
            {
                var found = row[i].className;

                if(found.toLowerCase().indexOf(filterValue)!= -1) // found.toLowerCase().indexOf(filterValue)>-1 OR found.toLowerCase().startsWith(filterValue) == true
                {
                  row[i].style.display='block'; //or ''
                }
                else
                {
                   row[i].style.display='none';
                }
            }

        }

    }
};

app.initialize();
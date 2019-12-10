

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

    var logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", function(e)
    {
//        navigator.app.exitApp();
        localStorage.removeItem("email");
        localStorage.removeItem("shareEmail");
    });



    }
};

app.initialize();

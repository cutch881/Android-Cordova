/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
//---------------------------------------------Login------------------------------------------------------------------------------
       var userName;
       var password
       var fName;
       var lName;


       var submit = document.querySelector("#submit1");
       //var form1 = document.querySelector("#form1");

       submit.addEventListener("click", function(){
                userName = document.querySelector("#us").value.trim().toLowerCase();
                password = document.querySelector("#pw").value;
               db.transaction(function (tx) {
                   tx.executeSql('SELECT email, fName, lName FROM users WHERE password='+"'"+password+"'"+'AND email='+"'"+userName+"'", [], function (tx, results) {
                      var len = results.rows.length, i;
                      var foundEmail=null;

                      for (i = 0; i < len; i++) {
                          foundEmail=results.rows.item(i).email;
                          fName=results.rows.item(i).fName;
                          lName=results.rows.item(i).lName;
                      }
                      if (foundEmail != null )
                        {
                           localStorage.setItem("email",userName);
                           window.location.href="Menu.html";
                           alert("Welcome "+fName+" "+lName);
                        }

                      else
                        {
                          alert("Match not found, password or username incorrect");
                          //form.action='index.html';
                        }

                   }, null);
                });

          //emailOfUser=userName;
        });
  //----------------------------------------------------------------------------------------------------------------

    }
};

app.initialize();



// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4444;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// table and reservation (DATA)
// =============================================================
var tables = [
    {
        name: "BJEM",
        number: "647-784-1232",
        email: "bjem@bjeminc.ca",
        customerID: "4"
    }
];

var w8List = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

pp.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
  
  app.get("/table", function(req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
  });
  
  app.get("/reservation", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
  });

  // Displays all tables
  app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });

// Displays a single table, or returns false
app.get("/api/tables/:search", function(req, res) {
    var chosen = req.params.search;
  
    console.log(chosen);
  
    for (var i = 0; i < tables.length; i++) {
      if (chosen === tables[i].routeName) {
        return res.json(tables[i]);
      }
    }
  
    return res.json(false);
  });

  // Create New Tables - takes in JSON input
app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newTable);

  if (tables.length >= 5){

      console.log("table is full! :) :), please wait! :) :)")
        w8List.push(newTable);
        res.json(newTable);

    }else{

        console.log("Enjoy your dinner! :) :)")
        tables.push(newTable);
        res.json(newTable);
}
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  

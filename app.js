const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp/3.0/lists/3da0e7752e";

  const options = {
    method: "POST",
    auth: "beth78:f8eb8f3747aadf7de7d0c95fd3ad1ae3-us8"
  }

  const request = https.request(url, options, function(response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + /success.html);
    } else {
      res.sendFile(__dirname + /fail.html);
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
    request.write(jsonData);
    request.end();
  })


});

app.post("/fail", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT, function() {
  console.log("Server is running on port 3000");
});



// f8eb8f3747aadf7de7d0c95fd3ad1ae3-us8

// list id
// 3da0e7752e

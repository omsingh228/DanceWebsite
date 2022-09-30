//npm init , npm install express, npm install pug, npm install ...Mandatory Task.. Many of the code is from tut73,74...

// In order to save data in db install -->npm install mongoose, npm install body-parser (Added during tut88, body-parser isn't used only mongooose is used)

const express = require('express')
const app = express()
const fs = require('fs')

const mongoose = require('mongoose'); //Added during tut 88... // Copied from https://mongoosejs.com/docs/index.html
mongoose.connect('mongodb://localhost/contactDance');
const bodyparser = require('body-parser') //Added to save data in mongoDB..


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) //For Serving Static Files
//To GET DATA OF FORM 
app.use(express.urlencoded())  


//PUG SPECIFIC STUFF
app.set('view engine', 'pug')   //Set the template engine as pug...

const path = require('path')
app.set('views', path.join(__dirname, 'views'))  //Set the views directory


//ENDPOINTS
// app.get("/", (req, res) => {
//     res.statusCode = 200
//     res.render('index.pug',{'title':'PubG is the best Game ', 'content':"This is the best content so far"})--> //Here we havent used standard syntax of pug but used simple html..Hence not written actual statement of res.render mentioned on pugjs site and also that we used in tut72..The title and content written in res.render is useless because we overwrite that when we write html in index.pug...
// })

app.get("/", (req, res) => { //This we added during 79th tut ... Read tut75-79.html in Web-Dev bootcamp folder to understand chronology..
    res.statusCode = 200
    res.render('home.pug',{'title':'PubG is the best Game ', 'content':"This is the best content so far"})

})

app.get("/home", (req, res) => { //This we added during 79th tut ... Read tut75-79.html in Web-Dev bootcamp folder to understand chronology..
    res.statusCode = 200
    res.render('home.pug',{'title':'PubG is the best Game ', 'content':"This is the best content so far"})

})

app.get("/contact", (req, res) => { //This we added during 79th tut ... Read tut75-79.html in Web-Dev bootcamp folder to understand chronology..
    res.statusCode = 200
    res.render('contact.pug',{'title':'PubG is the best Game ', 'content':"This is the best content so far"})

})
app.get("/about", (req, res) => { //This we added during 79th tut ... Read tut75-79.html in Web-Dev bootcamp folder to understand chronology..
    res.statusCode = 200
    res.render('about.pug',{'title':'PubG is the best Game ', 'content':"This is the best content so far"})

})

// Storing Data of Form
app.post('/contact',(req,res)=>{
   
//If we want to save data in text File:
    // Name=req.body.Name
    // Age=req.body.Age
    // PhoneNumber=req.body.PhoneNumber
    // Gender=req.body.Gender
    // Address=req.body.Address
    // Email=req.body.Email

    // let OutputInText = `Name of client is ${Name}, Age is ${Age}, Gender is ${Gender},Phone-number is ${PhoneNumber},Email-Id is ${Email},Address is ${Address}` 
    // res.statusCode = 200
    // res.render('contact.pug', {'message': 'Your Form has been submitted'})
    // const fs = require('fs')
    // fs.writeFileSync('Output.txt',OutputInText)


//If we want to save data in DB (Added during tut 88)
    let myData = new ContactUs(req.body);
    myData.save().then(()=>{  //promise in js...
        res.statusCode = 200;
        res.send("This Item has been saved to database")
    }).catch(()=>{
        res.statusCode = 400;
        res.send("This Item was not saved to database")
    })
    ;
})

//Define Mongoose Schema (Added during tut88)

// Copied from https://mongoosejs.com/docs/index.html 

const contactSchema = new mongoose.Schema({
    Name: String,
    Age: String,
    Gender: String,
    PhoneNumber: String,
    Email: String,
    Address: String
  });

  const ContactUs = mongoose.model('ContactUs', contactSchema);


//START THE SERVER
const port = 80
app.listen(port, () => {
    console.log(`The application is successfully started on port http://localhost:${port}`);
})



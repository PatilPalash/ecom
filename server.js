import express from "express";
import bcrypt from "bcrypt";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHl_AgMiA3pU3YAXOXvhE3wwQjcxAs3kk",
  authDomain: "ecom-website-v2-f7cdc.firebaseapp.com",
  projectId: "ecom-website-v2-f7cdc",
  storageBucket: "ecom-website-v2-f7cdc.appspot.com",
  messagingSenderId: "386671654293",
  appId: "1:386671654293:web:cca91accb65bedfda8329c"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore();

//init server
const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.json()) // enables form sharing


//route
//home route
app.get('/', (req, res) => {
    res.sendFile("index.html", { root : "public"})
})

//signup
app.get('/signup', (req, res) => {
     res.sendFile("signup.html", { root : "public"})
})

app.post('/signup', (req, res) => {
    const {name, email, password, number, tac} = req.body;

    //form validation
    if(name.length < 3){
        res.json({ 'alert' : 'name must be 3 leeter long' });
    } else if(!email.length){
        res.json({ 'alert' : ' enter your email' });
    } else if(password.length < 8){
        res.json({ 'alert' : 'password must be 8 letters long' });
    } else if(!Number(number) || number.length < 10){
        res.json({ 'alert' : 'invalid number, please enter valid one' });
    } else if(!tac){
        res.json({ 'alret' : 'you must to our terms and condition' });
    } else{
        // store the data in db
        const users = collection(db, "users");

        getDoc(doc(users, email)).then(users => {
            if(users.exists()){
                return res.json({'alert' : 'email already exists' });
            } else{
                // encrypt the password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) =>{
                        req.body.password = hash;
                        req.body.password = false;

                        // set the doc
                        setDoc(doc(users, email), req.body).then(data => {
                            res.json({
                                name: req.body.name,
                                email: req.body.email,
                                seller: req.body.seller,
                            })
                        })
                    }) 
                })
            }
        })
    }
})


//404 routw
app.get('/404', (req, res) => {
    res.sendFile("404.html", {root: "public"})
})

app.use((req, res) => {
    res.redirect('/404')
})
app.listen(3000, () => {
    console.log('listeing on port 3000')
})
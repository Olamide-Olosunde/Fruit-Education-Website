const express = require("express");
const dbloader = require("better-sqlite3");
const fs = require("fs");
const cors = require("cors");

const corsOptions = {
    origin: ['http://localhost', 'http://127.0.0.1:5502'], //prod & dev respectively
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
};


const path = require("path");
const app = express();
app.use(express.json());

app.use(cors(corsOptions));

const db = dbloader(
    path.resolve(__dirname, "database.db")
);

const schema = fs.readFileSync(
    path.resolve(__dirname, "schema.sql"),
    "utf-8"
);

db.exec(schema);


//create
app.post("/api/user", (req, res)=>{
    //compulsory: fname, lname, email, dob, profession
    if( !req.body.fname || !req.body.lname || !req.body.email ||
        !req.body.dob || !req.body.profession
     )
    {
        console.log("All fields with * are required");
        res.sendStatus(404);
        return;
    }

    try{
        const add = db.prepare("INSERT INTO users (prefix, fname, lname, email, dob, gender, profession, about) VALUES (?,?,?,?,?,?,?,?)")
        .run(req.body.prefix, req.body.fname, req.body.lname, req.body.email, req.body.dob, req.body.gender, req.body.profession, req.body.about);

        console.log("Added\n"+ add);

        res.send({
            id: add.lastInsertRowid
        })

    } catch (err)
    {
        console.error(err);
        res.sendStatus(500);
    }

    console.log(req.body);
    res.send();

})

//read
app.get("/api/user/:Email", (req, res)=>{
    const Email = req.params.Email;

    if( !Email )
    {
        console.log("Enter an email");
        res.sendStatus(400);
        return;
    }

    try{
        const data = db.prepare("SELECT * FROM users WHERE email = ?").get(Email);

        if( !data )
        {
            console.log("User not found");
            res.sendStatus(404);
            return;
        }
        console.log(Email);
        console.log(data);
        res.send(data);

    } catch(err)
    {
        console.error(err);
        res.sendStatus(500);
    }


})

//read all
app.get("/api/user/", (req, res)=>{

    try{
        const data = db.prepare("SELECT * FROM users");

        if( !data )
        {
            console.log("User not found");
            res.sendStatus(404);
            return;
        }
        console.log(data.all());
        res.send(data.all());

    } catch(err)
    {
        console.error(err);
        res.sendStatus(500);
    }


})

//update
app.put("/api/user/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    if( !id )
    {
        console.log("Enter an id");
        res.sendStatus(400);
        return;
    }

    try{
        const now = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
        if( !now )
        {
            console.log("User not found");
            res.sendStatus(404);
            return;
        }
        //else

        const fix = db.prepare("UPDATE users SET prefix = ?, fname = ?, lname = ?, email = ?, dob = ?, gender = ?, profession = ?, about = ? WHERE id = ?")
        .run(req.body.prefix, req.body.fname, req.body.lname, req.body.email, req.body.dob, req.body.gender, req.body.profession, req.body.about, id);

        console.log("User updated");
        res.send({
            ID: id
            //Since some of these values may not be assigned
            // Prefix: prefix,
            // First_Name: fname,
            // Last_Name: lname,
            // Email: email,
            // Date_of_birth: dob,
            // Gender: gender,
            // Profession: profession,
            // About: about
        });

    } catch(err)
    {
        console.error(err.message);
        res.sendStatus(500);
    }


})

//delete
app.delete("/api/user/:id", (req, res)=>{
    const id = parseInt(req.params.id);

    if( isNaN(id) )
    {
        console.log("Enter an id");
        res.sendStatus(400);
        return;
    }

    try{
        const check = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
        if( !check )
        {
            console.log("User not found");
            return res.sendStatus(404);
        }

        const del = db.prepare("DELETE FROM users WHERE id = ?").run(id);

        
        res.send({
            message: "User successfully deleted",
            ID: id
        });

    } catch(err)
    {
        console.log(err.message);
        res.sendStatus(500);
    }


})

const port = 3005;
app.listen(port, ()=>{
    // console.log(`Server is listening at port ${port}`);
})
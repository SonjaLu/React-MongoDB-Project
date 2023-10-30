require('dotenv').config();
const express = require('express');

const app = express();
const Port = process.env.PORT;
const mongoose = require('mongoose');

const cors = require('cors');

const winston = require('winston');

// Konfiguriere den Logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});


const connectString = process.env.MONGO_DB_CLIENT;
app.use(async (req, res, next) => {
    try {
        await mongoose.connect(connectString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("erfolgreich verbunden");

        //weiteres Objekt in der Abfrage
        //next - übergibt an den nächsten haendler.
        next();
    } catch (error) {
        console.log("ERROR " + error);
        logger.error("Error: " + error);
    }
})

// Erlaube Anfragen von einem bestimmten Ursprung (http://localhost:3000)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());
app.use(cors());

const todoSchema = new mongoose.Schema({
    text: String,
    category: String,
    id: String,
    done: String
})

//collection in der DB wo daten gespeichert werden
const Todo = mongoose.model('Todos', todoSchema);


app.get("/", (req, res) => {
    //zum senden der Daten body verwenden.
    //url die request schickt.
    //const urlQuery = req.query;
    res.send("Hallo welt");
})

//erste route. prüfe ob alles ordentlich funktioniert.
//wichtig: message: "text" und nicht "mesage" :"text" schreiben.
app.get("/health-check", (req, res) => {
    res.status(200).send({ "message": "Running Backend works" });
    console.log("Running health check");
})


app.get("/todos", async (req, res) => {
    try {

        const todos = await Todo.find({});
        res.status(200).send({
            "todos": todos,
            "message": "fetched todos"
        });
    } catch {
        res.status(500).send({ "message": "could not fetch todos" });
    }
})


app.post("/addTodo", async (req, res) => {

    try {
        const todoToAdd = req.body;
        const addedTodo = await Todo.create(todoToAdd);

        res.status(201).send({ "message": "added new todo" });
    } catch {
        res.status(500).send({ "message": "could not add todo" });
    }
})


/**
 * 2023-10-14
 * Route zum Löschen des Todos aus der Datenbank. 
 */
app.post("/deleteTodo/:id", async (req, res) => {

    try {
        const {todoID} = req.params;
        await Todo.deleteOne(todoID);

        res.status(201).send({ "message": "delete todo" });
    } catch {
        res.status(500).send({ "message": "could not delete todo" });
    }
})


app.listen(Port, () => {
    console.log("Running backend");
})
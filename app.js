const express = require("express");
const fs = require('fs');
const app = express();
app.use(express.json());

const SuperHeroManager = require('./SuperHeroManager')
const Event = require('./Event');
const SuperHero = require("./SuperHero");

let database = fs.readFileSync('Database.json');
const superheroDatabase = JSON.parse(database)
let eventsdatabase = fs.readFileSync('EventTypes.json');
const eventdatabase = JSON.parse(eventsdatabase)

const superHeroManager = new SuperHeroManager(superheroDatabase, eventdatabase);

app.get("/database", function (_req, res) {
    res.status(200).send(superheroDatabase)
});
app.get("/eventdatabase", function (_req, res) {
    res.status(200).send(eventdatabase)
});
app.post("/registerSuperHero", function (req, res) {
    superheroDatabase.push(req.body)
    superHeroManager.updateSuperheroDatabase(superheroDatabase)
    fs.writeFileSync('Database.json', JSON.stringify(superheroDatabase));
    res.status(200).send(superheroDatabase)
});
app.post("/registerEvent", function (req, res) {
    Object.keys(req.body).forEach((eventName) => {
        eventdatabase[eventName] = req.body[eventName]
    });
    superHeroManager.updateEventsDatabase(eventdatabase)
    fs.writeFileSync('EventTypes.json', JSON.stringify(eventdatabase));
    res.status(200).send(eventdatabase)
});


app.get("/events", function (_req, res) {
    res.status(200).send(superHeroManager.getEvents())
});
app.get("/superheroes", function (_req, res) {
    res.status(200).send(superHeroManager.getSuperheroes())
});
app.get("/interventionPlan", function (_req, res) {
    res.status(200).send(superHeroManager.getSuperheroes())
});
app.post("/event", function (req, res) {
    const event = new Event(req.body.type, req.body.location)
    superHeroManager.addEvent(event)
    res.sendStatus(200)
});
app.post("/registration", function (req, res) {
    const superhero = new SuperHero(req.body.name)
    superHeroManager.addSuperhero(superhero)
    res.sendStatus(200)
});

app.use(express.static('browserApp'));
app.get("/", function (_req, res) {
    res.sendFile(__dirname + "/browserApp/index.html");
});
app.listen(3000, function () {
    console.log("Server is running on localhost3000");
});
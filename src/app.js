const path = require("path");
const express = require('express');
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Jolene Zheng"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Jolene Zheng"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page",
        content: "help page content",
        name: "Jolene Zheng"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address found"
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        });
    });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Jolene Zheng",
        errorMessage: "Help article not found"
    })
})

app.get("*", (req, res) => { // * means anything that hasn't been matched before
    res.render("404", {
        title: "404",
        name: "Jolene Zheng",
        errorMessage: "Page not found"
    });
})

app.listen(port, () => {
    console.log("Server is up on port " + port);
});

// app.get("", (req, res) => { // 1st parameter takes in the url
//     // 2nd parameter tells it what to do once on the url (i.e. html code to send)
//     res.send("Hello express!");
// });
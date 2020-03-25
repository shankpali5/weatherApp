const path = require("path")
const express = require("express")
const hbs = require("hbs")
const utils = require(path.join(__dirname, "../../weatherApp/utis"))

const app = express()

// paths
const staticPath = path.join(__dirname, "../public")
const tempPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//value
const name = "Shashank"

// hbs
app.set("view engine", "hbs")
app.set("views", tempPath)
hbs.registerPartials(partialsPath)

// static dir
app.use(express.static(staticPath))

// Listen
app.listen(3000, () => {
    console.log("Server Started on 3000")
})

//Get
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Get Help",
        msg: "We are happy to help you",
        name
    })
})

app.get("/weather", ({query}, res) => {
    if (!query.add) {
        return res.send({report: "provide address"})
    }
    utils.getTempForAddress(query.add, ({ place, temp } = {}) => res.send({report: place + ": " + temp}))
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error",
        error: "Can't found this article",
        name
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        error: "Page not found",
        name
    })
})
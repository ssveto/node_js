const express = require("express");
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Welcome to index homepage")
})

app.get("/about", (req, res) => {
    res.send("Welcome to about page")
})

app.get("/contact-me", (req, res) => {
    res.send("You can contact me here")
})

app.get("*", (req, res) => {
    res.status(404).send("Page not found")
})

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`);
})
const express = require("express");
const config = require("./config");
const routes = require("./src/routes");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.set("debug", config.IS_PRODUCTION);
mongoose.connection
    .on("error", error => console.log(error))
    .on("close", () => console.log("Database connection closed."))
    .once("open", () => {
        const info = mongoose.connections[0];
        console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    });
mongoose.connect(
    config.MONGO_URL, {
        useNewUrlParser: true
    }
);

const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get("/", (req, res) => {
    res.send({
        ok: true,
        message: 'Hello World'
    });
});

app.use("/api", routes.api);

app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // render the error page
    res.status(err.status || 500);
    res.send({
        ok: false,
        message: 'Error ' + (err.status || 500)
    });
});

app.listen(config.PORT, () => {
    console.log("API app started PORT: " + config.PORT);
});
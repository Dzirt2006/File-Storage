const express = require("express");
const app = express();
const path = require("path");
const http = require('http');
const morgan = require("morgan");
const compression = require('compression');
const db = require("./db");
const bodyParser = require('body-parser');


module.exports = app;

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


//use compression middleware for increasing perfomance
app.use(compression());

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "../public")));

// Send index.html for any other requests
app.get("*", async (req, res, next) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
    if (path.extname(req.path).length) {
        const err = new Error("Not found");
        err.status = 404;
        next(err);
    } else {
        next();
    }
});

//add api
app.use("/auth", require("./api/auth"));

// error handling endware
app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
});

db.sync().then(() => {
    server.listen(PORT, () =>
        console.log(`studiously serving silly sounds on port http://localhost:${PORT}`));
})

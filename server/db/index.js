const Sequielize = require("sequelize");
const package = require("../../package.json");

const dbName = package.name;


const db =new Sequielize(
    process.env.DATABASE_URL ||
    `postgres://postgres:w2w2@localhost:5432/${dbName}`,
    {
        logging: false
    }
)

module.exports = db;
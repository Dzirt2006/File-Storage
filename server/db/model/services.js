const { Sequelize } = require('sequelize');
const Sequelzie = require('sequelize');
const db = require('../index');
import { v4 as uuidv4 } from 'uuid';


const Service = db.define('service', {
    url: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uuid: {
        type: Sequelize.STRING
    }
})

Service.beforeCreate((service) => {
    service.uuid = uuidv4();
})
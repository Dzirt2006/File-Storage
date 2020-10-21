const  Sequelize  = require('sequelize');
const db = require('../index');
const uuid = require('uuid');


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
    service.uuid = uuid.v4();
})

module.exports = Service;
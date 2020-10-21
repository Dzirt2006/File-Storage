const User = require('./user');
const Service = require('./services');

User.hasMany(Service);

module.exports = {
    User,
    Service
}
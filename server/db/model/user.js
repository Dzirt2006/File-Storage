const Sequelize = require('sequelize');
const crypto = require('crypto')
const db = require('../index');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
            return () => this.getDataValue('password')
        }
    },
    salt: {
        type: Sequelize.STRING,
        get() {
            return () => this.getDataValue('salt')
        }
    },
    lastEnterDate: {
        type: Sequelize.DATE
    }
})

User.prototype.correctPassword = function(password) {
    return User.encryptPassword(password, this.salt()) === this.password()
  }

User.generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
}

User.encryptPassword = function (plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
}


const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
    users.forEach(setSaltAndPassword)
})

module.exports = User;


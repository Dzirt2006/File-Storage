const router = require('express').Router();
const { User } = require('../db/model/user');

module.exports = router;


router.post('/login', (req, res, next) => {
    try {
        const user = User.findOne({ where: { email: req.body.email } })
        if (!user) {
            res.sendStatus(400).send("User with this email/password doesn't exist");
        } else if (!user.correctPassword(req.body.password)) {
            res.sendStatus(400).send("Incorect password for user ", req.body.email);
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        next(err);
    }
})

router.post('/signup', (req, res, next) => {
    try {
        const user = User.create(req.body);
        console.log("User created")
        res.status(200).json(user);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(401).send('User already exists')
        } else {
            next(err)
        }
    }

})

router.put('/change_password', (req, res, next) => {
    try {
        const user = User.update({ password: req.body.password }, { where: { email: req.body.email } });
        console.log("User updated")
        res.status(200).json(user);
    } catch (err) {

    }

})


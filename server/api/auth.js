const router = require('express').Router();
const { User } = require('../db/model');
const bodyParser = require('body-parser');
const cors = require('cors');

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })



module.exports = router;


/**
 * side validation
 * may dynamically definied through the function that will check the header
 */
const corsOption = {
    origin: 'http://localhost:8000/',
    optionsSuccessStatus: 200
}


/**
 * this api for side auth using, 
 * when used has uuid in url whch is means 
 * that he was redirected from another app
 */

router.put('/side_login', cors(corsOption), async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (!user) {
            console.log('400')
            res.sendStatus(400).send("User with this email/password doesn't exist");
        } else if (!user.correctPassword(req.body.password)) {
            console.log('402')
            res.sendStatus(400).send("Incorect password for user ", req.body.email);
        } else {
            console.log('200')
            req.session.userId = user.id
            req.login(user, err => (err ? next(err) : res.json(user)));// serialize user
        }
    } catch (err) {
        next(err);
    }
})


/**
 * for internal use
 */

router.put('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (!user) {
            console.log('400')
            res.sendStatus(400).send("User with this email/password doesn't exist");
        } else if (!user.correctPassword(req.body.password)) {
            console.log('402')
            res.sendStatus(400).send("Incorect password for user ", req.body.email);
        } else {
            console.log('200')
            req.session.userId = user.id
            req.login(user, err => (err ? next(err) : res.json(user)));// serialize user
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

router.put('/change_password', urlencodedParser, (req, res, next) => {
    try {
        const user = User.update({ password: req.body.password }, { where: { email: req.body.email } });
        console.log("User updated")
        res.status(200).json(user);
    } catch (err) {

    }

})

router.get("/all", (req, res, next) => {
    try {
        User.findAll().then(data => res.json(data));
    } catch (err) {
        next(err);
    }
})

router.get('/me', (req, res) => {
    console.log("dfsfsdfds");
    console.log(req.user);
    res.json(req.user);
})
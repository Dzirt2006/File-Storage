const router = require('express').Router();
const  User  = require('../db/model/user');
const bodyParser = require('body-parser')
const cors = require('cors');

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })



module.exports = router;


//side validation
const corsOption={
    origin: function(origin,callback){
        
    }
}

router.post('/login',cors(corsOption),async (req, res, next) => {
   
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
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

router.put('/change_password',urlencodedParser, (req, res, next) => {
    try {
        const user = User.update({ password: req.body.password }, { where: { email: req.body.email } });
        console.log("User updated")
        res.status(200).json(user);
    } catch (err) {

    }

})

router.get("/all",(req,res,next)=>{
    try{
        User.findAll().then(data=>res.json(data));
    }catch(err){
        next(err); 
    }
})
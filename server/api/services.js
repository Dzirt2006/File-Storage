const router = require('express').Router();
const { Service, User } = require('../db/model');

module.exports = router;

router.put('/all', async (req, res, next) => {
    try {
        const id = req.user.id;
        const services = await Service.findAll({where:{userId:id}});
        console.log('api ',services)
        res.json(services)
    } catch (err) {
        next(err);
    }
})


router.post('/', async (req, res, next) => {
    const id = req.user.id;
    const service = req.body;
    console.log(service)
    try {
        await User.findOne({ where: { id: id } })
            .then(user => user.createService(service))
            .then(serv=>console.log(service))
    } catch (err) {
        next(err);
    }
})

router.put('/:serviceId', (req, res, next) => {
    const id = req.user.id;
    console.log(id)
})
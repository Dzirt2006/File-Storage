const router = require('express').Router()
module.exports = router;

router.use("/auth", require("./auth"));
router.use("/services", require("./services"));
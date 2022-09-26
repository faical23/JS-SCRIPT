const express = require("express");
const router = express.Router()
const PeapleRouters = require('./Peaple.Routers');
router.use("/Peaple", PeapleRouters);
module.exports = router
                

        const express = require('express')
        const router = express.Router()
        const PeapleController = require('../Controllers/Peaple.Controllers')
        router.post('/',PeapleController.Create)
        router.get('/',PeapleController.GetAll)
        router.get('/:id',PeapleController.GetOne)
        router.put('/:id',PeapleController.Update)
        router.delete('/:id',PeapleController.Delete)
        module.exports = router
    
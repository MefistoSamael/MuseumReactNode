const Router = require('express')
const router = new Router()
const themeController = require('../controllers/themeController')

router.post('/', themeController.create)
router.get('/', themeController.getAll)
router.get('/:id', themeController.getById)
router.put('/:id', themeController.update)
router.delete('/:id', themeController.delete)

module.exports = router

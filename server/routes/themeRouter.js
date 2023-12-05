const Router = require('express')
const router = new Router()
const themeController = require('../controllers/themeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('USER'), themeController.create)
router.get('/',  themeController.getAll)
router.get('/:id',  themeController.getById)
router.put('/:id', checkRoleMiddleware('USER'), themeController.update)
router.delete('/:id', checkRoleMiddleware('USER'), themeController.delete)

module.exports = router

const Router = require('express')
const router = new Router()
const artFormController = require('../controllers/artFormController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('USER'), artFormController.create)
router.get('/',  artFormController.getAll)
router.get('/:id',  artFormController.getById)
router.put('/:id', checkRoleMiddleware('USER'), artFormController.update)
router.delete('/:id', checkRoleMiddleware('USER'), artFormController.delete)

module.exports = router

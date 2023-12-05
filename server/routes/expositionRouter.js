const Router = require('express')
const router = new Router()
const expositionController = require('../controllers/expositionController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

    router.post('/', checkRoleMiddleware('USER'), expositionController.create)
router.get('/',  expositionController.getAll)
router.get('/:id',  expositionController.getById)
router.put('/:id', checkRoleMiddleware('USER'), expositionController.update)
router.delete('/:id', checkRoleMiddleware('USER'), expositionController.delete)

module.exports = router

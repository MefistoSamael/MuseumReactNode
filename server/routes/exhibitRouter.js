const Router = require('express')
const router = new Router()
const exhibitController = require('../controllers/exhibitController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('USER'), exhibitController.create)
router.get('/',  exhibitController.getAll)
router.get('/:id',  exhibitController.getById)
router.put('/:id', checkRoleMiddleware('USER'), exhibitController.update)
router.delete('/:id', checkRoleMiddleware('USER'), exhibitController.delete)

module.exports = router

const Router = require('express')
const router = new Router()
const exhibitController = require('../controllers/exhibitController')

router.post('/', exhibitController.create)
router.get('/', exhibitController.getAll)
router.get('/:id', exhibitController.getById)
router.put('/:id', exhibitController.update)
router.delete('/:id', exhibitController.delete)

module.exports = router

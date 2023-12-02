const Router = require('express')
const router = new Router()
const expositionController = require('../controllers/expositionController')

router.post('/', expositionController.create)
router.get('/', expositionController.getAll)
router.get('/:id', expositionController.getById)
router.put('/:id', expositionController.update)
router.delete('/:id', expositionController.delete)

module.exports = router

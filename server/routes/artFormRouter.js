const Router = require('express')
const router = new Router()
const artFormController = require('../controllers/artFormController')

router.post('/', artFormController.create)
router.get('/', artFormController.getAll)
router.get('/:id', artFormController.getById)
router.put('/:id', artFormController.update)
router.delete('/:id', artFormController.delete)

module.exports = router

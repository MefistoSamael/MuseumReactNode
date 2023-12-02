const Router = require('express')
const router = new Router()
const artFormRouter = require('./artFormRouter')
const exhibitRouter = require('./exhibitRouter')
const expositionRouter = require('./expositionRouter')
const themeRouter = require('./themeRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/exhibit', exhibitRouter)
router.use('/exposition', expositionRouter)
router.use('/artform', artFormRouter)
router.use('/theme', themeRouter)

module.exports = router

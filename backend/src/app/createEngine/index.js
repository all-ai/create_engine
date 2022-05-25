const {Router}  = require("express")
const createRouter = require("./router")


let router = Router()

router.use(createRouter)

module.exports = router

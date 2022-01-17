const router = require('express').Router()
const categoryCtl = require('../controllers/categoryCtl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/')
    .post(auth, authAdmin, categoryCtl.createCategory)
    .get(categoryCtl.getCategory)

router.route('/:id')
    .put(auth, authAdmin, categoryCtl.updateCategory)
    .delete(auth, authAdmin, categoryCtl.deleteCategory)


module.exports = router
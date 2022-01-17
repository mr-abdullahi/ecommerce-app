const router = require('express').Router()
const productCtl = require('../controllers/productCtl')
const prodouctCtl = require('../controllers/productCtl')
const upload = require('./upload')

router.route('/')
    .post(upload.single('file'), prodouctCtl.createProduct)
    .get(productCtl.getProduct)

router.route('/:id')
    .put(productCtl.updateProduct)
    .delete(productCtl.deleteProduct)


module.exports = router
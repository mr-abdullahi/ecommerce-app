const router = require('express').Router();
const userCtl = require('../controllers/userCtl')

router.post('/register',userCtl.register)
router.get('/logout', userCtl.logout)
router.post('/login', userCtl.login)
router.get('/refresh_token', userCtl.refreshToken)
router.get('/infor/:id', userCtl.getInfor)



module.exports = router
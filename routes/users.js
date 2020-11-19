const express=require('express')
const router=express.Router()
const { registerValidations, userController } = require('../controllers/user-controller')

router.get('/register', async(req, res, next)=>{
    res.render('users/register', {
        title:'Register',
        styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
        tname: 'Register'
    })

})
router.post('/register', registerValidations, async(req, res, next)=>{
    await userController.create(req,res,next)
})



router.get('/login', async(req, res, next)=>{
    res.render('users/login', {
        tname:'login',
        title:'login',
        styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
        loginInfo:'active'


        })

})


router.post('/login', async (req, res,nect)=>{
    await userController.authenticate(req,res)
})




module.exports=router
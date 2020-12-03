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


router.post('/login', async (req, res,next)=>{
    await userController.authenticate(req,res)
})


router.get('/logout', async(req, res,next)=>{
    await userController.loggingOut(req, res, next)
})

router.get('/my_profile', async(req, res, next)=>{
        await userController.profile(req,res,next)
    }
)

router.post('/login', async (req, res,next)=>{
    await userController.authenticate(req,res)
})



router.post('/passwordChange', async(req, res,next)=>{
    await userController.passwordChange(req,res,next)
})


router.get('/profile_changes', async(req, res,next)=>{
    res.render('users/profile_changes',{
        title:'Change Password',
        styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
        tname: "Change Password"
    })
})


router.post('/infoChanges', async(req, res,next)=>{
    await userController.infoChanges(req,res,next)
})

router.get('/info_changes', async(req, res,next)=>{
    res.render('users/info_changes',{
        title:'Change Information',
        styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
        tname: "Change Information"
    })
})






module.exports=router
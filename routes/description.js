const express = require('express')
const router = express.Router()
// let descriptionStore = require('../app').descriptionStore
const {descriptionController}=require('../controllers/description-controller')

router.get('/add', async (req, res, next) =>{
    await descriptionController.add(req, res,next)

})
router.post('/save', async (req, res, next)=>{

    await descriptionController.save(req, res,next)

    }
)
router.get('/view', async(req, res, next )=>{
    await descriptionController.view(req, res,next)

    }
)
router.get('/edit', async (req, res, next )=>{
    await descriptionController.edit(req, res,next)


})

router.get('/view_all', async (req, res, next)=>{
    await descriptionController.viewAll(req, res,next)

})



router.get('/destroy', async function(req, res, next) {
    await descriptionController.destroy(req, res,next)

})


router.post('/destroy/confirm', async function(req, res, next){
    await descriptionController.destroyConfirm(req,res,next)
})





module.exports = router;
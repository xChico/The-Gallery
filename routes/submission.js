const express = require('express')
const router = express.Router()
const {submissionController}=require('../controllers/submission-controller')

router.get('/add', async (req, res, next) =>{
    await submissionController.add(req, res,next)


})
router.post('/save', async (req, res, next)=>{

        await submissionController.save(req, res,next)

    }
)
router.get('/view_submission_reg', async(req, res, next )=>{
    await submissionController.viewForRegUser(req, res,next)

})
//
router.get('/view_for_public', async(req, res, next )=>{
    await submissionController.viewForPublic(req, res,next)

})

router.get('/edit', async (req, res, next )=>{
    await submissionController.edit(req, res,next)


})

router.get('/view_all_submission_for_public', async (req, res, next)=>{
    await submissionController.viewAllSubmissionsForPublic(req, res,next)

})
//
router.get('/view_all_submissions_reg_user', async (req, res, next)=>{
    await submissionController.viewAllForRegUser(req, res,next)

})


router.get('/destroy', async function(req, res, next) {
    await submissionController.destroy(req, res,next)

})


router.post('/destroy/confirm', async function(req, res, next){
    await submissionController.destroyConfirm(req,res,next)
})






module.exports = router;
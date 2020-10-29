const express = require('express')
const router = express.Router()
let descriptionStore = require('../app').descriptionStore

router.get('/add', async (req, res, next) =>{
    try{
        res.render('add_description', {
            isCreate: true,
            title: 'Add Description',
            descriptionKey: await descriptionStore.count(),
            styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css']
        })
    }catch (err){
        next(err)
    }
})
router.post('/save', async (req, res, next)=>{
        try {
            let description;
            if (req.body.saveMethod ==='create')
                description = await descriptionStore.create(req.body.descriptionKey,req.body.title, req.body.body)
            else
                description = await descriptionStore.update(req.body.descriptionKey,req.body.title, req.body.body)
            res.redirect('/description/view?key=' + req.body.descriptionKey)

        }catch(err){
            next(err)
        }
    }
)
router.get('/view', async(req, res, next )=>{
    try{
        let description = await descriptionStore.read(req.query.key)
        res.render('view_description',{
            title: 'View Description',
            descriptionTitle: description.title,
            descriptionKey: description.key,
            descriptionBody: description.body,
            styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css']
        })
    }
    catch(err){
        next(err)
    }
    }
)
router.get('/edit', async (req, res, next )=>{
    try{
        let description = await descriptionStore.read(req.query.key)
        console.log(description)
        res.render('edit_description',{
            isCreate: false,
            title: "Edit Description",
            descriptionTitle: description.title,
            descriptionKey: description.key,
            descriptionBody: description.body,
            styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css']
        })
    }
    catch(err){
        next(err)
    }

})

router.get('/view_all', async (req, res, next)=>{
    try{
        let dlist = await descriptionStore.keyList()
        let dPromise = dlist.map(key =>{
            return descriptionStore.read(key)
        })
        let allDescription = await Promise.all(dPromise)
        res.render('view_all_description', {
            descriptionList: exctractDescriptionToLiteral(allDescription),
            title: 'View Entries',
            styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css']
        })
    }
    catch(err){
        next(err)
    }
})

function exctractDescriptionToLiteral(allDescription){
    return allDescription.map(description=> {
        return {
            title: description.title,
            key: description.key,
            body: description.body,

        }
    })
}

router.get('/destroy', async function(req, res, next) {
    try{
        let description = await descriptionStore.destroy(req.query.key)
        res.redirect('/description/view_all')
    }
    catch (err){
        next(err)
    }
})

module.exports = router;
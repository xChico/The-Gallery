let Description = require('../models/description').Description

exports.descriptionController= {
    add: async (req, res, next) => {
        try {
            res.render('package_hbs/add_description', {
                isCreate: true,
                title: 'Add Submission',
                artist: 'Add Submission',
                // descriptionKey: await descriptionStore.count(),
                styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                tname: 'Add Submission'
            })
        } catch (err) {
            next(err)
        }
    },
    save: async (req, res, next) => {
        try {
            let description
            if (req.body.saveMethod === 'create')
                description = await create(req.body.title, req.body.artist, req.body.body)
            else
                description = await update(req.body.descriptionID, req.body.title, req.body.artist, req.body.body)
            res.redirect(`/description/view?id= ${description.id}`)
        } catch (err) {
            next(err)
        }
    },
    edit: async (req, res, next) => {
        try {
            // let description = await descriptionStore.read(req.query.key)
            const description = await Description.findOne( {_id: req.query.id.trim()})
            res.render('package_hbs/edit_description', {
                isCreate: false,
                title: "Edit Submission",
                descriptionTitle: description.title,
                descriptionID: req.query.id,
                descriptionArtist: description.artist,
                descriptionBody: description.body,
                styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                tname: 'Edit Submission'
            })
        } catch (err) {
            next(err)
        }
    },
    view: async (req, res, next) => {
        try {
            // let description = await descriptionStore.read(req.query.key)
            const description = await Description.findOne({_id: req.query.id.trim()})
            res.render('package_hbs/view_description', {
                title: 'View Submission',
                descriptionTitle: description.title,
                descriptionID: req.query.id,
                descriptionArtist: description.artist,
                descriptionBody: description.body,
                styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css']

            })
        } catch (err) {
            next(err)
        }
    },
    viewAll: async (req, res, next) => {
        try {
            const descriptions = await Description.find({})
            let allDescription = descriptions.map(description => {
                return {
                    id: description.id,
                    title: description.title,
                    artist: description.artist,
                    body: description.body
                }
            })
            res.render('package_hbs/view_all_description', {
                descriptionList: allDescription,
                title: 'View All Submissions',
                styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                tname: "View all Submissions"
            })
        } catch (err) {
            next(err)
        }
    },
    destroy: async (req, res, next) => {
        try {

            let description = await Description.findOne({_id:req.query.id.trim()})
            res.render('package_hbs/delete_description',{
                title: 'Delete confirmation',
                descriptionTitle: description.title,
                descriptionID: req.query.id,
                styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                tname: "Delete Submission"
            })
        } catch (err) {
            next(err)
        }
    },

    destroyConfirm: async (req, res, next) => {
    try {
        await Description.findByIdAndDelete(req.body.descriptionID)
        res.redirect('/description/view_all')
    } catch (err) {
        next(err)
    }
}






}


create = async(title,artist,body )=>{
    let descriptionTemp = new Description({
        title: title,
        artist: artist,
        body: body
    })
    let description = await descriptionTemp.save()
    return description;
}


update=async(id, title, artist, body)=>{
    id=id.trim()
    let description = await Description.findByIdAndUpdate({_id:id}, {title: title, artist:artist, body:body}, {new:true})
    return description
}


destroy=async(key) =>{
        const description = await Description.deleteOne({_id: id})
        return description
    }

    // const destroy = async(id)=>{
    //
    //     const description = await Description.deleteOne({id: id})
    //
    //     return description
    // }


    //
    // async findAllDescription(){
    //
    //     const description = await Description.find({})
    //     await mongoose.disconnect()
    //     return description.map(description=> {
    //         return {
    //             key: description.key,
    //             title: description.title,
    //             artist: description.artist,
    //             body: description.body
    //         }
    //     })
    // },
    //


    // count: async ()=>{
    //
    //     let description = await Description.find({})
    //     let arr = description.map(documents => {return documents.key})
    //     let count = Math.max(...arr) +1
    //     await mongoose.disconnect()
    //     return count
    // }
//


//
//     async destroy(key){
//
//         const description = await Description.deleteOne({key: key})
//             await mongoose.disconnect()
//         return description
//     }
//     async count(){
//
//         let description = await Description.find({})
//         let arr = description.map(documents => {return documents.key})
//         let count = Math.max(...arr) +1
//         await mongoose.disconnect()
//         return count
//     }
//
// }















//
//
//
//

//  //
//     // async read(key){
//     //     await connectDB()
//     //     const description =await Description.findOne({key: key})
//     //     await mongoose.disconnect()
//     //     return description
//     // }
//
//     update=async(id,title,artist,body)=>{
//         id=id.trim()
//         let description = await Description.findByIdAndUpdate({_id:id}, {title:title, artist:artist, body:body}, {new:true})
//         return description;
//     }
//
//
//



//
// destroy:async(req,res,next)=>{
//     try{
//         let description = await Description.findOne({_id:req.query.id.trim()})
//         res.render('description/delete_description',{
//             title: 'Delete Submission',
//             descriptionId: req.query.id,
//             styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
//             tname: "Destroy"
//         })
//     }catch(err){
//         next(err)
//     }
// },
//
//
//
// destroyConf:async(req,res,next)=>{
//     try{
//         await Description.findByInAndDelete(req.body.descriptionID)
//         req.flash('success', 'entry deleted')
//         res.redirect('/description/viewAll')
//     }catch(err){
//         next(err)
//     }
// }








let Description = require('../models/description').Description
let { User } = require('../models/user')

exports.descriptionController= {
    add: async (req, res, next) => {
        if(req.isAuthenticated()) {
            try {
                res.render('package_hbs/add_description', {
                    isCreate: true,
                    title: 'Add Submission',
                    artist: 'Add Submission',
                    styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                    tname: 'Add Submission'

                })
            } catch (err) {
                next(err)
            }
        }else{
            req.flash('error', 'Please log in to access page.')
            res.redirect('/users/login')
        }
    },
    save: async (req, res, next) => {
        try {
            let description
            if (req.body.saveMethod === 'create') {
                description = await create(req.body.title, req.body.artist, req.body.body)
                req.user.description.push(description.id.trim())
                req.user=await User.findByIdAndUpdate({_id: req.user.id.trim() }, {description: req.user.description},{new: true})
            }
            else
                description = await update(req.body.descriptionID, req.body.title, req.body.artist, req.body.body)
            res.redirect(`/description/view?id= ${description.id}`)
        } catch (err) {
            next(err)
        }
    },
    edit: async (req, res, next) => {
        if(req.isAuthenticated()) {
            try {
                const description = await Description.findOne({_id: req.query.id.trim()})
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
        }else{
            req.flash('error', 'Please log in to access page.')
            res.redirect('/users/login')
        }
    },
    view: async (req, res, next) => {
        if(req.isAuthenticated()) {
            try {

                const description = await Description.findOne({_id: req.query.id.trim()})
                res.render('package_hbs/view_description', {
                    title: 'View Submission',
                    descriptionTitle: description.title,
                    descriptionID: req.query.id,
                    descriptionArtist: description.artist,
                    descriptionBody: description.body,
                    styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                    tname: 'View Submission'

                })
            } catch (err) {
                next(err)
            }
        } else{
            req.flash('error','Please log in to access page.')
            res.redirect('/users/login')
        }
    },
    viewForAll: async (req, res, next) => {

            try {
                const description = await Description.findOne({_id: req.query.id.trim()})
                res.render('package_hbs/view_for_all', {
                    title: 'View All Artwork',
                    descriptionTitle: description.title,
                    descriptionID: req.query.id,
                    descriptionArtist: description.artist,
                    descriptionBody: description.body,
                    styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                    tname: 'View All Artwork'

                })
            } catch (err) {
                next(err)
            }
    },
    viewAll: async (req, res, next) => {
        if(req.isAuthenticated()) {
            try {
                let descriptionIds = req.user.description
                let descriptionPromises = descriptionIds.map(id=>Description.findOne({_id: id}))
                let descriptions = await Promise.all(descriptionPromises)
                console.log(descriptions)
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
                    title: 'View your Submissions',
                    styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                    tname: "View your Submissions"
                })
            } catch (err) {
                next(err)
            }
        } else{
            req.flash('error', 'Please log in to access page.')
            res.redirect('/users/login')
        }
    },
    viewAllSubmissions: async (req, res, next) => {

            try {
                const descriptions = await Description.find({})
                randomArray(descriptions)
                let allDescription = descriptions.map(description => {
                    return {
                        id: description.id,
                        title: description.title,
                        artist: description.artist,
                        body: description.body
                    }
                })
                res.render('package_hbs/view_all_submissions', {
                    descriptionList: allDescription,
                    title: 'View All Submissions',
                    styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                    tname: "View All Submissions"
                })
            } catch (err) {
                next(err)
            }

    },

    destroy: async (req, res, next) => {
        try {
            let description = await Description.findOne({_id: req.query.id.trim()})
            res.render('package_hbs/delete_description', {
                title: 'Delete Submission',
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
            const descriptionIndex = req.user.description.indexOf(req.body.descriptionID.trim())
            req.user.description.splice(descriptionIndex, 1)
            req.user = await User.findByIdAndUpdate({_id:req.user.id}, {description : req.user.description}, {new: true})       // new:true ensures updated user is returned
            await Description.findByIdAndDelete(req.body.descriptionID)
            req.flash('success', 'Submission removed successfully.')
            res.redirect('/description/view_all_description')
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
destroy=async(id) =>{
        const description = await Description.deleteOne({_id: id})
        return description
    }

randomArray= function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


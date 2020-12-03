let Submission = require('../models/submission').Submission
let { User } = require('../models/user')




exports.submissionController= {
    add: async (req, res, next) => {
        if(req.isAuthenticated()) {
            try {
                res.render('package_hbs/add_submission', {
                    isCreate: true,
                    artFile: 'Add art',
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
            let submission
            if (req.body.saveMethod === 'create') {
                submission = await create(req.body.artFile, req.body.title, req.body.artist, req.body.body)
                req.user.submission.push(submission.id.trim())
                req.user=await User.findByIdAndUpdate({_id: req.user.id.trim() }, {submission: req.user.submission},{new: true})
                req.flash('success', 'Submission added successfully.')

            }
            else {
                submission = await update(req.body.submissionID, req.body.artFile, req.body.title, req.body.artist, req.body.body)
                req.flash('success', 'Submission edit successfully.')
            }
            res.redirect(`/submission/view_submission_reg?id= ${submission.id}`)


        } catch (err) {
            next(err)
        }
    },
    edit: async (req, res, next) => {
        if(req.isAuthenticated()) {
            try {
                const submission = await Submission.findOne({_id: req.query.id.trim()})

                res.render('package_hbs/edit_submission', {
                    isCreate: false,
                    submissionArtFile: submission.artFile,
                    title: "Edit Submission",
                    submissionTitle: submission.title,
                    submissionID: req.query.id,
                    submissionArtist: submission.artist,
                    submissionBody: submission.body,
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
    viewForRegUser: async (req, res, next) => {
        if(req.isAuthenticated()) {
            try {

                const submission = await Submission.findOne({_id: req.query.id.trim()})
                res.render('package_hbs/view_submission_reg', {
                    artFile: submission.artFile,
                    title: 'View Submission',
                    submissionArtFile: submission.artFile,
                    submissionTitle: submission.title,
                    submissionID: req.query.id,
                    submissionArtist: submission.artist,
                    submissionBody: submission.body,
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
    viewForPublic: async (req, res, next) => {

        try {
            const submission = await Submission.findOne({_id: req.query.id.trim()})
            res.render('package_hbs/view_for_public', {
                artFile: submission.artFile,
                title: 'View All Artwork',
                submissionArtFile: submission.artFile,
                submissionTitle: submission.title,
                submissionID: req.query.id,
                submissionArtist: submission.artist,
                submissionBody: submission.body,
                styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                tname: 'View All Artwork'

            })
        } catch (err) {
            next(err)
        }
    },
    viewAllForRegUser: async (req, res, next) => {
        if(req.isAuthenticated()) {
            try {
                let submissionIds = req.user.submission
                let submissionPromises = submissionIds.map(id=>Submission.findOne({_id: id}))
                let submissions = await Promise.all(submissionPromises)
                let allSubmission = submissions.map(submission => {
                    return {
                        id: submission.id,
                        artFile: submission.artFile,
                        title: submission.title,
                        artist: submission.artist,
                        body: submission.body
                    }
                })
                res.render('package_hbs/view_all_submissions_reg_user', {
                    submissionList: allSubmission,
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
    viewAllSubmissionsForPublic: async (req, res, next) => {

        try {
            const submissions = await Submission.find({})
            randomArray(submissions)
            let allSubmission= submissions.map(submission => {
                return {
                    id: submission.id,
                    artFile: submission.artFile,
                    title: submission.title,
                    artist: submission.artist,
                    body: submission.body
                }
            })
            res.render('package_hbs/view_all_submission_for_public', {
                submissionList: allSubmission,
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
            let submission = await Submission.findOne({_id: req.query.id.trim()})
            res.render('package_hbs/delete_submission', {
                title: 'Delete Submission',
                submissionArtFile: submission.artFile,
                submissionTitle: submission.title,
                submissionID: req.query.id,
                styles: ['/assets/stylesheets/second.css', '/assets/stylesheets/style.css'],
                tname: "Delete Submission"
            })
        } catch (err) {
            next(err)
        }
    },

    destroyConfirm: async (req, res, next) => {
        try {
            const submissionIndex = req.user.submission.indexOf(req.body.submissionID.trim())
            req.user.submission.splice(submissionIndex, 1)
            req.user = await User.findByIdAndUpdate({_id:req.user.id}, {submission : req.user.submission}, {new: true})       // new:true ensures updated user is returned
            await Submission.findByIdAndDelete(req.body.submissionID)
            req.flash('success', 'Submission removed successfully.')
            res.redirect('/submission/view_all_submissions_reg_user')
        } catch (err) {
            next(err)
        }
    }







}









create = async(artFile, title,artist,body )=>{
    let submissionTemp = new Submission({
        artFile: artFile,
        title: title,
        artist: artist,
        body: body
    })
    let submission = await submissionTemp.save()
    return submission;
}
update=async(id, artFile, title, artist, body)=>{
    id=id.trim()
    let submission = await Submission.findByIdAndUpdate({_id:id}, {artFile: artFile, title: title, artist:artist, body:body}, {new:true})
    return submission
}
destroy=async(id) =>{
    const submission = await Submission.deleteOne({_id: id})
    return submission
}

randomArray= function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


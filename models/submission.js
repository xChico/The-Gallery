const mongoose = require('mongoose')


const SubmissionSchema = new mongoose.Schema({
    artFile:{
        type:String,
        required:[true,'upload required']

    },
    title:{
        type: String,
        required:[true, 'Art work name is required'],
        minlength: [3, 'Minimum Title Length is 2 characters']
    },
    artist:{
        type: String,
        required:[true, 'Name of Author is required'],
        minlength: [2, 'Minimum Title Length is 2 characters']
    },

    body:{
        type: String,
        required: [true, 'Art description is required']
    }
})
SubmissionSchema.set('toObject', {getters: true, virtuals: true})
exports.Submission = mongoose.model('submission', SubmissionSchema)


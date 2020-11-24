const mongoose = require('mongoose')
const DescriptionSchema = new mongoose.Schema({
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
DescriptionSchema.set('toObject', {getters: true, virtuals: true})
exports.Description = mongoose.model('descriptions', DescriptionSchema)


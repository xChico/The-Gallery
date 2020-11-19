// let Description= require('./description').Description
// let AbstractDescriptionStore = require('./description').AbstractDescriptionStore
// const mongoose= require('mongoose')
// const connectDB = async() => {
//     try{
//         await mongoose.connect(process.env.DB_URL, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         })
//     }catch(err){
//         console.log(err)
//     }
// }
// exports.MongooseDescriptionStore= class MongooseDescriptionStore extends AbstractDescriptionStore{
//     async update(key, title, artist, body){
//         await connectDB()
//         let description = await Description.findOneAndUpdate({key:key}, {
//
//             key: key,
//             title: title,
//             artist: artist,
//             body: body
//         })
//         await mongoose.disconnect()
//         return description
//     }
//     async create(key, title, artist, body){
//         await connectDB()
//         let description = new Description({
//             key: key,
//             title: title,
//             artist: artist,
//             body: body
//         })
//         await description.save()
//         await mongoose.disconnect()
//         return description
//     }
//
//     async read(key){
//         await connectDB()
//         const description =await Description.findOne({key: key})
//         await mongoose.disconnect()
//         return description
//     }
//     async findAllDescription(){
//         await connectDB()
//         const description = await Description.find({})
//         await mongoose.disconnect()
//         return description.map(description=> {
//             return {
//                 key: description.key,
//                 title: description.title,
//                 artist: description.artist,
//                 body: description.body
//             }
//         })
//     }
//     async destroy(key){
//         await connectDB()
//         const description = await Description.deleteOne({key: key})
//             await mongoose.disconnect()
//         return description
//     }
//     async count(){
//         await connectDB()
//         let description = await Description.find({})
//         let arr = description.map(documents => {return documents.key})
//         let count = Math.max(...arr) +1
//         await mongoose.disconnect()
//         return count
//     }
//
// }

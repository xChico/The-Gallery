const Jimp = require('jimp')
const fs = require('fs')

exports.extra1=function(){ Jimp.read('/public/images/random.jpg', function (err, image) {
    image.resize(250, 250)
    image.getBase64(Jimp.AUTO, function(err, data) {
        let base64Data = data.replace(/^data:image\/png;base64,/, "");
        fs.writeFile('/public/images/new4.jpg', base64Data, 'base64', function(err) {
            if(err) {
                return console.log(err)
            }
        })

    })
})}
const Jimp = require('jimp')
exports.extra1 = function () {
    Jimp.read('public/images/random.jpg', function (err, image) {
        image.resize(250, 250)
        image.getBase64(Jimp.AUTO, function (err, src) {
            let img = document.createElement("img")
            img.src = src
            img.className = 'middle'
            document.querySelector('div').appendChild(img)
        })
    })
}
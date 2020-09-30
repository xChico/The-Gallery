let extra = require('./extra')


exports.obtainingArt = function(info){
        console.log('Upload any art you wish')
        extra.extra1()
        info.on('Text', function(count){
            console.log('event received' + (count+1))
        })
}




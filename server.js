const http = require('http')
const fs = require('fs')
const path = require('path')
let app = http.createServer((request, response) => {
    console.log('Request starting...', request.url)

    let filePath = '.' + request.url
    if (filePath === './')
        filePath = './public/views/index.html'
    let lists={
        '.html': "text/html",
        '.js':"text/javascript",
        '.png':"image/png",
        '.css':"text/css"
    }
    if (!fs.existsSync(filePath)) {
            response.writeHead(404)
            response.end()
        }
        else{
        fs.readFile(filePath, function (error, content){
            if(error) {
                response.writeHead(500)
                response.end()
            }else {
                let list = lists[require('path').extname(filePath)]
                response.setHeader('Content-Type', list)
                response.writeHead(200)
                response.end(content, 'utf-8')
            }
        })
        }
    }
    )
app.listen(3000)
console.log('Server is running at 127.0.0.1:3000/ or http://localhost:3000')
const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')
const httpStatus = require('http-status-codes')
const routeMap = {
    '/':  './public/views/index.html',
    '/about': './public/views/about.html'
}
let app = http.createServer((request, response) => {
    console.log('Request starting...', request.url)
    /*
    let filePath = '.' + request.url
    if (filePath === './')
        filePath = './public/views/index.html'
    let lists={
        '.html': "text/html",
        '.js':"text/javascript",
        '.png':"image/png",
        '.jpg': "image/jpg",
        '.css':"text/css"
    }
*/
    let route = routeMap[request.url]
    /*if(request.url === './') */
    if(!route)
        route= '.' + request.url
        if (!fs.existsSync(route)) {
            response.writeHead(404)
            response.end()
        }
        else{
        fs.readFile(route, function (error, content){
            if(error) {
                response.writeHead(500)
                response.end()
            }else {
                let contentType=mime.lookup(route)
                /*let list = lists[require('path').extname(filePath)]*/
                response.writeHead(200, {'Content-Type':contentType})
                response.write(content)
                response.end()
            }
        })
        }
    }
    )
app.listen(3000)
console.log('Server is running at 127.0.0.1:3000/ or http://localhost:3000')
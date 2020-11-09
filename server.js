require('dotenv').config();
const routes = require('./route/main_route.js')
const http = require('http');
const server = http.createServer((req,res)=>{
    var response = routes.get(req,res);
})
const PORT = process.env.PORT || 5555

server.listen(PORT,() => console.log(`Server running on port ${PORT}`))



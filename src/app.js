const Koa = require('koa')
const koaBody = require('koa-body')

const app = new Koa()

app.use(koaBody())

const products = require('./products')
app.use(products.routes())

const server = app.listen(8080, ()=>{
    console.log('Servidor Koa escuchando en el puerto 8080')
})
server.on('error', error => console.log('Error en servidor Koa:', error))
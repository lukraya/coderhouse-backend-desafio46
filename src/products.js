const Router = require('koa-router')

const router = new Router({
    prefix: '/productos'
})

const products = [
    {
        title: 'prod1',
        price: 4500,
        thumbnail: 'url1',
        stock: 50,
    },
    {
        title: 'prod2',
        price: 3100,
        thumbnail: 'url2',
        stock: 50,
    },
]


router.get('/', (ctx, next) => {
    ctx.body = {
        status: 'success',
        message: products
    };
    next()
});

router.get('/:title', (ctx, next) => {
    const product = products.filter((prod)=>{
        if (prod.title === ctx.params.title) {
            return true
        }
    });

    if (product.length) {
        ctx.body = product[0]
    } else {
        ctx.response.status = 404
        ctx.body = {
            status: 'error!',
            message: 'Producto no encontrado'
        }
    }
    next()
})

router.post('/', (ctx, next) => {
    if (
        !ctx.request.body.title ||
        !ctx.request.body.price ||
        !ctx.request.body.thumbnail ||
        !ctx.request.body.stock
    ) {
        ctx.response.status = 400
        ctx.body = {
            status: 'error',
            message: 'Ingrese toda la data'
        }
    } else {
        const newProduct = products.push({
            title: ctx.request.body.title,
            price: ctx.request.body.price,
            thumbnail: ctx.request.body.thumbnail,
            stock: ctx.request.body.stock
        })
        ctx.response.status = 201
        ctx.body = {
            status: 'success',
            message: `Producto creado`
        }
    }
    
    next()
})

router.put('/:title', (ctx, next) => {
    if (
        !ctx.request.body.title ||
        !ctx.request.body.price ||
        !ctx.request.body.thumbnail ||
        !ctx.request.body.stock
    ) {
        ctx.response.status = 400
        ctx.body = {
            status: 'error',
            message: 'Ingrese toda la data'
        }
    } else {
        const title = ctx.params.title
        const index = products.findIndex(prod => prod.title === title)
        products.splice(index, 1, ctx.request.body)

        ctx.response.status = 201
        ctx.body = {
            status: 'success',
            message: 'Producto actualizado'
        }
    }

    next()
})

router.delete('/:title', (ctx, next) => {
    const title = ctx.params.title
    const index = products.findIndex(prod => prod.title === title)
    products.splice(index, 1)

    ctx.response.status = 200
    ctx.body = {
        status: 'success',
        message: 'Producto eliminado'
    }

    next()
})

module.exports = router
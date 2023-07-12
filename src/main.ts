import Koa from 'koa'
import Router from '@koa/router'
import logger from 'koa-logger'

const app = new Koa()
const router = new Router()

router
  .get('/api(.*)', (ctx, next) => {
    allowCORS(ctx)
    next()
  })
  .get('/api/searchBoard', (ctx, next) => {
    const req = ctx.request.query
    ctx.body = req

    next()
  })
  .get('/', (ctx) => {
    ctx.body = 'Hello World!123'
  })

app.use(router.routes()).use(logger()).listen(3000)

function allowCORS(ctx: Koa.Context) {
  ctx.set('Access-Control-Allow-Origin', 'bluecalendar.netlify.app')
  ctx.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
}

export {}

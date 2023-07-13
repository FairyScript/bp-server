import Koa from 'koa'
import Router from '@koa/router'
import logger from 'koa-logger'
import { config } from 'dotenv'
import { allowCORS } from './utils/allowCORS'
import { queryBoardQuests } from './api/api'

config()

const app = new Koa()
const router = new Router()

router
  .get('/api(.*)', async (ctx, next) => {
    allowCORS(ctx)
    await next()
  })
  .get('/api/searchBoard', async (ctx) => {
    const req = ctx.request.query
    const search = (req.q as string) ?? ''
    const pageIndex = (req.pageIndex as string) ?? '0'
    const pageSize = (req.pageSize as string) ?? '10'
    const res = await queryBoardQuests(search, +pageIndex, +pageSize)
    ctx.body = res
  })
  .get('/', (ctx) => {
    ctx.body = 'Hello World!123'
  })

app.use(router.routes()).use(logger()).listen(3000, 'localhost')

export default {}

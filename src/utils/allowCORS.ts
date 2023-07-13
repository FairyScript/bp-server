import Koa from 'koa'

export function allowCORS(ctx: Koa.Context) {
  ctx.set('Access-Control-Allow-Origin', 'bluecalendar.netlify.app')
  ctx.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
}

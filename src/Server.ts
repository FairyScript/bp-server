import { join } from 'path'
import { Configuration, Inject } from '@tsed/di'
import { PlatformApplication } from '@tsed/common'
import '@tsed/platform-koa' // /!\ keep this import
import '@tsed/ajv'
import '@tsed/swagger'
import { config } from './config/index'
import * as api from './controllers/api/index'
import * as pages from './controllers/pages/index'
import { envs } from './config/envs'

@Configuration({
  ...config,
  acceptMimes: ['application/json'],
  httpPort: `127.0.0.1:${envs.PORT || 8083}`,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  mount: {
    '/api': [...Object.values(api)],
    '/': [...Object.values(pages)],
  },
  swagger: [
    {
      path: '/doc',
      specVersion: '3.0.1',
    },
  ],
  middlewares: ['@koa/cors', 'koa-compress', 'koa-override', 'koa-bodyparser'],
  views: {
    root: join(process.cwd(), '../views'),
    extensions: {
      ejs: 'ejs',
    },
  },
  exclude: ['**/*.spec.ts'],
})
export class Server {
  @Inject()
  protected app: PlatformApplication

  @Configuration()
  protected settings: Configuration
}

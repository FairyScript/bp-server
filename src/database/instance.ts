import { $log } from '@tsed/common'
import { MongoClient } from 'mongodb'
import { envs } from 'src/config/envs'

const url = envs.MONGO_URL || 'mongodb://localhost:27017'
$log.info(`Connecting to ${url}`)

export const client = new MongoClient(url)

process.on('SIGINT', () => {
  client.close()
})

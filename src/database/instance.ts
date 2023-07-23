import { $log } from '@tsed/common'
import { MongoClient } from 'mongodb'

const url = process.env.MONGO_URL || 'mongodb://localhost:27017'
$log.info(`Connecting to ${url}`)

export const client = new MongoClient(url)

process.on('SIGINT', () => {
  client.close()
})

import { MongoClient } from 'mongodb'

const url = process.env.MONGO_URL || 'mongodb://localhost:27017'
console.log(url)

export const client = new MongoClient(url)

process.on('SIGINT', () => {
  client.close()
  process.exit()
})

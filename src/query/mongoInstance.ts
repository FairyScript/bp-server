import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'

export const db = new MongoClient(url)

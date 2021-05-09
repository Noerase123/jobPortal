import 'reflect-metadata'
import { createConnection } from 'typeorm'

let dbConnect = createConnection({
  type: 'mysql',
  host: process.env.DBHOST,
  port: 3306,
  username: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DATABASE,
  entities: [
    __dirname + '/entities/*.{js,ts}'
  ],
  synchronize: true,
  logging: false
})

export default dbConnect
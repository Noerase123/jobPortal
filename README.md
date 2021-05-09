## Job Portal updates

Updates - May 6, 2021
- Added bootstrap theme (Material-ui).
- Web responsive update.
- post a job is working.
- Job Description Details updated.
- search filtering job working.
- Login API is working.
- Signup API is working.
- Created a design layout.
- On-progress on Update and Delete UI frontend for Jobs.
- On-progress pagination.
- On-progress time posted accuracy.

# Instruction

## To run the frontend 

Run the index.html as the landing page of the frontend.

## To run the backend

Step 1.) Create DB in your mysql.
Step 2.) run the server.

Install npm
```bash
npm install
```

To run dev
```bash
npm run start:dev
```
To run prod
```bash
npm run build
npm run start
```

## To config MySql

Location
- Development = backend/src/pre-start/env/development.env
- Production = backend/src/pre-start/env/production.env
```
...
##DATABASE
DBHOST=localhost
DBUSER=root
DBPASS=password
DATABASE=JobPortal
...
```

## To see database connection configuration

Location : backend/src/databaseConnect.ts
```typescript
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
```
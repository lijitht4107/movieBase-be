import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import cors from 'cors'
import adminRouter from './routes/adminRouter.js'
import userRouter from './routes/userRouter.js'
import apiRouter from './routes/apiRouter.js'

const app = express()
const port = process.env.PORT
const db =process.env.MONGODB_URL
//Db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect( db );
  console.log('connected db');
}

app.use(express.json());
app.use(cors())
app.use('/admin',adminRouter)
app.use('/user',userRouter)
app.use('/api',apiRouter)
app.get('/', (req, res) => {
  res.send('Hello World!') 
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
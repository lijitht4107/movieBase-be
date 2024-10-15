import express from 'express'
import { rating } from '../controller/ratingController.js'

const apiRouter = express.Router()

apiRouter.post('/rating',rating)


export default apiRouter
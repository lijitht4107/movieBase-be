import express from 'express'
import { AddRating } from '../controller/ratingController.js'

const apiRouter = express.Router()

apiRouter.post('/ratings/:movieId',AddRating)




export default apiRouter
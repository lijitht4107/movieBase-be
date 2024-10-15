import express from 'express'
import {AddMovie, DeleteMovie, EditMovie, GetMovies, OnMovie} from '../controller/adminController.js'
import { upload } from '../uploads.js';

const adminRouter = express.Router()

adminRouter.post('/addMovie',upload.single("image"),AddMovie);
adminRouter.get('/getmovies',GetMovies);
adminRouter.get('/onmovie/:id',OnMovie)
adminRouter.patch('/editmovie/:id',EditMovie);
adminRouter.delete('/deletemovie/:id',DeleteMovie);


export default adminRouter
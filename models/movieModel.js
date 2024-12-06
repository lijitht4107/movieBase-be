import mongoose from 'mongoose'

const movieScehma = new mongoose.Schema({
    image:String,
    title:String,
    director:String,
    writer:String,
    star:String,
    // rating:Number
});
const Movie = mongoose.model("movies",movieScehma)
export default Movie;
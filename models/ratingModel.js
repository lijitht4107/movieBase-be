import mongoose from 'mongoose'

const raingSchema = new mongoose.Schema({
    movieId :String,
    rating:Number
});

const Rating = mongoose.model("ratings",raingSchema);
export default Rating
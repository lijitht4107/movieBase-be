import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  //movie name!!!!!
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  }
});
//ratings - name is named befor store
const Rating = mongoose.model('Ratings', ratingSchema);
export default Rating;

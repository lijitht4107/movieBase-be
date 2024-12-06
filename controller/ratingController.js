import Movie from '../models/movieModel.js';
import Rating from '../models/ratingModel.js';

const AddRating = async (req, res) => {
  console.log(req.body);
  
 
  
  try {
    const movieId = req.params.movieId;
    console.log(movieId);
    const { rating, userId } = req.body;

    // Validate input
    if (!movieId || !rating || !userId) {
      return res.status(400).json({ message: 'movieId, rating, and userId are required' });
    }

    // Save the rating
    const newRating = await Rating.create({ movieId, rating, userId });

    // Find all ratings for the movie to calculate the new average rating
    const allRatings = await Rating.find({ movieId });
    const totalRatings = allRatings.length;

    if (totalRatings === 0) {
      return res.status(400).json({ message: 'No ratings found for this movie' });
    }

    // Calculate the average rating
    const avgRating = allRatings.reduce((sum, review) => sum + review.rating, 0) / totalRatings;

    // Update the movie with the new average rating
    await Movie.findByIdAndUpdate(movieId, { averageRating: avgRating }, { new: true });

    res.status(200).json({ message: 'Rating submitted successfully', newRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { AddRating };

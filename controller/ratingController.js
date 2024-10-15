// import Rating from '../models/ratingModel.js'
import Post from '../models/movieModel.js'

const rating = async(req,res)=>{
    const {
      // movieId,
       rating} = req.body;
    if(!{movieId,rating}){
        return res.status(404).json({error: "movieid and rating is not get"})
    }
  try {
    const newRating = new Post({
      // movieId,
      rating});
    await newRating.save()
    res.status(201).json({message:"new rating is added"})

  } catch (error) {
    res.status(500).json({error:"internal server error"})
  }
}

export {rating}
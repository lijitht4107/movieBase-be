import Movie from '../models/movieModel.js'
import Rating from '../models/ratingModel.js';

const AddMovie = async(req,res)=>{
try {
    console.log(req.body);
    console.log(req.file.filename);
    
    var postData={
       image : req.file.filename,
        title :req.body.title,
       director : req.body.director,
       writer : req.body.writer,
       star : req.body.star 
    }
    if(!postData){
       return res.send('post data not clear')
    }
    var movie = new Movie(postData)
    await movie.save()
    movie.imageUrl =`https://localhost:3001/uploads ${movie.id}`
    await movie.save()
    res.status(201).json({message:"movie added"})

} catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"})
}
}
const GetMovies = async(req,res)=>{

    try {
        const posts = await Movie.find()
        if(!posts){
            return res.status(401).json({message:"posts not get"})
        }
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
    
}
const OnMovie =async(req,res)=>{
    try {
        const id = req.params.id;
        console.log("movie id: ",id);
        
        if(!id){
            return res.status(401).json({message:"movie id get"})

        }
        const movie = await Movie.findById(req.params.id);
       const ratings = await Rating.find({ movieId: req.params.id });
     
        if(!movie){
            return res.status(401).json({message:"movie not get"})
        }else{
            res.json({ movie, ratings });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred" });
    }
}

const EditMovie=async(req,res)=>{
    try {
        const id = req.params.id;
        if(!id){
           return  res.status(401).json({message:"file id not get"})
        }
        const post = await Movie.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}
const DeleteMovie=async(req,res)=>{
    try {
        const id = req.params.id;
        if(!id){
           return  res.status(401).json({message:"file id not get"})
        }
        const post = await Movie.findByIdAndDelete(id)
        res.status(200).json({message:"post deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

export  {AddMovie,GetMovies,OnMovie,EditMovie,DeleteMovie}
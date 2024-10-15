import Post from '../models/movieModel.js'

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
    var post = new Post(postData)
    await post.save()
    post.imageUrl =`https://localhost:3001/uploads ${post.id}`
    await post.save()
    res.status(201).json(postData)

} catch (error) {
    console.log(error);
    res.status(500).json({error:"internal server error"})
}
}
const GetMovies = async(req,res)=>{

    try {
        const posts = await Post.find()
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
        console.log("pppppppppppp",id);
        
        if(!id){
            return res.status(401).json({message:"movie id get"})

        }
        const theMovie = await Post.findById(req.params.id)
        if(!theMovie){
            return res.status(401).json({message:"movie not get"})
        }
        res.status(200).json(theMovie)
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

const EditMovie=async(req,res)=>{
    try {
        const id = req.params.id;
        if(!id){
           return  res.status(401).json({message:"file id not get"})
        }
        const post = await Post.findByIdAndUpdate(id,req.body,{new:true})
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
        const post = await Post.findByIdAndDelete(id)
        res.status(200).json({message:"post deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"internal server error"})
    }
}

export  {AddMovie,GetMovies,OnMovie,EditMovie,DeleteMovie}
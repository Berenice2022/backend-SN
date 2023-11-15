import Likes from '../models/like.models.js';
//Function to get all the post
export const getLikes = async (req, res)=>{ 
    try{
        const likes = await Likes.find();
        //const likes = await Likes.find({post:req.post.id}).populate('posts');
        res.json(likes);
     //   const likepost = await Likes.find({post:req.post.id}).populate('posts');
     //   console.log(likepost)
    }catch (error){
        console.log(error);
        res.status(500).json({message:['Errot at getting or obtaining all the likess']})
    }
};

export const createLike = async (req, res)=>{
    try{
        const {post_id} = req.body;
        console.log(post_id)
        const newLike = new Likes({
            post_id,
            user:req.user.id,
        });
        const savedLike = await newLike.save();
        res.json(savedLike);
        console.log(savedLike);
    }catch (error){
        console.log(error);
        res.status(500).json({message:['Error creating the like']})
    }
};

export const getLike= async (req, res)=>{
    try{
        const like = await Likes.findById(req.params.id);
        console.log(like);
        if(!like)
        return res.status(404).json({message:['Likes not found']});
    res.json(post);
    }catch (error){
        console.log(error);
        res.status(500).json({message:['Error getting the likes']})
    }
};

export const deleteLike = async (req, res)=>{
    try{
        const like = await Likes.findByIdAndDelete(req.params.id);
        if(!like)
        return res.status(404).json({message:['Like not found']});
    res.json(like);
    }catch (error){
        console.log(error);
        res.status(500).json({message:['Error deleting the like']})
    }
};


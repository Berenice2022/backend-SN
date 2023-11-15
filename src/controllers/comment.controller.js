import Comments from '../models/comment.model.js';
//Function to get all the comment
export const getComments = async (req, res) => {
  try {
    const comments = await Comments.find();
    //const comments = await Comments.find({user:req.user.id}).populate('user');
    res.json(comments);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: ['Errot at getting or obtaining all the comments'] });
  }
};

export const getCommentPost = async (req, res) => {
  try {
    const comments = await Comments.find({ post_id: req.params.id });
    //const comments = await Comments.find({user:req.user.id}).populate('user');
    res.json(comments);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: ['Errot at getting or obtaining all the comments'] });
  }
};
//Function to create the infoprofile
export const createComment = async (req, res) => {
  try {
    const { comment, post_id } = req.body;
    const newComment = new Comments({
      comment,
      post_id,
      user: req.user.id,
    });
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error creating the comment'] });
  }
};

//Function to get a comment
export const getComment = async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.id).populate('user');
    if (!comment)
      return res.status(404).json({ message: ['Comment did not found'] });
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error obtaining the comment'] });
  }
};

//Function to delete a comment
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comments.findByIdAndDelete(req.params.id);
    if (!comment)
      return res.status(404).json({ message: ['Comment not found'] });
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error deleting the comment'] });
  }
};

//Function to edit a comment
export const editComment = async (req, res) => {
  try {
    const comment = await Comments.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment)
      return res.status(404).json({ message: ['Comment not found'] });
    res.json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error editing the Comment'] });
  }
};

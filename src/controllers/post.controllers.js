import Posts from '../models/post.models.js';
import fs from 'fs-extra';
import path from 'path';

//Function to get all the post
export const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    // const posts = await Posts.find({user:req.user.id}).populate('user');
    res.json(posts);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: ['Errot at getting or obtaining all the posts'] });
  }
};

export const createPost = async (req, res) => {
  try {
    const { file } = req.file;
    const pathdir = '/img/uploads/' + req.file.filename;
    console.log(pathdir);
    console.log(req.body);
    const { description /*, image */ } = req.body;
    const newPost = new Posts({
      description,
      image: pathdir,
      user: req.user.id,
    });
    const savedPost = await newPost.save();
    res.json(savedPost);
    console.log(savedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error creating the post'] });
  }
};

//Function to get a post
export const getPost = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id).populate('user');
    if (!post) return res.status(404).json({ message: ['Post did not found'] });
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error obtaining the post'] });
  }
};

//Function to delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    fs.remove(path.resolve('./src/public' + post.image));
    if (!post) return res.status(404).json({ message: ['Post not found'] });
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error deleting the post'] });
  }
};

//Function to edit a post
export const editPost = async (req, res) => {
  try {
    const po = await Posts.findById(req.params.id).populate('user');
    fs.remove(path.resolve('./src/public' + po.image));
    const image = '/img/uploads/' + req.file.filename;
    const { description } = req.body;

    const post = await Posts.findByIdAndUpdate(
      req.params.id,
      { description, image },
      {
        new: true,
      }
    );
    if (!post) return res.status(404).json({ message: ['Post not found'] });
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error editing the post'] });
  }
};

import User from '../models/user.models.js';
import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//function to register Users
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    //Validate that the email does not register in the db
    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json({ message: ['The email already in use'] });

    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      type: 1,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token, {
      // res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none', //sameSite:'none',
      secure: true,
    });
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      type: userSaved.type,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }

  //console,log(newUser);
  //res.send('Registered');
};

//login function to start the section
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: ['User not found'] });
    }
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: ['Password does not match'] });
    }
    const token = await createAccessToken({ id: userFound._id }); //podemos guardar mas datos como nombre, correo, rol, si es admin, 0, 1
    res.cookie('token', token, {
      //res.status(200).cookie('token', token, {
      httpOnly: true,
      sameSite: 'none', //sameSite:'none',
      secure: true, //secure:true COMENTADO
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      type: userFound.type,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
  //res.send('Login');
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(400).json({ message: ['User not found'] });

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    type: userFound.type,
  });
  //console.log(req.user);
  //res.send("Profile");
};

export const verfifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: ['Unauthorized'] });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: ['Unauthorized'] });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: ['Unauthorized'] });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

//Function to create the user normall except cookies, no da cookis ususarios normales
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({
      username,
      email,
      password,
      //user:req.user.id
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error creating the user'] });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: ['Errot at getting or obtaining all the users'] });
  }
};

//Function to get a product
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: ['User did not found'] });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error obtaing the user'] });
  }
};

//Function to delete a product
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: ['User not found'] });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error deleting the user'] });
  }
};

//Function to edit a product
export const editUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const passwordHash = await bcryptjs.hash(password, 10);
    const userFound = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: username,
        password: passwordHash,
        //type:0
      },
      { new: true }
    );

    if (!userFound)
      return res.status(404).json({ message: ['User not found'] });
    res.json(userFound);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error editing the user'] });
  }
};

import Interests from '../models/interest.models.js';
//Function to get all the infoprofile
export const getInterests = async (req, res) => {
  try {
    const interests = await Interests.find({
      user: req.user.id,
    }).populate('user');
    res.json(interests);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: ['Errot at getting or obtaining all the Interest'] });
  }
};

//Function to create the interest
export const createInterest = async (req, res) => {
  try {
    const { interest_category, name, description, importance } = req.body;
    const newInterest = new Interests({
      interest_category,
      name,
      description,
      importance,
      user: req.user.id,
    });
    const savedInterest = await newInterest.save();
    res.json(savedInterest);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: ['Error creating the interest information'] });
  }
};

//Function to get a Interest
export const getInterest = async (req, res) => {
  try {
    const interest = await Interests.findById(req.params.id).populate('user');
    if (!interest)
      return res.status(404).json({ message: ['Interest did not found'] });
    res.json(interest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error obtaining the Interest'] });
  }
};

//Function to delete a Interest
export const deleteInterest = async (req, res) => {
  try {
    const interest = await Interests.findByIdAndDelete(req.params.id);
    if (!interest)
      return res.status(404).json({ message: ['Interest not found'] });
    res.json(interest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error deleting the Interest'] });
  }
};

//Function to edit a profile information
export const editInterest = async (req, res) => {
  try {
    const interest = await Interests.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!interest)
      return res.status(404).json({ message: ['Interest not found'] });
    res.json(interest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error editing the interest'] });
  }
};

import Events from '../models/event.models.js';
import fs from 'fs-extra';
import path from 'path';

//Function to get all the Event
export const getEvents = async (req, res) => {
  try {
    const events = await Events.find({ user: req.user.id }).populate('user');
    res.json(events);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: ['Errot at getting or obtaining all the event'] });
  }
};

//Function to create the Event
export const createEvent = async (req, res) => {
  try {
    const { file } = req.file;

    console.log(file);
    const pathdir = '/img/uploads/' + req.file.filename;
    console.log(pathdir);
    //let uploadFile = req.files.file;
    //const namef = uploadFile.name;
    //const md5 = uploadFile.md5;
    //const saveAs = `${md5}_${namef}`;
    console.log(pathdir);
    console.log(req.body);
    const { name, description, address /*photography*/ } = req.body;
    const newEvent = new Events({
      name,
      description,
      address,
      photography: pathdir, //saveAs
      user: req.user.id,
    });
    const savedEvent = await newEvent.save();
    res.json(savedEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error creating the Event'] });
  }
};

//Function to get a Event
export const getEvent = async (req, res) => {
  try {
    const event = await Events.findById(req.params.id).populate('user');
    if (!event)
      return res.status(404).json({ message: ['Event did not found'] });
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error obtaining the event'] });
  }
};

//Function to delete a Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Events.findByIdAndDelete(req.params.id);
    fs.remove(path.resolve('./src/public' + event.photography));
    if (!event) return res.status(404).json({ message: ['Event not found'] });
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error deleting the Event'] });
  }
};

//Function to edit a profile information
export const editEvent = async (req, res) => {
  try {
    const ev = await Events.findById(req.params.id).populate('user');
    fs.remove(path.resolve('./src/public' + ev.photography));
    const photography = '/img/uploads/' + req.file.filename;
    const { name, description, address } = req.body;
    const event = await Events.findByIdAndUpdate(
      req.params.id,
      { name, description, address, photography },
      {
        new: true,
      }
    );
    if (!event) return res.status(404).json({ message: ['Event not found'] });
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: ['Error editing the event'] });
  }
};

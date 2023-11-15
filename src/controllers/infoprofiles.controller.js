import InfoProfiles from '../models/infoProfiles.models.js';
//Function to get all the infoprofile
export const getinfoProfiles = async (req, res)=>{ 
    try{
        const infoProfiles = await InfoProfiles.find({user:req.user.id}).populate('user');
        res.json(infoProfiles);
    }catch (error){
        console.log(error);
        res.status(500).json({message:['Errot at getting or obtaining all the profile']})
    }
};

//Function to create the infoprofile
export const createinfoProfile = async (req, res)=>{
    try{
        const {fullname,birthdate,gender,civil_status,phone_number,job,description_personal} = req.body;
        const newInfoProfile = new InfoProfiles({
            fullname,
            birthdate,
            gender,
            civil_status,
            phone_number,    
            job,   
            description_personal,
            user:req.user.id
        });
        const savedInfoProfile = await newInfoProfile.save();
        res.json(savedInfoProfile);
    }catch (error){
        console.log(error);
        res.status(500).json({message:['Error creating the profile information']})
    }
};
    
//Function to get a infoprofile
export const getinfoProfile = async (req, res)=>{
    try{
        const infoprofile = await InfoProfiles.findById(req.params.id).populate('user');
        if(!infoprofile)
        return res.status(404).json({message:['Profile information did not found']});
    res.json(infoprofile);
    }catch (error){
        console.log(error);
        res.status(500).json({message:['Error obtaining the profile information']});
    }
};

//Function to delete a prfile information
export const deleteinfoProfile = async (req, res)=>{
    try{
        const infoProfile = await InfoProfiles.findByIdAndDelete(req.params.id);
        if(!infoProfile)
        return res.status(404).json({message:['Profile information not found']});
    res.json(infoProfile);
    }catch (error){
        console.log(error);
        res.status(500).json({message:['Error deleting the profile information']})
    }
};

//Function to edit a profile information
export const editinfoProfile = async (req, res)=>{
    try{
        const infoProfile = await InfoProfiles.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!infoProfile)
        return res.status(404).json({message:['Profile information not found']});
        res.json(infoProfile);
    }catch (error){
        console.log(error);
        res.status(500).json({message:['Error editing the profile information']})
    }
};
const { create,find,}= require('../db/modles');
const addOwner= async(req,res)=>{
    try {
        const {username,phone,information} = req.body;
        console.log(username,phone,information);
        const picture = req.imageURL;
        console.log(picture);
        await create('owner',{username,phone,information,picture})
        res.status(200).send({ success:"add Owner" });
      } catch (error) {
        res.status(400).send(`Error : ${error}`);
        return;
      }
}

const addRoom= async(req,res)=>{
    try{
        const img = req.imageURL;
        console.log("img"+ img[1])
        const {owner_id,description,square,bathroom,bed,price,Seating_area,internet,available,review,title} = req.body;
        console.log("title"+title);
        await create('room',{owner_id,title,description,square,bathroom,bed,price,Seating_area,internet,available,review,
                img1:img[0],img2:img[1],img3:img[2],img4:img[3],img5:img[4]})
        res.status(200).json("addRoom");
    }catch(err){
        res.status(400).json({err})
    }
}

const getOwner = async(req,res)=>{
    try{
        const owners = await find('owner');
        res.status(200).json(owners);
    }catch(err){
        console.log(err);
        res.status(400).json({err})
    }
}

const findOwner = async(req,res)=>{
    try{
        const {id}=req.body;
        const owners = await find('owner',{id});
        res.status(200).json(owners);
    }catch(err){
        console.log(err);
        res.status(400).json({err})
    }
}

const findRoom = async(req,res)=>{
    try{
        const {id}=req.body;
        const rooms = await find('room',{id});
        res.status(200).json(rooms);
    }catch(err){
        console.log(err);
        res.status(400).json({err})
    }
}

const getRoom = async(req,res)=>{
    try{
        const rooms = await find('room');
        res.status(200).json(rooms);
    }catch(err){
        console.log(err);
        res.status(400).json({err})
    }
}

module.exports = {addOwner,addRoom,getOwner,getRoom,findOwner,findRoom}
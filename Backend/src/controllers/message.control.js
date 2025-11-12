import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
export const getuserForSidar = async(req,res) =>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for Sidar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
} 

export const getMessage = async(req,res) =>{
    try {
        const { id: userTochat } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userTochat},
                {senderId:userTochat,receiverId:myId}
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async(req,res) =>{
    try {
        const { text,image } = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url; 
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save();

        // socket.io is here

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
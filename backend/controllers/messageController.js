const conversationModel = require('../models/conversationModel')
const Message = require('../models/messageModel')

const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;

        const receiverId = req.params.id;
        const { message } = req.body;
        let gotConversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        })
        if (!gotConversation) {
            gotConversation = await conversationModel.create({
                participants: [senderId, receiverId],
            })
        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })
        if (newMessage) {
            gotConversation.message.push(newMessage._id)
        }
        await gotConversation.save()

        return res.status(200).json({
            message: 'Message send successfully'
        })
    }
    //  Soket Io
    catch (error) {
        console.log(error)
    }
}
//  get message  
const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id
        const conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('message');
        console.log(conversation)
        return res.status(200).json(conversation?.message)
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = { sendMessage, getMessage }
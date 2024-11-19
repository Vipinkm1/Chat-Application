
const bcrypt = require('bcryptjs')
const User = require('../models/userModels')
const jwt = require('jsonwebtoken')



const register = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: 'Yarr pura fields dalna hai ek bhi nahi chorna hai' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Sit yar password match nahi ho raha hai acche se dall na' })
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'Yarr duplicate username se nahi kar sakte hai' })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender === 'male' ? maleProfilePhoto : femaleProfilePhoto,
            gender
        })

        res.status(201).json({ message: 'finally apne accound bna liya haa good' });
    }
    catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: 'Yarr pura fields dalna hai ek bhi nahi chorna hai' })
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({ message: 'Yarr incorrect username & password' })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Yarr incorrect username & password' })
        }
        const tokenData = {
            userId: user._id,
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).cookie('token', token, { maxAge: 1 * 24 * 40 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto
        })
    }
    catch (error) {
        console.log(error)
    }
};
//  logout logic here 
const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', "", { maxAge: 0 }).json({
            message: "App logout successfully ho cheke hai"
        })
    }
    catch (error) {
        console.log(error)
    }
};


const getOtherUser = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const othersUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(' fullname username password profilePhoto gender createdAt updatedAt')
        return res.status(200).json(othersUsers)
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = { register, login, logout, getOtherUser }

import User from "../models/user.model.js"

export const addUsers = async (req, res, next) => {
    try {
        await User.create({
            name: 'Nihar'
        }).then(res => { "then chali" }).catch(err => { "Err" })
        res.status(201).json({ msg: "New Applicartion changes  Nitin" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error" })
    }


}
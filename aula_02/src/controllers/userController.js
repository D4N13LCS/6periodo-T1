const User = require("../models/userModel");

async function listUsers(req, res) {
    const users = await User.find();
    res.json(users);
}

async function getUser(req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ erro: "User not found" });
    }
    res.json(user);
}

async function createUser(req, res){
    const exist = await User.exists(req.body);
    if(!exist){
        const user = await User.insertOne(req.body);
        return res.status(201).send(user)    
    }
    return res.status(500).send({'msg': 'User already registered'})
    
}

async function updateUser(req, res){
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ erro: "User not found" });
    }
    const updatedUser = await user.updateOne({'nome': req.body.nome});
    return res.status(200).send(updatedUser);
}

async function deleteUser(req, res){
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ erro: "User not found" });
    }

    await user.deleteOne()

    return res.status(304).send()
}

//CreateUser
// POST CreateUser
// PUT updateUser
// DELETE deleteUser

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
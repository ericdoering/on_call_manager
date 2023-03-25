var Userdb = require("../model/model");


//Create and save new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty."});
        return;
    }
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })
    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "An error occured while trying to create user."
            })
        })
};

//Retrieve and return all users & Retrieve a single user
exports.find = (req, res) => {

    if(req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : "Could not find user with id" + id })
            }
            else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message : "Error retrieving user with id" + id })
        })
    }
    
    else {
        Userdb.find().then(user => {
            res.send(user)
        }).catch(err => {
            res.status(500).send({ message : err.message || "Error occured while trying to retrieve user information."})
        })
    }
};

//Update a new user identified by their ID
exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({ message : "Data to update can not be empty." })
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify : false}).then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot update user with ${id}. User may not exist.`})
        }
        else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({ message : "Error, please update user information." })
    })

};

//Delete a user with a specified user ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id).then(data => {
        if(!data) {
            res.status(404).send({ message : `Error occured during attempt to delete user ${id}.`})
        }
        else {
            res.send({ message : "Successfully deleted user."})
        }
    }).catch(err => {
        res.status(500).send({ message : "Could not delete user with an id of" + id })
    })
};
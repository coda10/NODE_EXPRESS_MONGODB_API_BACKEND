// importing packages
const express = require('express');

const router = express.Router();

const Posts = require('../models/Post');
//const mongoose = require('mongoose');


// reacting routes

// Gets posts
router.get('/', async(req, res) => {
    //res.send('i am using /posts router.');
    //await Posts.find().limit(3).then(data => res.json(data)).catch(err => res.json({ error: err }));
    await Posts.find().limit(3).then(data => res.json(data)).catch(err => res.json({ error: err }));
});

// creates posts
router.post('/', async(req, res) => {
    const posts = new Posts({
        title: req.body.title,
        description: req.body.description
    });
    // console.log(req.body);
    // res.send(`Data [${req.body}] was received`)
    await posts.save().then(data => {
        res.json({
            data,
            message: "Post create successfully"
        })
    }).catch(err => {
        res.json({ error: "Post did not create successfully" });
    });
    console.log(req.body);
});

// returns specific post
router.get('/:PostId', async(req, res) => {
    //console.log(req.params.PostId);
    await Posts.findById(req.params.PostId).then(data => res.json(data)).catch(err => res.json({ error: "This post does not exist" }))
});

// delete a specific user
router.delete('/:postID', async(req, res) => {
    await Posts.deleteOne({ _id: req.params.postID }).then(data => res.json({ message: "Successfully deleted POST" })).catch(err => res.json({ error: "Could not delete POST" }));
    //collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
});

// Updating a post
router.patch('/:podstId', async(req, res) => {
    //collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead
    await Posts.updateOne({ _id: req.params.podstId }, {
        $set: {
            title: req.body.title,
            cart: 18
        }
    }).then(data => res.json({ message: "Successfully Updated" })).catch(err => res.json({ error: "Update Unsuccessfull" }));
});


module.exports = router;
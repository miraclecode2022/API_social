const formidable = require('formidable')
const fs = require('fs')
const lodash = require('lodash')

// load Models
const Post = require('../models/posts')


// Get All Posts
exports.getPost = async(req,res,next) => {
    const posts = await Post.find().populate("postedBy", "_id, name")
    try {
        if(!posts){
            return res.status(400).send("Posts is empty!!")
        }
        res.send(posts)
    }catch(err){
        res.status(400).send(err.message)
    }
}


// Get Post By Id User
exports.getCurrentPost = async(req,res,next) => {
    try {
        const posts = await Post.find({"postedBy" : req.user._id})
        .populate("postedBy","name")
        .sort("_createdAt")
        if(!posts){
            throw new Error("This User have no post")
        }
        res.send(posts)
    }catch(err) {
        res.status(400).send(err.message)
    }
    
}

// Create new Post
exports.createPost = async(req,res, next) => {
    try {
        const form = formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, async(err, feilds, files) => {
            if (err) {
                res.status(400).send({error : "Can't upload image"})
            }
            let post = await new Post(feilds)
            post.postedBy = req.user
            if(files.postImage){
                post.postImage.data = fs.readFileSync(files.postImage.path)
                post.postImage.contenType = files.postImage.type
            }
            const newPost = await post.save()
            res.send(newPost)
        })
    }catch(err) {
        res.status(400).send(err.message)
    }

    // try {
    //     const newPost = await new Post(req.body)
    //     await newPost.save()
    //     res.status(201).send(newPost)
    // }catch(err) {
    //     res.status(400).send(err.message)
    // }
}

// Update Post 
exports.updatePost = async(req,res,next) => {
    try {
        let post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).send({error : "Can't find this post"})
        }
        if(post.postedBy.toString() != req.user._id.toString()){
            return res.status(401).send({error : "You can't update post not your own"})
        } else {
            post = await lodash.extend(post, req.body)
            await post.save()
            res.send(post)
        }
    }catch(err) {
        res.status(400).send(err.message)
    }
}

// Delete Post
exports.deletePost = async(req,res,next) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post){
            return res.status(400).send({error: "Can't find this post"})
        }
        if(post.postedBy.toString() != req.user._id.toString()){
            return res.status(401).send({error : "You can't delete post not your own"})
        } else
        await post.remove()
        res.send({msg : "delete success",post})
    }catch(err) {
        res.status(400).send(err.message)
    }
}


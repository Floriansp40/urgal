const Sauce = require("../models/Sauce")

exports.likesAndDislikes = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then((like) => {
            if (!like.usersLiked.includes(req.body.userId) && req.body.like === 1){
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }})
                    .then(() => res.status(201).json({ message: "Sauce like +1" }))
                    .catch((error) => res.status(500).json({ error }))
            } else if (like.usersLiked.includes(req.body.userId) && req.body.like === 0){
                Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }})
                    .then(() => res.status(201).json({ message: "Sauce like 0" }))
                    .catch((error) => res.status(500).json({ error }))
            } else if (!like.usersDisliked.includes(req.body.userId) && req.body.like === -1){
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }})
                    .then(() => res.status(201).json({ message: "Sauce dislike +1" }))
                    .catch((error) => res.status(500).json({ error }))
            } else if (like.usersDisliked.includes(req.body.userId) && req.body.like === 0){
                Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }})
                    .then(() => res.status(201).json({ message: "Sauce dislike 0" }))
                    .catch((error) => res.status(500).json({ error }))
            }
        })
        .catch((error) => res.status(500).json({ error }))
}
const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now

    },
    description: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        default: []
    },
    postImage: {
        type: String,

    },
    userProfile: {
        type: String,
        required: true
    },
    // folderId: {
    //     type: String,
    //     required: true
    // }

})

const postmodel = mongoose.model('Post', PostSchema)

module.exports = postmodel
// "-Mw76Y8fq0MqR30cee02": {
//         "createdBy": "Aliyan Ansari",
//         "createdOn": "Thu Feb 17 2022",
//         "description": "Hello There!!! From Aliyan",
//         "likes": [
//           "",
//           "1veRUdwJbRSkU8PGHfDKf63adNF2",
//           "FLCi57a6zMYNOuO4h3ICYMu2MSF3"
//         ],
//         "postImage": "https://firebasestorage.googleapis.com/v0/b/bitrupt-ff26d.appspot.com/o/posts%2F1645108667844.jpg?alt=media&token=1bf09ac4-45fe-4e08-9884-80ef38c3cc6d",
//         "userProfile": "https://firebasestorage.googleapis.com/v0/b/bitrupt-ff26d.appspot.com/o/profile%2F0faWwnh8yJX9SUt6A9MrFonuypy1.jpg?alt=media&token=6f0b0574-5acb-4008-a155-a61df2b57a76"
//       },
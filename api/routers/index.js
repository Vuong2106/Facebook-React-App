import express from 'express';
import authRouter from './auth.js';
import commentsRouter from './comments.js';
import likesRouter from './likes.js';
import posts from './posts.js';
import users from './users.js';
import multer from "multer";
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '../client/public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

function route(app) {
    app.post('/api/uploads', upload.single("file"), (req, res) => {
        const file = req.file;
        res.status(200).json(file.filename);
    })
    app.use('/api/auth/', authRouter)
    app.use('/api/comments/', commentsRouter)
    app.use('/api/likes/', likesRouter)
    app.use('/api/posts/', posts)
    app.use('/api/users/', users)
}

export default route
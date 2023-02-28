import express from 'express';
import { db } from '../../connect.js'
import jwt from 'jsonwebtoken';
import moment from 'moment/moment.js';

export const getPosts = (req, res) => {

    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, 'secretkey', (error, userInfo) => {
        if (error) return res.status(403).json('token not valid');
        const q = `SELECT p.*,u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.user_id)
                    LEFT JOIN relationships AS r ON (p.user_id = r.followed_user_id) WHERE r.follower_user_id = ? OR p.user_id = ?
                    ORDER BY p.created_at DESC`
        db.query(q, [userInfo.id, userInfo.id], (err, results) => {
            if (err) return res.status(500).json({ message: "Nothing" })
            return res.status(200).json(results)
        })
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, 'secretkey', (error, userInfo) => {
        if (error) return res.status(403).json('token not valid');
        const q = 'INSERT INTO posts (`description`, `img`, `created_at`, `user_id`) VALUES (?)'
        const value = [
            req.body.description,
            req.body.img || null,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id
        ]
        console.log(value);
        db.query(q, [value], (err, results) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Post has been created")
        })
    })
}
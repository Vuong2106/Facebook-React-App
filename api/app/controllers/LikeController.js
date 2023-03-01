import express from 'express';
import { db } from '../../connect.js';
import jwt from 'jsonwebtoken';


export const getLikes = (req, res) => {
    const q = `SELECT user_id FROM likes WHERE post_id = ?`
    db.query(q, [req.query.post_id], (err, results) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(results.map(like => like.user_id))
    })
}

export const addLikes = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, 'secretkey', (error, userInfo) => {
        if (error) return res.status(403).json('token not valid');
        const q = 'INSERT INTO likes (`user_id`, `post_id`) VALUES (?)'
        const value = [
            userInfo.id,
            req.body.post_id
        ]
        console.log(value);
        db.query(q, [value], (err, results) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Post has been liked")
        })
    })
}

export const deleteLikes = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, 'secretkey', (error, userInfo) => {
        if (error) return res.status(403).json('token not valid');
        const q = 'DELETE FROM likes WHERE `user_id` = ? AND `post_id` = ?'

        db.query(q, [userInfo.id,
            req.query.post_id
        ], (err, results) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("dislike")
        })
    })
}
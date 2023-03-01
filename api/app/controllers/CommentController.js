import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../../connect.js';
import moment from 'moment';

export const getComments = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json('Not logged in');
    jwt.verify(token, 'secretkey', (error, userInfo) => {
        if (error) return res.status(403).json('token not valid');
        const q = `SELECT c.*,u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.user_id)
                    JOIN posts as p ON (p.id = c.post_id) WHERE c.post_id = ? ORDER BY c.created_at DESC`
        db.query(q, [req.query.post_id], (err, results) => {
            if (err) return res.status(500).json({ message: "Nothing" })
            return res.status(200).json(results)
        })
    })

}

export const createComment = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not logged in");
    jwt.verify(token, 'secretkey', (error, userInfo) => {
        if (error) return res.status(403).json('token not valid');
        const q = 'INSERT INTO comments (`description`, `created_at`, `user_id`, `post_id`) VALUES (?)'
        const value = [
            req.body.comment,
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            userInfo.id,
            req.body.postId
        ]
        console.log(value);
        db.query(q, [value], (err, results) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json("Comments has been created")
        })
    })
}
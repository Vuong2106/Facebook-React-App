import express from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../../connect.js';

export const profile = (req, res) => {
    const userId = req.params.user_id;
    const q = "SELECT * FROM users where id = ?"

    db.query(q, [userId], (err, result) => {
        if (err) return res.status(500).json(err)
        const { password, ...info } = result[0]
        return res.json(info);
    })
}
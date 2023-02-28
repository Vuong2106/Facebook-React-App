import { db } from '../../connect.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?"
    console.log(req.body.username);
    db.query(q, [req.body.username], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length) {
            return res.status(409).json('User already exists')
        };

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(req.body.password, salt);

        // next();
        const q = "INSERT INTO users (username, email, password, name) VALUES (?)"

        const value = [
            req.body.username,
            req.body.email,
            hashPassword,
            req.body.name
        ]


        db.query(q, [value], (err, result) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json('User has been created');
        });
    })

}

export const login = (req, res) => {

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        // console.log(req.body.password);
        if (err) return res.status(500).json(err);
        if (data.lenght === 0) return res.status(404).json('User not found');
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
        if (!checkPassword) return res.status(400).json('Wrong');
        const token = jwt.sign({ id: data[0].id }, 'secretkey');

        const { password, ...other } = data[0];
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(other);
    })
}


export const logout = (req, res) => {
    res.clearCookie("access_token", {
        secure: true,
        sameSite: "none",
    }).status(200).json("User logged out");
}

export const getUser = (req, res) => {
    res.send('hello')
}
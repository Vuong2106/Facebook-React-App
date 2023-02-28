import express from "express";
import route from "./routers/index.js";
import bodyParser from "body-parser";
const app = express();
import * as dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config()





app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://127.0.0.1:3000",
}))
app.use(cookieParser());

route(app);
const port = process.env.APP_PORT || 8800;
app.listen(port, () => {
    console.log(`Api working at port ${port}`);
});
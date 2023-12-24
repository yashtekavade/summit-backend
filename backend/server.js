import express from 'express';
import summitRoutes from "./api/summit.routes.js";
import cors from "cors";
import multer from 'multer';
import bodyParser from 'body-parser';

const upload = multer();
const app = express();

const corsOrigin ={
    origin:true,          
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));

app.use(upload.none())
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))

app.use("/summit", summitRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
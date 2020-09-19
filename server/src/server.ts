import express, {Request, Response} from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import {ChangeEvent} from "mongodb";
import Messages, {MessagesSchema} from "./model/messages";
import pusher from "./pusher";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

dotenv.config( { debug: true } );
const port = process.env.PORT || 5000;
const dbuser = process.env.DB_USER;
const dbpass = process.env.DB_PASS;
const dbname = process.env.DB_NAME;

const connURL = `mongodb+srv://${dbuser}:${dbpass}@cluster0.tomdh.mongodb.net/${dbname}?retryWrites=true&w=majority`;

console.log(`connURL = ${connURL}`)

mongoose.connect(connURL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const showCountDocs = async (msgCollection: mongoose.Collection) => {
    const cnt = await msgCollection.countDocuments();
    console.log(`collection has ${cnt}`)    
};

const db = mongoose.connection;
db.once("open", () => {
    const msgCollection = db.collection("messagecontents");
    showCountDocs(msgCollection);
    const changeStream = msgCollection.watch<MessagesSchema>();
    //: 
    changeStream.on("change", (change: ChangeEvent<MessagesSchema>) => {
        console.log(`message collection changed = `)
        if(change.operationType==='insert') {
            console.log('pushing')            
            pusher.trigger("messages",'inserted', change.fullDocument?._id);
        }
    })
});

app.get("/", async (req: Request, res: Response) => {
    try {
        const doc = {
            message: "test message",
            name: "test user",
            timestamp: new Date().toDateString(),
            received: false
        };
        const data = await Messages.create(doc);
        console.log('new message created');
        console.dir(data);
        res.status(201).send(`new message created \n ${data}`);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
    //res.status(200).send("Hello")
});

app.post("/api/v1/messages", async (req: Request, res: Response) => {
    const msg = req.body;
    try {
        const data = await Messages.create(msg);
        console.log('new message created');
        console.dir(data);
        pusher.trigger('messages', 'inserted', data);
        res.status(201).send(`new message created \n ${data}`);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});


app.get("/api/v1/messages", async (req: Request, res: Response) => {
    try {
        const data = await Messages.find();
        console.log('messages list = ');
        console.dir(data);
        res.status(201).send(data);
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
});


app.listen(port, () => {
    console.log(`Listening to ${port}`)
});


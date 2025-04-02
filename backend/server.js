const express = require("express");
const env = require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
const port = 3500;
app.use(bodyparser.json());
app.use(cors());
const client = new MongoClient(process.env.MONGO_URL);
const dbName = "passOp";
let collection;

// Connect to the database and set up the collection
async function connectToDb() {
    try {
        await client.connect();
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        collection = db.collection("documents");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
    }
}

connectToDb(); 

app.get("/", async (req, res) => {

    const findResult = await collection.find({}).toArray();
    res.json(findResult);

});

app.post("/", async (req, res) => {
    const password = req.body ;
    const insertResult = await collection.insertOne(password);
    res.send({success: true , result : insertResult});
});

app.delete("/", async (req, res) => {
    const password = req.body ;
    const insertResult = await collection.deleteOne(password);
    res.send({success: true , result : insertResult});
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

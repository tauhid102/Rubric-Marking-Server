const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jfvuq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("fydp-management");
    const marksCollection = database.collection("mark");
    const criteriaCollection = database.collection("criteria");
    const rubricCollection = database.collection("rubric");
    const studentsCollection = database.collection("students");
    const studentsMarksCollection = database.collection("studentsMarks");

      //api post mark
      app.post('/mark',async(req,res)=>{
        const doc=req.body;
        console.log(doc);
        const options ={ordered:true};
        const result=await marksCollection.insertOne(doc, options);
        res.send(result);
      });
      //api post criteria
      app.post('/criteria',async(req,res)=>{
        const doc=req.body;
        const options ={ordered:true};
        const result=await criteriaCollection.insertOne(doc, options);
        res.send(result);
      });
      //api post rubric
      app.post('/rubric',async(req,res)=>{
        const doc=req.body;
        const options ={ordered:true};
        const result=await rubricCollection.insertOne(doc, options);
        res.send(result);
      });
      //get data mark
      app.get('/mark',async(req,res)=>{
        const marks=marksCollection.find({});
        const mark=await marks.toArray();
        res.send(mark);
      });
      //get data citeria
      app.get('/cieria',async(req,res)=>{
        const marks=criteriaCollection.find({});
        const mark=await marks.toArray();
        res.send(mark);
      });
      //get data rubric
      app.get('/rubric',async(req,res)=>{
        const marks=rubricCollection.find({});
        const mark=await marks.toArray();
        res.send(mark);
      });
      //get data student
      app.get('/students',async(req,res)=>{
        const marks=studentsCollection.find({});
        const mark=await marks.toArray();
        res.send(mark);
      });
      //delete mark
    app.delete("/marks/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await marksCollection.deleteOne(query);
      res.json(result);
    });
      //delete criteia
    app.delete("/criteria/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await criteriaCollection.deleteOne(query);
      res.json(result);
    });
      //delete rubric
    app.delete("/rubric/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await rubricCollection.deleteOne(query);
      res.json(result);
    });
    //api post students marks
    app.post('/studentMarks',async(req,res)=>{
      const doc=req.body;
      const options ={ordered:true};
      const result=await studentsMarksCollection.insertOne(doc, options);
      res.json(result);
    });
    //api delete students marks
    app.delete('/studentMarks/:id',async(req,res)=>{
      const doc=req.body;
      const options ={ordered:true};
      const result=await studentsMarksCollection.deleteOne(doc, options);
      res.json(result);
    });
    app.get('/studentsMarks',async(req,res)=>{
      const studentsMarks=studentsMarksCollection.find({});
      const result=await studentsMarks.toArray();
      res.json(result);
    })
    //update marks
    app.put("/marks/:id", async (req, res) => {
      const id = req.params.id;
      const updateMarks = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          id: updateMarks.id,
          title: updateMarks.name,
          A: updateMarks.roll,
          B: updateMarks.age,
        },
      };
      const result = await studentsCollection.updateMany(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });
  } finally {
    //a
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server Start");
});
app.listen(port, () => {
  console.log("Listening to port", port);
});

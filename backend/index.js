const express=require('express');
const app=express();
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const cors=require('cors');
const User=require('./mongoosemodel/user');
const{createToken,verifyToken}=require('./authentication/auth');
const { MongoClient, ServerApiVersion } = require('mongodb');
const authrouter=require('./routes/auth-route');
const uri = "mongodb+srv://chirag:chirag@nodeexpressprojects.qyynx.mongodb.net/?retryWrites=true&w=majority";
const dbName = "tradify";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });
// const db = client.db(dbName);
async function run() {
    await mongoose.connect(uri);
}
run().then(e=>console.log("connected to db")).catch(console.dir);



app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/',authrouter);
app.get('/',(req,res)=>{
    console.log("hello I am get");
})
app.listen(3001,()=>{
    console.log("app is listening on port 3001");
})

// module.exports=db;
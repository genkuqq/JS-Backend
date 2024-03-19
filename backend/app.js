const express = require("express")
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express()
require("dotenv").config()

const connectDB = require('./src/db/dbConnection');
connectDB();
const port = process.env.PORT || 5001

// Router Imports
const loginRouter = require("./src/routes/loginRouter")
const productRouter = require("./src/routes/productRouter")
const storageRouter = require("./src/routes/storageRouter")

app.use(bodyParser.json());
app.use(cors())

app.get("/", (req,res) => {
    res.json({
        "message":"anasayfa"
    })
})

app.use("/login",loginRouter)
app.use("/products",productRouter)
app.use("/storage",storageRouter)

app.use((req,res) => {
    res.set('Content-Type', 'text/html');
    res.status(404);
    res.send(Buffer.from('<h3>404</h3>'));
})

app.listen(port,() => {
    console.log(`Server http://localhost:${port} portundan calisiyor.`);
})
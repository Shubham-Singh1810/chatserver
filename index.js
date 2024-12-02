require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./src/route");
const {createServer} = require('http');
const {Server} = require("socket.io")

const app = express();
app.use('/uploads', express.static('uploads'))
const PORT = process.env.PORT || 8000;
const server = createServer(app)

const io = new Server(server, {
  cors:{
    origin:"http://localhost:3001",
    methods:["GET", "POST"],
    credentials: true
  }
}) 


app.use(cors({
  origin:"http://localhost:3001",
  methods:["GET", "POST"],
  credentials: true
}));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connecting with database
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_STRING
).then(()=>{
    console.warn("db connection done again")
})



app.get("/", (req, res) => res.send(`Server listing on port ${PORT}`));
app.use("/api", routes);
app.all("*", (req, res) => res.status(404).json({ error: "404 Not Found" }));  


io.on("connection", (socket) => {
  console.log("User connected");
  console.log("Socket ID:", socket.id); // Correct way to access socket ID
});

const backend_server = server.listen(PORT, () =>
  console.log(`Server running  on ${process.env.BACKEND_URL}`)
);
const mongoose = require("mongoose");

// Define the mongoDB connection URL
// mongodb://127.0.0.1:27017/myDatabase).
const mongoURL = "mongodb://127.0.0.1:27017/hotels";

const db = mongoose.connect(mongoURL)
  .then(() => 
    console.log("✅ MongoDB Connected")
  ).catch((err) => 
    console.error("❌ MongoDB Error:", err)
);




// event handle karna ho tab

//Setup MongoDB Connection
// mongoose.connect(mongoURL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection
// Events handle karna
// const db = mongoose.connection;

// db.on("connected", () => {
//   console.log("🔗 Mongoose connected to DB");
// });

// db.on("error", (err) => {
//   console.error("⚠️ Mongoose connection error:", err);
// });

// db.on("disconnected", () => {
//   console.log("❌ Mongoose disconnected from DB");
// });

module.export = db; 

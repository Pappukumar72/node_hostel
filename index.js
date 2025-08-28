const express = require('express')

const app = express()
const db = require("./db")

app.use(express.json());     // JSON data parse karne ke liye
app.use(express.urlencoded({ extended: true }));   // Form data parse karne ke liye


const Person = require("./models/personSchema.js")
const MenuItem = require("./models/menuItem.js")


app.get('/', function(req, res) {
    res.send("Welcome to hotel")
})


// Import the Person Router files
const personRouter = require("./routes/personRoute.js")
app.use('/person',personRouter)


// Import the Menu Router file
const menuRouter = require("./routes/manuRoute.js")
app.use('/menu', menuRouter)








// app.post("/menu", async(req,res) =>{
//     try {
//         const data = req.body
//         const newMenu = new MenuItem(data)
//         const response = await newMenu.save();
//         console.log("Manu data save");
//         res.status(200).json(response);
//     } catch (error) {
//         console.log("Error in menu", error)
//         res.status(500).json({error: "Internal Server Error In Menu"}) 
//     }
// })
// app.get("/menu",async(req, res) => {
//     try {
//         const data = await MenuItem.find();
//         console.log("Menu Data fatch Successfully")
//         res.status(200).json(data)
//     } catch (error) {
//         console.log("Menu data fecth error", error)
//         res.status(500).json({error: "Internael error not fatch data from database"})
        
//     }
// })






app.listen(3000, () => {
    console.log("Server Run on the Port No 3000")
})

// {
//     "name" : "ram kumar",
//     "age" : 25,
//     "work" : "chef",
//     "mobile" : "123-456-789",
//     "email" : "ram@gmail.com",
//     "address" :"123main fh city",
//     "salary" : 60000
// }

// {
//     "name": "rasgula",
//     "price" : 550,
//     "taste" : "sweet",
//     "is_drink" : "true",
//     "ingredients": "rasgulla",
//     "num_sales" : "20"
// }
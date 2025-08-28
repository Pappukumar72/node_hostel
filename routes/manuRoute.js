const express = require('express')

const router = express.Router()

const Menu = require("../models/menuItem.js")

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newMenu = new Menu(data)
        const response = await newMenu.save();
        console.log("Menu Data Save Successfully");
        res.status(200).json(response)
    } catch (error) {
        console.log("Menu data could not be saved",error)
        res.status(500).json({"Menu data not saved":error})  
    }
})
router.put("/:id",async (req, res) => {
    try {
        const updateId = req.params.id;
        const updatedMenu = req.body;
        const response = await newMenu.findByIdAndUpdate(updateId,updatedMenu, {
            new: true,
            runValidater: true
        })

        if(!response) {
            return res.status(404).json({error: "Person not found"})
        }
    
        console.log("Menu Data Updated");
        res.status(200).json(response)
    } catch (error) {
        console.log("Menu Data Not Update",error)
        res.status(500).json({"Menu Data could not be Updated": error})
    }
})

router.delete('/:id',async (req, res) => {
    try {
        const deleteId = req.params.id;
        const response = await newMenu.findByIdAndDelete(deleteId)
        console.log("Menu data delet Successfully")
        res.status(200).json(response)
    } catch (error) {
        console.log("Menu Data Coulde not be delete")
        res.status(500).json({"Menu Data Not Delete": error})
    }
})

router.get('/', async(req, res) => {
    try {
        const data = await Menu.find()
        console.log("Menu Data successfully found")
        res.status(200).json(data)
    } catch (error) {
        console.log("menu Data could not be found",error)
        res.status(500).json({"Menu data could not be found": error})
    }
})

// comment added for testing purposes
module.exports = router;



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


const express = require("express")

const router = express.Router();

const Person = require("../models/personSchema.js")



//Post route to add a Person
router.post('/', async(req,res) => {
    try {
        const data = req.body  // Assuming the request body contains the person data
    
        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);
    
        // Save the new Person to the database
        const response = await newPerson.save();
        console.log("Person Data Saved Successfully");
        res.status(200).json(response)
    } catch (error) {
        console.log("Person data Error",error)
        res.status(200).json({error: "Person data save Internal Error"})
    }
})



router.get('/', async(req,res) =>{
   try {
        const data = await Person.find();
        console.log("Person Data fatched Succesfully");
        res.status(200).json(data)
   } catch (error) {
        console.log("Person Data not Fatched", error)
        res.status(500).json({error: "Person data Fetched Error"})
   }
})


// Updata Person details through the id
router.put('/:id',async (req, res) =>{
    try {
        const personId = req.params.id;   // Extract the id from the URl parametr
        const updatedPersonData = req.body;  // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new : true,   // Return the updted document
            runValidators : true   // Run Mongoose Validation
        })

        if(!response) {
            return res.status(404).json({error: "Person not found"})
        }

        console.log("Person data Updated")
        res.status(200).json(response)
        
    } catch (error) {
        console.log("Data could not be Updated")
        res.status(500).json({"Parson data could not be Updated":error})
    }
})



router.delete('/:id', async(req,res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId)
         
        // if(!response){
        //     return res.status(404).json({error: "Person not found"})
        // }

        console.log('Person data Delete Successfully')
        res.status(200).json(response)
    } catch (error) {
        console.log("person data could not be deleted",error)
        res.status(500).json({"person data could not be deleted": error})
    }
})



router.get("/:workType", async(req,res) =>{
    const workType = req.params.workType;
    try {
        if(workType == "chef" || workType == "manager" || workType == "waiter"){
           const response = await Person.find({work: workType})
           console.log("Work data Fatched") 
           res.status(200).json(response)
        }else{
            res.status(404).json("Work data Not Matched")
        }
    } catch (error) {
        console.log("Work data Not Fatched",error)
        res.status(500).json({error: "Work Not Found"})
    }
})

module.exports = router;



// app.post('/person', async (req, res) => {

//     try {
//         const data = req.body  // Assuming the request body contains the person data
    
//         // Create a new Person document using the Mongoose Model
//         const newPerson = new Person();
//         newPerson.name = data.name;
//         newPerson.age = Date.age;
//         newPerson.mobile = data.mobile;
//         newPerson.address = data.address;
//         newPerson.salary = data.salary;
//         newPerson.email = data.email;
//         newPerson.work = data.work;
    
//         // Another method you can use and assign data into the newPerson
//         // const newPerson = new Person(data)
    
//         // Save the new person to the database
//         const response = await newPerson.save();
//         console.log('Data Saved Successfully')
//         res.status(200).json(response)

//     } catch (error) {
//         console.log("Error found while data saving", error)
//         req.status(500).json({error: "internael server Error"})  
//     }
// })

// // Get method to get the person
// app.get('/person',async(req,res) =>{
//     try {
//         const data = await Person.find();
//         console.log('Data Fetch Successfully')
//         res.status(200).json(data)
//     } catch (error) {
//         console.log("Data not featch", error)
//         res.status(500).json({error: "Internael error not fatch data from database"})
//     }
// })

// // 
// app.get("/person/:workType" ,async (req, res) => {
//     const workType = req.params.workType; // Extract the work from the URL parameter
//    try {
//         if(workType == 'chef' || workType == "manager" || workType == "waiter"){
//             const response = await Person.find({work: workType})
//             console.log("Work data fatched")
//             res.status(200).json(response);
//         }else {
//             res.status(404).json({error: "Invalid work type"});
//         }
//    } catch (error) {
//         console.log(err)
//         res.status(500).json({error: "Internal Server Error"})
//    }

// })
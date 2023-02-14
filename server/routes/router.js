const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");


// router.get("/",(req,res)=>{
//     console.log("Conectado")
// });



// REGISTRO DE USUARIOS 


router.post("/register",async(req,res) =>{
    //console.log(req.body);
    const {name,email,age,mobile,work,add,desc}= req.body

    if (!name || !email || !age || !mobile || !work || !add || !desc){
        res.status(422).json("Porfavor revise los datos");

    }
    try {

        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if (preuser){
            res.status(422).json("Este usuario ya está siendo utilizado");
            
        }else{
            const adduser = new users ({
                name,email,age,mobile,work,add,desc
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    }catch (error) {
        res.status(422).json(error)
    }
})


// Obtención de los datos de los usuarios


router.get("/getdata",async(req,res)=>{
    try {

        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
        
    } catch (error) {
        res.status(422).json(error)
    }
})


// Obtener los datos por usuario

router.get("/getuser/:id",async(req,res)=>
{
    try {
        console.log(req.params);

        const {id}=req.params;

        const userindividual = await users.findById({_id:id});

        console.log(userindividual);
        res.status(201).json(userindividual)


        
    } catch (error) {

        res.status(422).json(error)
        
    }
})

// actualizar usuario

router.patch("/updateuser/:id",async(req,res)=>
{
    try {

        const {id}=req.params;

        const updateuser = await users.findByIdAndUpdate(id, req.body,{
            new:true
        });

        console.log(updateuser);
        res.status(201).json(updateuser);
        
    } catch (error) {

        res.status(422).json(error);
        
    }
})

// Eliminar usuarios

// router.delete("deleteuser/:id",async(req,res)=>{
//     try {

//         const {id}=req.params;

//         const deleteuser = await users.findByIdAndDelete({_id:id})
//         console.log(deleteuser);
//         res.status(201).json(deleteuser);
        
//     } catch (error) {

//         res.status(422).json(error);
        
//     }
// })


// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await users.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;
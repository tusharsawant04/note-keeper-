import express from  "express";
import cors from "cors";
import mongoose from "mongoose";




const PORT= process.env.PORT||5000;

const app=express()

app.use(express.urlencoded())
app.use(express.json())
app.use(cors())



//mongoose.connect("mongodb+srv://ts:<password>@keeper.jqv5pfv.mongodb.net/keeperapp",{useNewUrlParser:true,useUnifiedTopology:true},()=> console.log("db connected"))


mongoose 
 .connect("mongodb+srv://ts:Dipika@keeper.jqv5pfv.mongodb.net/keeperapp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
          })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));


const keeperSchema=mongoose.Schema({
    title:String,
    description:String
})

const Keeper=new mongoose.model("Keeper", keeperSchema)

app.get("/api/getAll",(req,res)=>{
    
    Keeper.find({},(err,keeperList)=>{
        if(err){
            console.log(err)
        }else{
            res.status(200).send(keeperList)
        }

    })
})

app.post("/api/addNew",(req,res)=>{
    const{title,description}=req.body
    const keeperObj=new Keeper({
        title:title,
        description:description
    })
    keeperObj.save(err=>{
        if(err){
            console.log(err)
        }
        Keeper.find({},(err,keeperList)=>{
            if(err){
                console.log(err)
            }else{
                res.status(200).send(keeperList)
            }

        })
    })
})

app.post("/api/delete",(req,res)=>{
   
    const{id}=req.body 
    Keeper.deleteOne({_id:id},()=>{
        Keeper.find({},(err,keeperList)=>{
            if(err){
                console.log(err)
            }else{
                res.status(200).send(keeperList)
            }

        })

    })
})

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('frontend/keeper-app/build'));
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/frontend/keeper-app/build/index.html'));
    });
   }

app.listen(PORT,()=>{
    console.log("backend created at")
}
)
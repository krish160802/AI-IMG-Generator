const express = require("express");
const app = express();
const bodyParser=require('body-parser');
const cors=require('cors');
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
require('dotenv').config() 
const path=require('path')
const port=process.env.PORT || 5000;





const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey:process.env.API
});
  
const openai = new OpenAIApi(configuration);


    
app.post("/generateimage",async(req,res)=>{

    try{
        console.log(req.body);
        // console.log(process.env)
        const imageParameters = {
            prompt: req.body.prompt,
            n: parseInt(req.body.n),
            size: req.body.size
        };
    
        const response = await openai.createImage(imageParameters);
        const urlData = response.data.data;
        // console.log(urlData);
        console.log("success")
        return res.json({url:urlData});
        }

        catch(e){
            console.log("error")
        }
   
})


if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'client','build')));
// console.log(path.join(__dirname,'client','build'))
    app.get('/*',(req,res)=>{
        // res.send("lo")
         res.sendFile(path.join(__dirname,'client','build','index.html'))
    })    
}

// app.post("/generateimage",(req,res)=>{
//     const generateImage = async () => {
//         const imageParameters = {
//           prompt: req.body.prompt,
//           n: req.body.n,
//           size: req.body.size
//         };
    
//         const response = await openai.createImage(imageParameters);
//         const urlData = response.data.data;
//         console.log(urlData);
//         res.json(urlData);
//     };
    
//     generateImage();
// })





app.listen(port,()=>{
    console.log("Server running");
})

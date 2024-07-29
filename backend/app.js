const express = require("express");
require("dotenv").config();
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const cors = require("cors")
const connectdb = require("./db/mongodb");
const Book = require("./Models/Book");
const Admin = require("./Models/admin")


connectdb();

const corseOption = {
    origin:"http://localhost:5173",
}


app.use(cors(corseOption))
app.use(express.json());

app.post("/register",async(req,res)=>{  
    try{
       

        const hashedpassword = await bcrypt.hash(req.body.password,10);

          const admin = new Admin({
            adminname: req.body.username,
            email: req.body.email,
            password: hashedpassword
        });
        console.log(admin);
        await admin.save();
        return res.json({message:"admin registered"})

    }catch(err){
        console.log(err);
    }
   


})

app.post("/login",async(req,res)=>{
    try{
        const {email, password} = req.body;
        const admin = await Admin.findOne({email});

        if(!admin){
            return res.json({message:"Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        return res.json({ message: "Login successful", token });



    }catch(err){
        console.log(err);

    }
})






app.get("/books",async(req,res)=>{
    try{
        const books = await Book.find();
        res.json(books)

    } catch(err){
        res.status(500).send(err)
    }
})

app.post("/books",async(req,res)=>{
    try{

        console.log(req.body);
       
        const book = new Book(req.body);
        await book.save();
       
        res.json(book)
    }catch(err){
        res.status(500).send(err)
    }
   
});

app.put("/books",async(req,res)=>{
    try{ 
       
        const {bookid} = req.query
         const {title,author,year,description,language,price} = req.body
        const book = await Book.findById(bookid);
        
        book.title = title;
        book.author= author;
        book.year= year;
        book.description= description;
        book.language= language;
        book.price = price;
        await book.save();
    
         res.json(book)

    }catch(err){
        console.log(err.message);
    }
});
app.delete("/books",async(req,res)=>{
    try{
        const {bookid}=req.query;

         await Book.findByIdAndDelete(bookid);
         res.json({message:"deleted"})



    }catch(err){
        console.log(err.message);
    }
})

app.get('/search', async (req, res) => {
    try {
      console.log(req.query);
      const { query } = req.query;
      
      const searchPattern = new RegExp(query, 'i'); // Case-insensitive regex search
  
      const books = await Book.find({
        $or: [
          { title: searchPattern },
          { author: searchPattern },
          { language: searchPattern }
        ]
      });
      console.log(books);
  
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });




app.listen(3000,()=>{
    console.log("running in 3000");

})



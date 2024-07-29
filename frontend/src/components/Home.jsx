import React, { useState,useEffect } from 'react'
import axios from "axios"
import "../../src/Home.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const Home = () => {
  
    const [books, setBooks]=useState([]);
    const [query,setQuery] = useState("")
    const [searchedbooks,setSearchedbooks] = useState([])
    const [title,setTitle]= useState("");
    const [author,setAuthor]= useState("");
    const [year,setYear]= useState();
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [language,setLanguage] = useState("");
    const [willupdatebook,setWillupdatebook] = useState(null)
  
     
    useEffect(()=>{
       fetchbooks();
    },[books])
    const fetchbooks = async () => {
      const response = await axios.get('http://localhost:3000/books');
      setBooks(response.data);
    };



  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/search', {
        params: {
          query
        }
      });
      setBooks()
      setSearchedbooks(response.data);
      
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };
  
    const addbook = async()=>{
     
      const response = await axios.post("http://localhost:3000/books",{
        title,
        author,
        year,
        description,
        price,
        language
      });
        
      setBooks([...books,response.data]);
      setTitle('');
      setAuthor('');
      setYear('');
      setDescription('');
      setLanguage('');
      setPrice('')

    };
  
    const updatebook = async(bookid)=>{
  
      if(willupdatebook){
        console.log(bookid);
        const response = await axios.put(`http://localhost:3000/books?bookid=${bookid}`,{
           title:title?title:"",
           author:author?author:"",
           year:year?year:0,
           description:description?description:"",
           language:language?language:"",
           price:price?price:0
  
  
        });
        if(response.data){
         
          setTitle('');
          setAuthor('');
          setYear('');
          setDescription("");
          setLanguage("");
          setPrice("")
          setWillupdatebook(null)
         
  
        }
  
      }else{
        const currentbook = books.find((item)=>item._id===bookid);
      setWillupdatebook(currentbook)
      setTitle(currentbook.title);
      setAuthor(currentbook.author);
      setYear(currentbook.year);
      setDescription(currentbook.description);
      setLanguage(currentbook.language);
      setPrice(currentbook.price)
  
      }
    }
  
    const deletebook = async(bookid)=>{
       await axios.delete(`http://localhost:3000/books?bookid=${bookid}`)
        
  
    }

    return (
        <>
        
        <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'row',justifyContent:"flex-end" }}>
      <input
        type="text"
        placeholder="Search by title, author, or language"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginBottom: '10px', width: '300px' }}
      />
      <button type="submit">Search</button>
    </form>

       
       
        <h1>ADMIN HOME</h1>
        
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <input
          style={{height:"40px",width:"500px"}}
            type="text"
            placeholder="Title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
          style={{height:"40px",width:"500px"}}
            type="text"
            placeholder="Description"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
           <input
          style={{height:"40px",width:"500px"}}
            type="number"
            placeholder="Price"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
          style={{height:"40px",width:"500px"}}
            type="text"
            placeholder="Author"
            value={author}
            required
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
          style={{height:"40px",width:"500px"}}
            type="text"
            placeholder="Language"
            value={language}
            required
            onChange={(e) => setLanguage(e.target.value)}
          />
         
          
          <input
          style={{height:"40px",width:"500px"}}
            type="number"
            placeholder="Year"
            value={year}
            required
            onChange={(e) => setYear(e.target.value)}
          />
          {/* <input
          style={{height:"40px",width:"500px",height:"50px"}}
           type='file'
          /> */}
          
         
         
 
 
         
        </div>
        {willupdatebook?(
           <button onClick={()=>updatebook(willupdatebook._id)}>Update Book</button>
         ):(
           <button onClick={addbook}>Add Book</button>
         )}
        
        <div className='cards'>
        {(searchedbooks.length > 0 ? searchedbooks : books).map((book) => (
          <Card className='card' sx={{ minWidth: 275 }} key={book._id}>
            <CardContent>
              <Typography sx={{ color: "black" }} variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {book.author}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                $ {book.price}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {book.year}
              </Typography>
              <Typography variant="body2">
                {book.description}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {book.language}
              </Typography>
            </CardContent>
            <CardActions>
              <button onClick={() => updatebook(book._id)} style={{ height: "40px" }}>Update</button>
              <button onClick={() => deletebook(book._id)} style={{ height: "40px" }}>Delete</button>
            </CardActions>
          </Card>
        ))}
      </div>
        
        
  


  
      

</>
  
        
     
    
    )
}

export default Home

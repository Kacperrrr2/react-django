import './App.css'
import { useEffect, useState } from 'react'
function App() {
  
const[books, setBooks]= useState([]);
const[title, setTitle]= useState("");
const[releaseYear, setRealseYear]=useState(0);
const[newTitle, setNewTitle]= useState("");
useEffect(()=> {
  fetchBooks();
},[]);
  const fetchBooks= async () =>
  {
    try{
      const response =await fetch("http://127.0.0.1:8000/api/books/");
      const data= await response.json();
      setBooks(data)
    }catch(err)
    {
      console.log(err);
    }
  };
  
  const addBook = async () => {
    const bookData = {
      title,
      release_year: releaseYear,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitle = async (pk, releaseYear)=>
  {
    const bookData = {
      title: newTitle,
      release_year: releaseYear,
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/create/${pk}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      const data = await response.json();
      setBooks((prev) => prev.map((book)=>{
        if (book.id==key)
        {
          return data;
        }
        else{
          return book;
        }
      }));
    } catch (err) {
      console.log(err);
    }

  };

  const deleteBook= async(pk)=>{
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/create/${pk+1}`, {
        method: "DELETE",
        
      });
      await response.json();
      setBooks((prev)=> prev.filter((book)=> book.id!==pk))
    }catch(err)
    {
      console.log(err);
    }



  };  


  
  return (
    <>
      <h1>Book webiste</h1>
      <div>
        <input type='text' placeholder='Book Title...' onChange={(e)=>setTitle(e.target.value)}/>
        <input type='number' placeholder='Relase Year...'onChange={(e)=>setRealseYear(e.target.value)}/>
        <button onClick={addBook}> Add Book</button>
      </div>
      {books.map((book)=>
      <div>
        <p>Title: {book.title}</p>
        <p>Release Year: {book.release_year} </p>
        <input type='text' placeholder='New Title...' onChange={(e)=>setNewTitle(e.target.value)}/>
        <button onClick={updateTitle(book.id, book.release_year)}>Change Title</button>
         <button onClick={()=> deleteBook(book.id)}>Delete item</button>
      </div>
      )}
    </>
  )
}

export default App

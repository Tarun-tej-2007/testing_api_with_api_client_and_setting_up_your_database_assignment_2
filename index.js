const express = require('express');
const bodyParser = require('body-parser');
const data =require('./data.json');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.get('/books', (req,res)=>{
 res.status(200).json(data);
})
app.get('/books/:id', (req,res)=>{
  const { id } = req.params;
  const book = data.find(book => book.book_id === id);
  if (!book) {
      return res.status(404).json({ error: 'Book not found' });
  }
  res.status(200).json(book);
});
app.post('/books',(req,res)=>{
  try {
  const { book_id, title, author, genre, year, copies } = req.body;

  if (!book_id || !title || !author || !genre || !year || !copies) {
      return res.status(400).json({ error: 'All book attributes must be provided' });
  }

  const newBook = { book_id, title, author, genre, year, copies };
  books.push(newBook);

  res.status(201).json(newBook);
} catch (error) {
  res.status(500).json({ error: 'Server error' });
}
});

app.put('/books/:id', (req,res)=>{
  try {
    const { id } = req.params;
    const { title, author, genre, year, copies } = req.body;
    const book = books.find(book => book.book_id === id);

    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    book.title = title;
    book.author = author;
    book.genre = genre;
    book.year = year;
    book.copies = copies;

    res.status(200).json(book);
  } catch (error) {
    console.log(error)
  }
});


app.delete('/delete/:id' , (req,res)=>{
    try {
      const { id } = req.params;
      const bookIndex = books.findIndex(book => book.book_id === id);
  
      if (bookIndex === -1) {
          return res.status(404).json({ error: 'Book not found' });
      }
  
      books.splice(bookIndex, 1);
      res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      console.log(error)
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

package com.assignment2.book;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
public class BookController {
    @Autowired //an annotation for automatic dependency injection
    private BookRepository bookRep;
    // Read operation
    @GetMapping("/books") //adds the GET endpoint

    public ResponseEntity<List<Book>> getAllBooks()
    {
        try {
            List<Book> bookList = new ArrayList<>();
            bookRep.findAll().forEach(bookList::add);
            if (bookList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(bookList, HttpStatus.OK);
        } catch(Exception ex) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*public List<Book> getAllBooks()
    {
        try {
            List<Book> bookList = new ArrayList<>();
            bookRep.findAll().forEach(bookList::add);

            return bookList;
        } catch(Exception ex) {
            List<Book> bookList = new ArrayList<>();
            return bookList;
        }
    }*/


    @GetMapping("/books/{id}") //adds the GET endpoint
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> bookObj = bookRep.findById(id);
        if (bookObj.isPresent()) {
            return new ResponseEntity<>(bookObj.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/books") //adds the POST endpoint
    public ResponseEntity<Book> addBook(@RequestBody Book newBook) {
        try {
            Book bookObj = bookRep.save(newBook);
            return new ResponseEntity<>(bookObj, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

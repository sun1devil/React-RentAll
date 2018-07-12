import React from "react";

import HomeHero from "../components/HomeHero";
import HomeContent from "../components/HomeContent";



class Home extends React.Component {
  render() {

    // Finally, render it!
    return (
      <div>
        <HomeHero/>
        <HomeContent/>
      </div>
    );
  }
}

export default Home;


// const Search = () => (
//   <div>
//     <Test page="SEARCH"/>

// </div>
// );

// export default Search;


// Sample Client Side API (Will be it's own file)  for connecting to the backend server (ie: database) to grab most up to date items

// import axios from "axios";

// export default {
//   // Gets all books
//   getItems: function() {
//     return axios.get("/api/books");
//   },
//   // Gets the book with the given id
//   getBook: function(id) {
//     return axios.get("/api/books/" + id);
//   },
//   // Deletes the book with the given id
//   deleteBook: function(id) {
//     return axios.delete("/api/books/" + id);
//   },
//   // Saves a book to the database
//   saveBook: function(bookData) {
//     return axios.post("/api/books", bookData);
//   }
// };



// This is how you would use the API on the React App / Client side:


  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res => this.setState({ books: res.data }))
  //     .catch(err => console.log(err));
  // };







// Example Server Side API for connecting react app with server/database


// const router = require("express").Router();
// const booksController = require("../../controllers/booksController");

// // Matches with "/api/books"
// router.route("/")
//   .get(booksController.findAll)
//   .post(booksController.create);

// // Matches with "/api/books/:id"
// router
//   .route("/:id")
//   .get(booksController.findById)
//   .put(booksController.update)
//   .delete(booksController.remove);

// module.exports = router;





// Controller (SEVER SIDE) that calls the server side API

// const db = require("../models");

// // Defining methods for the booksController
// module.exports = {
//   findAll: function(req, res) {
//     db.Book
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   findById: function(req, res) {
//     db.Book
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   create: function(req, res) {
//     db.Book
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   update: function(req, res) {
//     db.Book
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
//   remove: function(req, res) {
//     db.Book
//       .findById({ _id: req.params.id })
//       .then(dbModel => dbModel.remove())
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   }
// };




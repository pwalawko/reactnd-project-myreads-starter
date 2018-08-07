import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import BookList from './BookList'
import SearchPage from './searchPage'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, shelf) => {
    this.setState((state) => ({
      books: state.books.map(b => {
        if (b.id === book.id){
          let book2 = {...book}
          book2.shelf = shelf
          return book2
        } else {
          return b
        }
      })
    }))
    BooksAPI.update(book, shelf)
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/search" component={SearchPage}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList
              onChangeShelf={this.changeShelf}
              books={this.state.books}
            />
            <div className="open-search">
              <Link
                to='/search'
              >Add a book</Link>
            </div>
          </div>
          )}

        />
      </div>
    )
  }
}

BookList.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default BooksApp

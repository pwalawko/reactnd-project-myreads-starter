import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'

class SearchPage extends Component {
  state = {
    query: '',
    filteredBooks: []
  }

  updateQuery = (query) => {
    let trimmedQuery = query.replace(/^\s+/, '')
    this.setState({
      query: trimmedQuery
    })
    BooksAPI.search(query).then(filteredBooks => {
      filteredBooks = filteredBooks || []
      this.setState({filteredBooks})
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
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className="close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.filteredBooks.map(book =>
              <Book
                onChangeShelf={this.changeShelf}
                key={book.id}
                book={book}
              />
            )}
          </ol>
        </div>
      </div>
  	)
  }

}

BookList.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default SearchPage
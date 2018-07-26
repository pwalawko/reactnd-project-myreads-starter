import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import BookList from './BookList'
import PropTypes from 'prop-types'

class BooksApp extends Component {
  state = {
    books: [],
    query: '',
    filteredBooks: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookList
              onChangeShelf={this.changeShelf}
              books={this.state.books}
            />
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

BookList.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default BooksApp

import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookList extends Component {
  render() {
    const books = this.props.books
    const readingBooks = books.filter(book => book.status === 'currentlyReading')
    const wantToReadBooks = books.filter(book => book.status === 'wantToRead')
    const readBooks = books.filter(book => book.status === 'read')
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {readingBooks.map(book =>
                  <Book
                    onChangeShelf={this.props.onChangeShelf}
                    key={book.id}
                    book={book}
                  />
                )}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {wantToReadBooks.map(book =>
                  <Book
                    onChangeShelf={this.props.onChangeShelf}
                    key={book.id}
                    book={book}
                  />
                )}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {readBooks.map(book =>
                  <Book
                  onChangeShelf={this.props.onChangeShelf}
                  key={book.id}
                  book={book}
                />
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

Book.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}

export default BookList
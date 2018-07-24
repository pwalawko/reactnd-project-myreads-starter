import React, { Component } from 'react'

class Book extends Component {
  render() {
    const book = this.props.book
    const style = {
      width: 128,
      height: 192,
      backgroundImage: book.backgroundImage
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
              <div className="book-cover" style={style}></div>
            <div className="book-shelf-changer">
              <select>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
              <div className="book-title" key={book.title}>{book.title}</div>
              <div className="book-authors" key={book.author}>{book.author}</div>
        </div>
      </li>
    )
  }
}

export default Book
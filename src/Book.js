import React, { Component } from 'react'

class Book extends Component {
  
  changeBookShelf = (event) => {
    this.setState({
      shelf: event.target.value
    })
    this.props.onChangeShelf(this.props.book, event.target.value)
  }

  render() {
    const book = this.props.book
    const style = {
      width: 128,
      height: 192,
      backgroundImage: `url("${book.imageLinks.thumbnail}")`
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
              <div className="book-cover" style={style}></div>
            <div className="book-shelf-changer">
              <select onChange={this.changeBookShelf} value={book.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
              <div className="book-title" key={book.title}>{book.title}</div>
              <div className="book-authors" key={book.authors}>{book.authors}</div>
        </div>
      </li>
    )
  }
}

export default Book
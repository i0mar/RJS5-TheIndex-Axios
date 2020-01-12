import React from "react";

function BookRow(props) {
  const book = props.book;
  const authorName = props.authorName;

  console.log(book);

  const authorNames = () => {
    return book.authors.map(author => author.name);
  };

  console.log(book);
  return (
    <tr>
      <td>{book.title}</td>
      <td>{authorNames()}</td>
      <td>
        <button className="btn" style={{ backgroundColor: book.color }} />
      </td>
    </tr>
  );
}

export default BookRow;

import React from 'react'

const Paginator = ({ countAllItems, pageSize, currentPage, setCurrentPage }) => {

  const countPages = Math.ceil(countAllItems / pageSize)

  return (
    <div>
      <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</button>
      <button disabled={currentPage >= countPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
    </div>
  )
}

export default Paginator
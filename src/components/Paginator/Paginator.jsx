import React, { useState } from 'react'
import styles from './Paginator.module.css'

const Paginator = ({ countAllItems, pageSize, selectedPage, setSelectedPage, isPendingPages }) => {

  const [portion, setPortion] = useState(1)

  const handlePageChange = (page) => () => setSelectedPage(page)

  const pagesNumber = Math.ceil(countAllItems / pageSize)
  const portionNumber = Math.ceil(pagesNumber / 10)
  let pages = []
  for (let i = (portion - 1) * 10 + 1; (i <= portion * 10) && (i <= pagesNumber); i++) {
    pages.push(i)
  }

  return (
    <div className={styles.paginator}>
      {!isPendingPages && <><button className={styles.arrow} disabled={portion === 1 || isPendingPages} onClick={() => setPortion(portion - 1)}>{'<'}</button>
      <div className={styles.pages}>
        {pages.map((p) => (<button disabled={selectedPage == p} className={`${styles.page} ${selectedPage == p ? styles.selected : ''}`} onClick={handlePageChange(p)}>{p}</button>))}
      </div>
      <button className={styles.arrow} disabled={portion >= portionNumber || isPendingPages} onClick={() => setPortion(portion + 1)}>{'>'}</button></>}
    </div>
  )
}

export default Paginator
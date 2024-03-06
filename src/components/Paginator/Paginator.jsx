import React, { useState } from 'react'
import styles from './Paginator.module.css'

const Paginator = ({ countAllItems, pageSize, selectedPage, setSelectedPage }) => {

  const handlePageChange = (page) => () => setSelectedPage(page)
  const pagesNumber = Math.ceil(countAllItems / pageSize)

  let firstPages = []
  let middlePages = []
  let lastPages = []

  if(pagesNumber > 8) {
    if (selectedPage >= 5 || pagesNumber.length <= 5) {
      firstPages = [1]
    } else {
      for (let i = 1; i < pagesNumber && i <= 5; i++) {
        firstPages.push(i)
      }
    }
    if (selectedPage > pagesNumber - 5) {
      for (let i = pagesNumber - 5; i <= pagesNumber; i++) {
        lastPages.push(i)
      }
    } else {
      lastPages = [pagesNumber]
    }
  
    if (firstPages.length < 5 && lastPages.length < 5) {
      for (let i = selectedPage - 2; i <= selectedPage + 2; i++) {
        middlePages.push(i)
      }
    }
  }else{
    for (let i = 1; i <= pagesNumber; i++) {
      firstPages.push(i)
    }
  }

  return (
    <div className={styles.paginator}>
      <button className={styles.arrow} disabled={selectedPage === 1} onClick={handlePageChange((prev) => prev-1)}>{'<'}</button>
      <div className={styles.pages}>
        {firstPages.map((p) => (<button disabled={selectedPage == p} key={p} className={`${styles.page} ${selectedPage == p ? styles.selected : ''}`} onClick={handlePageChange(p)}>{p}</button>))}
        {middlePages.length > 0 && <span>...</span>}
        {middlePages.map((p) => (<button disabled={selectedPage == p} key={p} className={`${styles.page} ${selectedPage == p ? styles.selected : ''}`} onClick={handlePageChange(p)}>{p}</button>))}
        {lastPages.length > 0 && <span>...</span>}
        {lastPages.map((p) => (<button disabled={selectedPage == p} key={p} className={`${styles.page} ${selectedPage == p ? styles.selected : ''}`} onClick={handlePageChange(p)}>{p}</button>))}
      </div>
      <button className={styles.arrow} disabled={selectedPage >= pagesNumber} onClick={handlePageChange(prev => prev+1)}>{'>'}</button>
    </div>
  )
}

export default Paginator
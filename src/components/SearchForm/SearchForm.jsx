import React, { useEffect, useState } from 'react'
import styles from './SearchForm.module.css'

const SearchForm = ({ handleClickSearch }) => {

  const [select, setSelect] = useState('brand')
  const [input, setInput] = useState('')

  useEffect(() => {
    setInput('')
  }, [select])

  const handleChangeSelect = (e) => {
    setSelect(e.target.value)
  }

  const handleChangeInput = (e) => {
    setInput(e.target.value)
  }

  const handleClick = () => {
    if(input.length == 0){
      handleClickSearch(null)
      return
    }
    if (select === 'price') {
      handleClickSearch({ [select]: Number(input) })
    } else {
      handleClickSearch({ [select]: input })
    }
  }

  return (
    <div className={styles.form}>
      <div>
        <label htmlFor="filter-selector">Искать по</label>
        <select className={styles.select} id="filter-selector" onChange={handleChangeSelect} value={select}>
          <option value="brand">Бренду</option>
          <option value="price">Цене</option>
          <option value="product">Названию</option>
        </select>
      </div>
      <div className={styles.search}>
        <input className={styles.input} type={select === 'price' ? "number" : "text"} placeholder='Введите' onChange={handleChangeInput} value={input} />
        <button className={styles.button} onClick={handleClick}>Найти</button>
      </div>
    </div>
  )
}

export default SearchForm
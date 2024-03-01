import React, { useEffect, useState } from 'react'

let initial = {
  brand: undefined,
  price: undefined,
  product: undefined,
  id: undefined
}

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
    if(select === 'price'){
      handleClickSearch({ [select]: Number(input) })
      return
    }
    handleClickSearch({ [select]: input })
  }

  return (
    <div>
      <label htmlFor="filterSelector">Искать по</label>
      <select name="" id="filterSelector" onChange={handleChangeSelect} value={select}>
        <option value="brand">Бренду</option>
        <option value="price">Цене</option>
        <option value="product">Названию</option>
      </select>
      <input type={select === 'price' ? "number" : "text"} placeholder='Введите' onChange={handleChangeInput} value={input} />
      <button onClick={handleClick}>Найти</button>
    </div>
  )
}

export default SearchForm
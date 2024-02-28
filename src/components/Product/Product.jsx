import React from 'react'
import styles from './Product.module.css'

const Product = ({id, brand, price, product}) => {
  return (
    <li key={id} className={styles.container}>
      <p>{id}</p>
      <p>{brand}</p>
      <p>{price}</p>
      <p>{product}</p>
    </li>
  )
}

export default Product
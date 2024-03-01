import React from 'react'
import styles from './Product.module.css'

const Product = ({prodId, brand, price, product}) => {
  return (
    <li className={styles.container}>
      <p>{prodId}</p>
      <p>{brand}</p>
      <p>{price}</p>
      <p>{product}</p>
    </li>
  )
}

export default Product
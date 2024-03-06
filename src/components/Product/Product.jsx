import React from 'react'
import styles from './Product.module.css'

const Product = ({prodId, brand, price, product}) => {
  return (
    <li className={styles.container}>
      <p className={styles.name}>{product}</p>
      <p className={styles.brand}>Бренд: {brand || 'нет'}</p>
      <p className={styles.id}>Артикул: {prodId}</p>
      <p className={styles.price}>{price}</p>
    </li>
  )
}

export default Product
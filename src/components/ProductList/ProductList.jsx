import React from 'react'
import Product from '../Product/Product'
import styles from './ProductList.module.css'

const ProductList = ({products}) => {
  
  return (
    <ul className={styles.list}>
      {products?.map((p) => p && <Product key={p.id} prodId={p.id} brand={p.brand} product={p.product} price={p.price}/>)}
    </ul>
  )
}

export default ProductList
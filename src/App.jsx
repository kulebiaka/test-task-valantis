import React, { useState, useEffect, useMemo } from 'react';
import styles from './App.module.css';
import SearchForm from './components/SearchForm/SearchForm';
import ProductList from './components/ProductList/ProductList';
import Paginator from './components/Paginator/Paginator';
import { getAllIds, getItemsByIds } from './api/api';
import { PAGE_SIZE } from './utils/constants';


function App() {
  const [page, setPage] = useState(1)
  const [productsIdsList, setIdsList] = useState([])
  const [productIdToProduct, setProductIdToProduct] = useState([])
  
  const productsFromPage = productIdToProduct.slice((page - 1) * 50, page * 50)

  const getData = async () => {
    const ids = await getAllIds()
    console.log(ids)
    const products = await getItemsByIds(ids)
    console.log(products)
    return products
  }

  useEffect(() => {
    getData().then(data => setProductIdToProduct(data))
  },[])

  return (
    <div className={styles.app}>
      <h1>Интернет Магазин</h1>
      <SearchForm />
      <Paginator countAllItems={productIdToProduct.length} currentPage={page} setCurrentPage={setPage} pageSize={PAGE_SIZE}/>
      <ProductList products={productsFromPage}/>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useRef } from 'react';
import styles from './App.module.css';
import SearchForm from './components/SearchForm/SearchForm';
import ProductList from './components/ProductList/ProductList';
import Paginator from './components/Paginator/Paginator';
import { getFilteredIds, getIds, getItemsByIds } from './api/api';
import { PAGE_SIZE } from './utils/constants';
import Loader from './components/Loader/Loader';


function App() {

  const [isPending, setIsPending] = useState(true)
  const [isPendingIds, setIsPendingIds] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [idList, setIdList] = useState([])
  const [mapIdProduct, setMapIdProduct] = useState({}) 

  let slicedIdList = idList.slice((page - 1) * 50, page * 50)
  let productsFromPage = slicedIdList.map((id) => mapIdProduct[id])

  useEffect(() => {
    getInitialData()
  }, [])

  useEffect(() => {
    let pageAbortController = new AbortController()
    let signal = pageAbortController.signal

    const getProductsByPage = async () => {
      let products
      const idsToRequest = []
      slicedIdList.forEach((id) => {
        if (mapIdProduct[id] == undefined) {
          idsToRequest.push(id)
        }
      })
      if (idsToRequest.length > 0) {
        setIsPending(true)
        products = await getItemsByIds(idsToRequest, signal)
        setMapWithCheckDuplicates(products)
        setIsPending(ignore)
      }
      return products
    }

    let ignore = false;
    getProductsByPage()
    return () => {
      ignore = true
      pageAbortController.abort()
    }
  }, [page])

  const getInitialData = async () => {
    setIsPending(true)
    setIsPendingIds(true)
    const ids = await getIds(0, 60)
    setIdList(ids)
    const products = await getItemsByIds(ids.slice(0, 50))
    setMapWithCheckDuplicates(products)
    setIsPending(false)
    const allIds = await getIds()
    setIdList(allIds)
    setIsPendingIds(false)
  }

  const setMapWithCheckDuplicates = (products) => {
    const changing = {}
    products?.forEach(product => {
      if (mapIdProduct[product.id] == undefined && changing[product.id] == undefined) {
        changing[product.id] = product
      }
    });
    setMapIdProduct(prev => ({ ...prev, ...changing }))
  }

  const handleClickSearch = async (filter) => {
    setPage(1)
    setError('')
    if(filter == null){
      return
    }
    setIsPending(true)
    setIsPendingIds(true)
    const ids = await getFilteredIds(filter)
    setIdList(ids)
    if (ids.length === 0) {
      setError('К сожалению, по вашему запросу ничего не найдено')
    } 
    else {
      const products = await getItemsByIds(ids.slice(0 * 50, 1 * 50))
      setMapWithCheckDuplicates(products)
    }
    setIsPending(false)
    setIsPendingIds(false)
    return ids
  }

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Интернет Магазин</h1>
      <SearchForm handleClickSearch={handleClickSearch} resetFilter={getInitialData} />
      {isPendingIds ? <span style={{lineHeight: '37px'}}>Загрузка...</span> : <Paginator countAllItems={idList?.length} selectedPage={page} setSelectedPage={setPage} pageSize={PAGE_SIZE} />}
      {isPending ? <Loader /> : <ProductList products={productsFromPage} />}
      {error}
    </div>
  );
}

export default App;

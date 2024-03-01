import React, { useState, useEffect, useMemo } from 'react';
import styles from './App.module.css';
import SearchForm from './components/SearchForm/SearchForm';
import ProductList from './components/ProductList/ProductList';
import Paginator from './components/Paginator/Paginator';
import { getAllIdsFrom, getFields, getFilteredIds, getIds, getItemsByIds } from './api/api';
import { PAGE_SIZE } from './utils/constants';
import Loader from './components/Loader/Loader';


function App() {

  const [isPending, setIsPending] = useState(true)
  // const [error, setError] = useState()
  const [isPendingIds, setIsPendingIds] = useState(true)
  const [page, setPage] = useState(1)
  const [idList, setProductsIdsList] = useState([]) // массив уникальных id
  const [mapIdProduct, setMapIdProduct] = useState({}) // ключ - id товара, значение - сам товар

  let slicedIdList = idList?.slice((page - 1) * 50, page * 50)
  let productsFromPage = slicedIdList.map((id) => mapIdProduct[id])

  
  
  useEffect(() => {
    getInitialData()
    return () => setProductsIdsList([])
  }, [])
  
  const getInitialData = async () => {
    setIsPending(true)
    const ids = await getIds(110, 0)
    setProductsIdsList(ids)
    const products = await getItemsByIds(ids.slice(0, 50))
    setMapWithCheckDuplicates(products)
    setIsPendingIds(true)
    getAllIdsFrom(110)
      .then(ids => {
        setProductsIdsList(prev => [...prev, ...ids])
        setIsPendingIds(false)
      })

    setIsPending(false)
  }

  const setMapWithCheckDuplicates = (products) => {
    const changing = {}
    products.forEach(product => {
      if (mapIdProduct[product.id] == undefined && changing[product.id] == undefined) {
        changing[product.id] = product
      }
    });
    setMapIdProduct(prev => ({ ...prev, ...changing }))
  }

  const handleClickSearch = async (filter) => {

    for (const key in filter){
      if(filter[key].length === 0){
        getInitialData()
        return
      }
    }

    setIsPending(true)
    const ids = await getFilteredIds(filter)
    setProductsIdsList(ids)
    // if(ids.length === 0)
    const products = await getItemsByIds(ids.slice((page - 1) * 50, page * 50))
    setMapWithCheckDuplicates(products)
    handleChangePage(1)
    setIsPending(false)

  }

  const handleChangePage = async (newPage) => {
    let response;
    setPage(newPage)
    const idsToRequest = []
    idList?.slice((newPage - 1) * 50, newPage * 50).forEach((id) => {
      if (mapIdProduct[id] == undefined) {
        idsToRequest.push(id)
      }
    })
    if (idsToRequest?.length > 0) {
      console.log(idsToRequest)
      setIsPending(true)
      let products = await getItemsByIds(idsToRequest)
      setMapWithCheckDuplicates(products)
      setIsPending(false)
    }
  }

  return (
    <div className={styles.app}>
      <h1>Интернет Магазин</h1>
      <SearchForm handleClickSearch={handleClickSearch} />
      <Paginator isPendingPages={isPendingIds} countAllItems={idList?.length} selectedPage={page} setSelectedPage={handleChangePage} pageSize={PAGE_SIZE} />
      <ProductList products={productsFromPage} />
      {isPending && <Loader />}
      {/* {!isPendingIds && !isPending && !idList.length && 'К сожалению, по вашему запросу ничего не нашли :('} */}
    </div>
  );
}

export default App;

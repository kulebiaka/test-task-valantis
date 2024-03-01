import md5 from "md5";
import { PASSWORD } from "../utils/constants";

export const getXAuth = () => {

  const fixDigit = (num) => num < 10 ? '0' + num : num

  const date = new Date()
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()

  return md5(PASSWORD + '_' + year + fixDigit(month) + fixDigit(day))
}


const deleteDulicates = (arr) => {
  const set = new Set(arr)
  return Array.from(set)
}

export const getAllIdsFrom = async (offset = 0) => {
  const response = await fetch('http://api.valantis.store:40000/', {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      'X-Auth': getXAuth()
    },
    body: JSON.stringify({
      "action": "get_ids",
      "params": {offset}
    })
  })
  // if(response.status >= 500){
  //   return await getIds(offset)
  // }
  // console.log(response.json())
  return response.json().then(res => deleteDulicates(res.result))
}


export const getIds = async (limit, offset) => {
  
  const response = await fetch('http://api.valantis.store:40000/', {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      'X-Auth': getXAuth()
    },
    body: JSON.stringify({
      "action": "get_ids",
      "params": {offset, limit}
    })
  })
  // if(response.status >= 500){
  //   return getIds(limit, offset)
  // }

  return response.json().then(res => deleteDulicates(res.result))
}

export const getFilteredIds = async ( filter ) => {
  const response = await fetch('http://api.valantis.store:40000/', {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      'X-Auth': getXAuth()
    },
    body: JSON.stringify({
      "action": "filter",
      "params": {...filter}
    })
  })
  // if(response.status >= 500){
  //   return await getIds(limit, offset)
  // }
  // console.log(response.json())
  return response.json().then(res => res.result)
}

export const getItemsByIds = async (ids) => {
  const response = await fetch('http://api.valantis.store:40000/', {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      'X-Auth': getXAuth()
    },
    body: JSON.stringify({
      "action": "get_items",
      "params":{'ids': ids}
    })
  })
  // if(response.status >= 500){
  //   return await getItemsByIds(ids)
  // }
  // response.json().then(console.log)
  return response.json().then(res => res.result)
}
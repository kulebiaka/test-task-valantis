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

// const deleteDulicates = (arr) => {
//   const arrCopy = []
//   arrCopy.push(arr[0])
//   console.log('delete duplicates')
//   for(let i = 1; i < arr.length; i++){
//     if(arrCopy[i-1] !== arr[i]){
//       arrCopy.push(arr[i])
//     }else{
//       console.log(arr[i])
//     }
//   }
//   return arrCopy
// }

// const deleteDulicatesIds = (arr) => {
//   const set = new Set(arr)
//   return Array.from(set)
// }

// const deleteDulicates = (arr) => {
//   const map = {}
//   for(let i = 0; i < arr.length; i++){
//     if (map[arr[i]] == undefined){
//       map[arr[i]] = 1
//     }else{
//       map[arr[i]]++
//     }
//   }
//   for (const key in map) {
//     if (map[key] > 1) {
//       console.log(map[key] + " " + key) 
//     }
//   }
//   return Object.keys(map)
// }

export const getAllIds = async () => {
  const response = await fetch('http://api.valantis.store:40000/', {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      'X-Auth': getXAuth()
    },
    body: JSON.stringify({
      "action": "get_ids"
    })
  })
  // if(response.status >= 500){
  //   return await getAllIds()
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
  return response.json().then(res => res.result)
}
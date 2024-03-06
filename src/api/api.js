import md5 from "md5";

const PASSWORD = 'Valantis'
const URL_API = 'https://api.valantis.store:41000/'
const GET_IDS = 'get_ids'
const FILTER = 'filter'
const GET_ITEMS = 'get_items'


const getXAuth = () => {

  const fixDigit = (num) => num < 10 ? '0' + num : num

  const date = new Date()
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()

  return md5(PASSWORD + '_' + year + fixDigit(month) + fixDigit(day))
}


export const deleteDuplicatesInArray = (arr) => {
  const set = new Set(arr)
  return Array.from(set)
}

const createResponse = async (action, params, signal) => {
  let response
  try {
    response = await fetch(URL_API, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'X-Auth': getXAuth()
      },
      body: JSON.stringify({
        "action": action,
        "params": params
      }),
      signal
    })
    if(!response.ok){ 
      throw new Error(`Server returned ${response.status} ${response.statusText}`)
    }
  } catch (error) {
    console.log(error instanceof Error ? error : 'Unknown error')
    if(response?.status === 500){
      return createResponse(action, params, signal)
    }
    return Promise.resolve(error)
  }
  return response
}


export const getIds = async (offset, limit) => {
  const response = await createResponse(GET_IDS, { limit, offset })
  return response.json().then(res => deleteDuplicatesInArray(res.result))
}

export const getFilteredIds = async (filter) => {
  const response = await createResponse(FILTER, { ...filter })
  return response.json().then(res => deleteDuplicatesInArray(res.result))
}

export const getItemsByIds = async (ids, signal) => {
  const response = await createResponse(GET_ITEMS, { ids }, signal)
  if(response instanceof Error){
    return
  }
  return response.json().then(res => res.result)
}
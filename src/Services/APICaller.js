const BASE_URL = `https://api.paintikaart.com/api/v1`;

export const fetchRequest = (endpoints, requestBody) => {
  console.log(`${endpoints + ' API PARAMS'}`, requestBody)
  return new Promise(resolve => {
    fetch(BASE_URL + endpoints, requestBody)
      .then(response => response.text())
      .then(result => {
        console.log(endpoints, result)
        resolve(JSON.parse(result))
      })
      .catch(error => {
        console.log(endpoints, error)
        resolve(error)
      })
  })
}
const BASE = 'https://apartment-app-backend.herokuapp.com'

let getApartments = function() {
  return fetch(BASE + '/apartments')
    .then((resp) => {
      let json = resp.json()
      return json
    })
}

let getApartment = function(id) {
  return fetch(BASE + `/apartments/${id}`)
    .then((resp) => {
      let json = resp.json()
      return json
    })
}

let getUserApartments = function(user_id) {
  return fetch(BASE + `/users/${user_id}/apartments`)
    .then((resp) => {
        let json = resp.json()
        return json
      })
}

let createApartment = function(apt) {
  return fetch( BASE + `/apartments`, {
    body: JSON.stringify(apt),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
  })
  .then((resp) => {
    let json = resp
    return json
  })
}

let destroyApartment = function(id) {
  return fetch(BASE + `/apartments/${id}`, {
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "DELETE"
  })
    .then((resp) => {
      let json = resp
      return json
    })
}

let editApartment = function(aptObj) {
  return fetch(BASE + `/apartments/${aptObj.id}`, {
    method: "PATCH",
    body: JSON.stringify(aptObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(resp => {
    let json = resp
    return json
  })
}

export {
  getApartments,
  getApartment,
  getUserApartments,
  destroyApartment,
  editApartment,
  createApartment,
}

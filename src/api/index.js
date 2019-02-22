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

let destroyApartment = function(id) {
  console.log(id);
  return fetch(BASE + `/apartments/${id}`, {
    body: JSON.stringify(id),
    headers: {
      'Content-Type': 'application/json'
    },
    method: "DELETE"
  })
    .then((resp) => {
      let json = resp
      console.log(json);
      return json
    })
}

let editApartment = function(aptObj) {
  console.log(aptObj.id);
  return fetch(BASE + `/apartments/${aptObj.id}`, {
    method: "PATCH",
    body: JSON.stringify(aptObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(resp => {
    let json = resp
    console.log(json.errors);
    return json
  })
}

export {
  getApartments,
  getApartment,
  getUserApartments,
  destroyApartment,
  editApartment
}

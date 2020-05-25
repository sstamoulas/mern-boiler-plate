const signin = (user) => {
  return fetch('/auth/sign-in/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(user)
  })
  .then((response) => {
    return response.json()
  })
  .catch((err) => {
    console.log(err)
  })
}

const signout = (user) => {
  return fetch('/auth/sign-out/', {
    method: 'GET'
  })
  .then((response) => {
    return response.json()
  })
  .catch((err) => {
    console.log(err)
  })
}

export { signin, signout }

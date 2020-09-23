const getBoth = {
  query: `
  query {
    peliculas {
      id
      name
      publication_date
      isActive
      assigned_turns
    },
    turnos{
      id
      hour
      isActive
      assigned_movie
    }
  }
`
}


const addNewMovie = (params: any) => {
  const {id, name, publication_date, isActive} = params
  const mutationObj = {
    query: `
      mutation($id: String!, $name: String!, $publication_date: Int!, $isActive: Boolean) {
        insert_peliculas_one(object: {id: $id, name: $name, publication_date: $publication_date, isActive: $isActive}) {
          id
          name
          publication_date
          isActive
        }
      }
      `,
      variables: {id, name, publication_date, isActive}
  }
  return mutationObj
}

const updateMovie = (params: any) => {
  const {id, name, publication_date, isActive, assigned_turns} = params
  const mutationObj = {
    query: `
      mutation($id: String!, $name: String!, $publication_date: Int!, $isActive: Boolean!, $assigned_turns:Int ) {
        update_peliculas_by_pk(
          pk_columns: {id: $id}
          _set: {
            name: $name,
            publication_date: $publication_date,
            isActive: $isActive,
            assigned_turns: $assigned_turns
          }
        ) {
          id
          name
        }
      }
      `,
      variables: {id, name, publication_date, isActive, assigned_turns}
  }
  return mutationObj
}


const deleteMovie = (params:any) => {
  const {id} = params
  const mutationObj = {
    query: `
      mutation($id: String!) {
        delete_peliculas_by_pk(
          id:$id
        ) {
          id
          name
        }
      }
    `,
    variables: {id}
  }
  return mutationObj
}

const deleteTurn = (params:any) => {
  const {id} = params
  const mutationObj = {
    query: `
      mutation($id: Int!) {
        delete_turnos_by_pk(
          id:$id
        ) {
          id
        }
      }
    `,
    variables: {id}
  }
  return mutationObj
}

const updateTurn = (params: any) => {
  const {id, hour, isActive, assigned_movie} = params
  const mutationObj = {
    query: `
    mutation($id: Int!, $hour: String!, $isActive: Boolean!, $assigned_movie:String){
      update_turnos_by_pk(
        pk_columns:{id: $id}
        _set: {
          hour: $hour,
          isActive: $isActive,
          assigned_movie: $assigned_movie
        }
      ){
        id
        hour
      }
    }
    `,
    variables: {id, hour, isActive, assigned_movie }
  }
  return mutationObj
}

const addNewTurn = (params: any) => {
  const {hour, isActive} = params
  const mutationObj = {
    query: `
      mutation($hour: String!,$isActive: Boolean!) {
        insert_turnos_one(object: {hour: $hour,  isActive: $isActive}) {
          hour
          isActive
        }
      }
      `,
      variables: {hour, isActive}
  }
  return mutationObj
}


export const Fetcher = (url: string) => fetch(url, {
  method: "POST",
  body: JSON.stringify(getBoth)
}).then(res =>{ 
  return res.json()
})


export const AddNewTurnFetcher = (url:string, params:any) => fetch(url, {
  method: "POST",
  body: JSON.stringify(addNewTurn(params))
})
.then(res => {
  return res.json()
})
.catch(err => console.log(err))


export const AddNewMovieFetcher = (url:string, params:any) => fetch(url, {
  method: "POST",
  body: JSON.stringify(addNewMovie(params))
})
.then(res => {
  return res.json()
})
.catch(err => console.log(err))

export const UpdateMovieFetcher = (url:string, params:any) => fetch(url, {
  method: "POST",
  body: JSON.stringify(updateMovie(params))
})
.then(res => {
  return res.json()
})
.catch(err => console.log(err))

export const UpdateTurnFetcher = (url:string, params:any) => fetch(url, {
  method: "POST",
  body: JSON.stringify(updateTurn(params))
})
.then(res => {
  return res.json()
})
.catch(err => console.log(err))

export const DeleteMovieFetcher = (url:string, params:any) => fetch(url, {
  method: "POST",
  body: JSON.stringify(deleteMovie(params))
})
.then(res => {
  return res.json()
})
.catch(err => console.log(err))

export const DeleteTurnFetcher = (url:string, params:any) => fetch(url, {
  method: "POST",
  body: JSON.stringify(deleteTurn(params))
})
.then(res => {
  return res.json()
})
.catch(err => console.log(err))

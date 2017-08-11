// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const RECEIVE_FOO = 'RECEIVE_FOO'
export const REQUEST_FOO = 'REQUEST_FOO'

// ------------------------------------
// Actions
// ------------------------------------
export function increment(value = 1) {
  return {
    type: COUNTER_INCREMENT,
    payload: value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: COUNTER_DOUBLE_ASYNC,
          payload: getState().counter
        })
        resolve()
      }, 200)
    })
  }
}

export function requestFoo() {
  return {
    type: REQUEST_FOO,
  }
}

export function receiveFoo(data) {
  return {
    type: RECEIVE_FOO,
    data: data,
    receivedAt: Date.now()
  }
}
export function fetchFoo() {
  return (dispatch, getState) => {
    if (getState().counter.isFetchingFoo) {
      return
    }
    dispatch(requestFoo())
    let url = `/u/rn`
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain"
      },
      credentials: "same-origin"
    }).then(function (response) {
      console.log(response.status) //=> number 100–599
      console.log(response.statusText) //=> String
      console.log(response.headers) //=> Headers
      console.log(response.url) //=> String
      return response.text()
    }, function (error) {
      dispatch(receiveFoo())
      console.log(error.message) //=> String
    }).then(function (text) {
      dispatch(receiveFoo(text))
    })
  }
}

export const actions = {
  increment,
  doubleAsync,
  fetchFoo
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => {
    return {
      ...state,
      count: state.count + action.payload
    }
  },
  [COUNTER_DOUBLE_ASYNC]: (state, action) => {
    return {
      ...state,
      count: state.count * 2
    }
  },
  [REQUEST_FOO]: (state, action) => {
    return {
      ...state,
      isFetchingFoo: true
    }
  },
  [RECEIVE_FOO]: (state, action) => {
    return {
      ...state,
      isFetchingFoo: false,
      foo: action.data,
      lastUpdatedFoo: action.receivedAt
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  count: 0,
  foo: "",
  isFetchingFoo: false,
  lastUpdatedFoo: null,
}
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

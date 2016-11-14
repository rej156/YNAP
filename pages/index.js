import React from 'react'
import { Provider } from 'mobx-react'
import Link from 'next/link'
import ProductList from '../components/ProductList'
import store from '../stores/index.js'
import { toJS } from 'mobx'
import { dehydrate } from 'rfx-core'

const initStores = (isServer, initialState) => {
  if(isServer && typeof window === 'undefined') {
    return store.init(initialState)
  }
  else {
    if (!window.store){
      window.store = store.inject(JSON.parse(initialState))
    }
    return window.store
  }
}

export default class extends React.Component {
  static async getInitialProps ({ req }) {
    const isServer = !!req
    const store = initStores(isServer)
    await store.ProductStore.fetchInitialProducts()
    return { initialState: dehydrate(), isServer }
  }

  constructor(props) {
    super(props)
    this.store = initStores(props.isServer, props.initialState)
  }

  render () {
    return (
      <Provider store={this.store}>
        <ProductList />
      </Provider>
    )
  }
}

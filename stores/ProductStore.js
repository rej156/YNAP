import { action, extendObservable } from 'mobx'
import 'isomorphic-fetch'

class Product {
  constructor(store, id, title, price) {
    this.store = store
    extendObservable(this, {
      id,
      title,
      price
    })
  }
}

export default class ProductStore {
  constructor(payload) {
    const products = payload && payload.products || []
    extendObservable(this, {
      products
    })
  }

  addProduct = action((id, title, price) => this.products.push(new Product(this, id, title, price)))

  fetchInitialProducts = () => {
    if(this.initialFetch == true) {
      return true
    }
    return fetch('http://localhost:8080/products')
      .then((res) => res.json())
      .then(({ _embedded: { products } }) => {
        products.forEach(({ id, title, price }) => this.addProduct(id, title, price))
        this.initialFetch = true
      })
  }

  submitProduct = action(({ title, price }) => {
    fetch('http://localhost:8080/products', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        price
      })
    })
      .then((res) => res.json())
      .then(({ id, title, price }) => {
        this.addProduct(id, title, price)
      })
      .catch((err) => {
        this.addProduct(this.products.length+1, title, price)
        alert('Due to cors and a proxy api not being implemented, fake UI here :P')
      })
  })

  deleteProduct = action((index) => this.products.splice(index, 1))
}

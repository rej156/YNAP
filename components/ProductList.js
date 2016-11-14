import React from 'react'
import { observer } from 'mobx-react'
import form from '../forms/product'
import ProductForm from './ProductForm'
import { dispatch } from 'rfx-core'

const Product = ({ index, product: { id, title, price } }) => (
  <tr>
    <td
      onClick={() => dispatch('ProductStore.deleteProduct', index)}
      style={{border: '1px solid black'}}
      >X</td>
    <td style={{border: '1px solid black'}}>{ id }</td>
    <td style={{border: '1px solid black'}}>{ title }</td>
    <td style={{border: '1px solid black'}}>{ price }</td>
  </tr>
)

class ProductList extends React.Component {
  render () {
    return (
      <div
        style={{
          maxWidth: '80%',
          margin: 'auto'
        }}
        >
        <ProductForm form={ form }/>
        <br/>
        <table
          style={{
            width: '100%',
            border: '1px solid black'
          }}
          >
          <thead>
            <tr>
              <th> </th>
              <th style={{textAlign: 'left', border: '1px solid black'}}>ID</th>
              <th style={{textAlign: 'left', border: '1px solid black'}}>Title</th>
              <th style={{textAlign: 'left', border: '1px solid black'}}>Price</th>
            </tr>
          </thead>
          <tbody>
            { this.props.store.ProductStore.products.map((product, index) => <Product index={index} product={ product } key={ product.id } /> ) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default observer(['store'], ProductList)

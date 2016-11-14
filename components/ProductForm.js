import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ form, events }) => (
  <form
    style={{
      border: '2px solid lightgrey',
      boxSizing: 'border-box'
    }}
    onSubmit={form.onSubmit}
    >
    <div
      style={{
        maxWidth: '80%',
        margin: 'auto',
        paddingBottom: '10px',
        paddingTop: '10px'
      }}
    >
      <label htmlFor={form.$('title').label}>{form.$('title').label}</label>
      <input
        style={{width: '99%'}}
        type="text"
        name={form.$('title').name}
        value={form.$('title').value}
        onChange={form.$('title').sync}
        />
      <p>{form.$('title').error}</p>
      <label htmlFor={form.$('title').label}>{form.$('price').label}</label>
      <input
        style={{width: '99%'}}
        type="text"
        name={form.$('price').name}
        value={form.$('price').value}
        onChange={form.$('price').sync}
        />
      <p>{form.$('price').error}</p>
      <br/>
      <button
        style={{
          float: 'right'
        }}
        type="submit"
        onClick={form.onSubmit}
        >Add</button>
      <p>{form.error}</p>
    </div>
  </form>
))

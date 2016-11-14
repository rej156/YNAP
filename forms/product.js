import Form from 'mobx-react-form'
import validatorjs from 'validatorjs';
import { dispatch } from 'rfx-core';

class ProductForm extends Form {

  onSuccess(form) {
    dispatch('ProductStore.submitProduct', form.values())
    form.clear()
  }

  onError(form) {
    // get all form errors
    console.log('All form errors', form.errors());
    // invalidate the form with a custom error message
    form.invalidate('This is a generic error message!');
  }
}

export default new ProductForm({
  plugins: {
    dvr: validatorjs
  },
  fields: {
    title: {
      label: 'Title',
      rules: 'required|string'
    },
    price: {
      label: 'Price',
      rules: 'required|integer'
    }
  }
});

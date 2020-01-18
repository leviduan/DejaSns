import React, {Component} from 'react';
import './index.css'
import ShippingAddress from '../common_component/shipping_address/src';

class Demo extends Component {
  render() {
    return (
      <div className="app App">
        <button>test</button>
        <ShippingAddress />
      </div>
    )
  }
}

export default Demo;
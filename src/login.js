import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { sendUserLogs } from './common/statsApi';
import PhoneLogin from '../common_component/user_register/src';
// import * as logType from './common/statsType';
// import { appStatusFromUrl } from './common/decorator';
import './index.css';
// import './login.css';

class LogIn extends Component {
  // state = {
  //   appStatus: appStatusFromUrl.search || {},
  // };

  render() {
    return (
      <div className="landing-page">
        <PhoneLogin />
      </div>
    )
  }
}

ReactDOM.render(<LogIn />, document.getElementById('root'));
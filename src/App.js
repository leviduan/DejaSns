import React, { Component } from 'react';
import 'gestalt/dist/gestalt.css';
import Profile from './pages/Lookbook/lookbookPage'
import SnsAnswerPage from './pages/homepage/SnsAnswerPage'
import './App.css'
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import snsRank from './pages/homepage/snsRank'
import snsRankPage from './pages/homepage/SnsRankPage'
import SnsAnswerPublicPage from './pages/homepage/SnsAnswerPublicPage'
import snsRules from './pages/homepage/SnsRules'
import test from './pages/homepage/test'
import lookboo from './pages/homepage/test'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={Profile}/>
          <Route path="/snsAnswer" component={SnsAnswerPage} />
          <Route path="/snsRank" component={snsRank} />
          <Route path='/snsRankPage' component={snsRankPage} />
          <Route path='/snsAnswerPublicPage' component={SnsAnswerPublicPage} />
          <Route path='/snsRules' component={snsRules} />
          <Route path='/test' component={test} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;

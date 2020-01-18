import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';
import './rem.js'
import ScrollToTop from './ScrollToTop'

// BrowserRouter, Route, Link, Switch
// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

window.htmlCallMobileDeja = function(handlerMethod, parameters){    

    try {
        var u = navigator.userAgent; 
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) 
        if (isiOS) {
            var dic = {'body': parameters};
            if (window.webkit) {
                window.webkit.messageHandlers[handlerMethod].postMessage(dic);
                console.log(handlerMethod)
            }
        } else if(isAndroid){
            if (parameters === '') {
                window['DejaJsClient'][handlerMethod]()
            }
            else {
                window['DejaJsClient'][handlerMethod](parameters)
            }
        }
        else {
            //
        }
    } catch(err) {
        console.log('The native context does not exist yet');
    }
};

window.htmlFireBaseLogDeja = function(event_name, event_first_param, event_second_param){    

    try {
        var u = navigator.userAgent; 
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) 
        var dic = {
            'event_name': event_name + '',
            'event_first_param': event_first_param + '',
            'event_second_param': event_second_param + '',
        }
        if (isiOS) {
            if (window.webkit) {
                window.webkit.messageHandlers['addFireBaseDILog'].postMessage(dic);
            }
        } else if(isAndroid){
            window['DejaJsClient']['addFireBaseDILog'](JSON.stringify(dic))
        }
        else {
            //
        }
    } catch(err) {
        console.log('The native context does not exist yet');
    }
};

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <App />
        </ScrollToTop>
    </HashRouter>
, document.getElementById('root'))
registerServiceWorker();
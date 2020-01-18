'use strict';

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store/index';
import DejaRNLoading from './common/DejaRNLoading'
import Root from './root';

let config = configureStore();

// App.js 入口文件（store在这里），为什么我要把store定义在这里？ 因为它是唯一的，
// 而且必须使用react-redux提供的Provider组件包裹入口的其他组件才能使redux中的store生效。

const App = () => {
    return (
        <Provider store={config.store}>
            <Root/>
            <DejaRNLoading
                ref={(ref) => {
                    global.mLoadingComponentRef = ref;
                }}
            />
        </Provider>
    );
};

export default App;

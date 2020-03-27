import React from 'react'
import ReactDom from 'react-dom'
import moment from 'moment'
import 'moment-timezone'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import App from '@/commons/app'

moment.locale('zh-cn') // default moment locale

// 初始化App对象
App.init()

// Render
const Main = require('@/pages/main').default

const AppRoot = () => (
    <React.StrictMode>
        <Provider store={App.store}>
            <LocaleProvider locale={zhCN}>
                <ConnectedRouter history={App.history}>
                    <Main />
                </ConnectedRouter>
            </LocaleProvider>
        </Provider>
    </React.StrictMode>
)

// Render

const rootEl = document.getElementById('app')
ReactDom.render(<AppRoot />, rootEl)

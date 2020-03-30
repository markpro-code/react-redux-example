import { hot } from 'react-hot-loader/root'
import { Route, Switch, Redirect } from 'react-router-dom'
import React from 'react'
import { withRouter } from 'react-router'

import PageHome from '@/pages/home'
import PageLogin from '@/pages/login'

import style from './index.less'


class Main extends React.Component {
    componentDidMount() {
        //
    }

    render() {
        return (
            <div className={style.main_page}>
                <div className={style.main_content}>
                    <Switch>
                        <Route path="/login" component={PageLogin} />
                        <Route>
                            <Switch>
                                <Route path="/home" component={PageHome} />
                            </Switch>
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }
}


export default hot(withRouter(Main))

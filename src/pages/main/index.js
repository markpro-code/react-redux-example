import { hot } from 'react-hot-loader/root'
import { Route, Switch, Link } from 'react-router-dom'
import React from 'react'
import { withRouter, matchPath } from 'react-router'

import { Layout, Menu } from 'antd'
import { DesktopOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'

import PageHome from '@/pages/home'
import PageLogin from '@/pages/login'
import PageExample from '@/pages/page-example'

import { find } from 'lodash'
import css from './index.less'

const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const navPath = {
    HOME: '/home',
    LOGIN: '/login',
    EXAMPLE: '/page-example',
    SUB_PAGE: '/sub-page',
}

function getCurrentMenuKey() {
    const result = find(Object.values(navPath), p => matchPath(window.location.pathname, { path: p }) != null)
    console.info(`match path ${result}`)
    return result
}


class Main extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            collapsed: false,
        }
    }

    componentDidMount() {
        //
    }

    onCollapse = collapsed => {
        this.setState({ collapsed })
    };

    render() {
        return (
            <div className={css.page_root}>
                <Switch>
                    <Route path="/login" component={PageLogin} />
                    <Route>
                        <Layout className={css.main_page}>
                            <Sider
                                theme="light"
                                collapsible={true}
                                collapsed={this.state.collapsed}
                                onCollapse={this.onCollapse}
                            >
                                <div className={css.logo}>
                                    <h3>LOGO</h3>
                                </div>
                                <Menu mode="inline" selectedKeys={[getCurrentMenuKey()]} className={css.sider_menu}>
                                    <Menu.Item key={navPath.HOME}>
                                        <HomeOutlined />
                                        <span><Link to={navPath.HOME}>Home</Link></span>
                                    </Menu.Item>
                                    <Menu.Item key={navPath.EXAMPLE}>
                                        <DesktopOutlined />
                                        <span><Link to={navPath.EXAMPLE}>example</Link></span>
                                    </Menu.Item>
                                    <SubMenu
                                        key="sub1"
                                        title={<span><UserOutlined /><span>User</span></span>}
                                    >
                                        <Menu.Item key={navPath.SUB_PAGE}>
                                            <DesktopOutlined />
                                            <span><Link to={navPath.SUB_PAGE}>sub page</Link></span>
                                        </Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Layout className="site-layout">
                                <Header className={css.page_header} />
                                <Content style={{ margin: '0 16px' }}>
                                    <Switch>
                                        <Route path={navPath.HOME} component={PageHome} />
                                        <Route path={navPath.EXAMPLE} component={PageExample} />

                                    </Switch>
                                </Content>
                                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                            </Layout>
                        </Layout>
                    </Route>
                </Switch>
            </div>
        )
    }
}


export default hot(withRouter(Main))

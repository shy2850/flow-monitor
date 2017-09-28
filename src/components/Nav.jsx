import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap'

const {
    Header, Brand, Toggle, Collapse
} = Navbar
const MENUS = [
    {title: '系统状态', to: '/', parent: true},
    {title: '运行状态', to: '/'},
    {title: '硬件信息', to: '/os/info'},
    {title: '硬件状态', to: '/os/run'},
    {title: '系统设置', to: '/cfg/base', parent: true},
    {title: '基础配置', to: '/cfg/base'},
    {title: '运行配置', to: '/cfg/run'},
    {title: '维护配置', to: '/cfg/op'},
]

const BaseNav = class extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    NavItemWithRouter = ({title, to, parent}) => {
        const { history, location: {pathname} } = this.props
        const active = pathname === to ? 'active' : ''
        const indent = parent ? 'parent' : ''
        return <NavItem
            onClick={e => history.push(to)}
            className={`${active} ${indent}`} >
            {title}
        </NavItem>
    }
    render () {
        const { NavItemWithRouter } = this
        return <Navbar collapseOnSelect className="navbar-static-top">
            <Header>
                <Brand><Link to="/">Flow++</Link></Brand>
                <Toggle data-toggle="collapse" data-target=".bs-navbar-collapse"/>
            </Header>
            <div className="hidden-sm hidden-md hidden-lg">
                <div className="nav collapse navbar-collapse bs-navbar-collapse" role="navigation">
                    {MENUS.map((menu, i) => <NavItemWithRouter {...menu} key={`${i}`}/>)}
                </div>
            </div>
        </Navbar>
    }
}


export const Top = withRouter(BaseNav)
export const Left = withRouter(class extends BaseNav {
    render () {
        const { NavItemWithRouter } = this
        return <Navbar className="hidden-xs">
            <div className="nav">
                {MENUS.map((menu, i) => <NavItemWithRouter {...menu} key={`${i}`}/>)}
            </div>
        </Navbar>
    }
})

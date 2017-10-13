import React from 'react'
import { Panel, Row, Col, Glyphicon } from 'react-bootstrap'
export default class extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open: true
        }
    }
    toggle = () => {
        const { open } = this.state
        this.setState({
            open: !open
        })
    }
    render () {
        const {
            open
        } = this.state
        const {
            children,
            header,
            className = '',
            ...props
        } = this.props
        const realHeader = <Row>
            <Col xs={8}>{header}</Col>
            <Col xs={4} className="text-right">
                <Glyphicon glyph={open ? 'chevron-up' : 'chevron-down'} onClick={this.toggle}/>
            </Col>
        </Row>
        const classList = ['collapse-panel'].concat(className.match(/\S+/g))
        return <Panel header={realHeader} {...props} className={classList.join(' ')}>
            {open && children}
        </Panel>
    }
}
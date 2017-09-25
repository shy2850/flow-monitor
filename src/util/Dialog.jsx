import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button } from 'react-bootstrap'

class Dialog extends Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false
        }
    }
    componentWillReceiveProps ({visible}) {
        this.setState({
            visible
        })
    }
    close = (ensure) => {
        const {onClose} = this.props
        if (onClose && onClose(ensure) === false) {
            return
        }
        this.setState({
            visible: false
        })
    };
    render () {
        const {visible} = this.state
        const {
            info,
            title = '警告'
        } = this.props

        return <Modal show={visible} onHide={this.close}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {info}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.close}>确定</Button>
            </Modal.Footer>
        </Modal>
    }
}

const holder = document.createElement('div')
document.body.appendChild(holder)
ReactDOM.render(<Dialog/>, holder)

export const alert = (msg, options) => {
    const info = <div className="text-center">{msg}</div>
    ReactDOM.render(<Dialog info={info} visible {...options}/>, holder)
}

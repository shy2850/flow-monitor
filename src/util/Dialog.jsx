import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Modal, Button } from 'react-bootstrap'
import Promise from '../util/Promise'
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
    close = (ensure, index) => {
        const {
            resolve,
            reject
        } = this.props
        const result = ensure ? resolve(index) : reject(index)
        if (result === false) {
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
            title,
            buttons = ['确定']
        } = this.props

        return <Modal show={visible} onHide={this.close} backdrop="static">
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {info}
            </Modal.Body>
            <Modal.Footer>
                {buttons.map((bt, i) => <Button key={`${i}`} onClick={() => this.close(!i, i)}>{bt}</Button>)}
            </Modal.Footer>
        </Modal>
    }
}

const holder = document.createElement('div')
document.body.appendChild(holder)

const dialog = (info, options) => new Promise((resolve, reject) => {
    const {
        title = '提示'
    } = options || {}
    ReactDOM.render(<Dialog title={title} info={info} visible resolve={resolve} reject={reject} {...options}/>, holder)
})
export const alert = (msg, options) => dialog(<div className="text-center">{msg}</div>, options)

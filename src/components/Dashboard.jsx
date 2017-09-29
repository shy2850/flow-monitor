import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import RuntimeCPU from '../containers/os/RuntimeCPU'
import RuntimeMem from '../containers/os/RuntimeMem'
import RuntimeDISK from '../containers/os/RuntimeDISK'

export default () => <Row>
    <Col md={6}><RuntimeCPU /></Col>
    <Col md={6}><RuntimeMem /></Col>
    <Col md={6}><RuntimeDISK /></Col>
</Row>

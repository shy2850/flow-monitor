import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Panel } from 'react-bootstrap'
import RuntimeCPU from '../containers/os/RuntimeCPU'
import RuntimeMem from '../containers/os/RuntimeMem'
import RuntimeDISK from '../containers/os/RuntimeDISK'
import RuntimeNet from '../containers/os/RuntimeNet'

export default () => <Row>
    <Col md={12}><Panel><RuntimeCPU /></Panel></Col>
    <Col md={12}><RuntimeNet /></Col>
    <Col md={6}><Panel><RuntimeMem /></Panel></Col>
    <Col md={6}><Panel><RuntimeDISK /></Panel></Col>
</Row>

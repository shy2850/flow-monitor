import React from 'react'
import { Table, Row, Col, Panel } from 'react-bootstrap'
import Line from '../charts/Line'
import SnapTable from '../table/SnapTable'

const COLUMNS = {
    base: [
        'bit_per_second',
        'packet_per_second',
        'drop_bytes',
        'drop_packets',
        'current_packet_buffer_size',
        'peek_packet_buffer_size',
        'session_alloc',
        'session_free',
        'current_session_num',
        'peek_session_num'
    ],
    tcp: [
        'tcp_bytes',
        'tcp_packets',
        'tcp_session_alloc',
        'tcp_session_free',
        'current_tcp_session_num',
        'peek_tcp_session_num',
        'tcp_out_of_order_alloc',
        'tcp_out_of_order_free',
        'current_tcp_out_of_order_num',
        'peek_tcp_out_of_order_num'
    ],
    udp: [
        'udp_bytes',
        'udp_packets',
        'udp_session_alloc',
        'udp_session_free',
        'current_udp_session_num',
        'peek_udp_session_num'
    ],
    icmp: [
        'icmp_bytes',
        'icmp_packets'
    ],
    http: [
        'http_bytes',
        'http_packets',
        'http_session_alloc',
        'http_session_free',
        'current_http_session_num',
        'peek_http_session_num'
    ],
    ssl: [
        'ssl_bytes',
        'ssl_packets',
        'ssl_session_alloc',
        'ssl_session_free',
        'current_ssl_session_num',
        'peek_ssl_session_num'
    ],
    dns: [
        'dns_bytes',
        'dns_packets',
        'dns_session_alloc',
        'dns_session_free',
        'current_dns_session_num',
        'peek_dns_session_num'
    ]

}

export default ({worker = [], current = {}, top = {}}) => {
    let current_packet_buffer_size = []
    let current_session_num = []
    let current_tcp_session_num = []
    let current_tcp_out_of_order_num = []
    let current_udp_session_num = []
    let current_http_session_num = []
    let current_ssl_session_num = []
    let current_dns_session_num = []
    worker.map((v, i) => {
        let n = (101 + i).toString().slice(-2)
        current_packet_buffer_size.push({name: `线程${n}`, data: current.current_packet_buffer_size[i]})
        current_session_num.push({name: `线程${n}`, data: current.current_session_num[i]})
        current_tcp_session_num.push({name: `线程${n}`, data: current.current_tcp_session_num[i]})
        current_tcp_out_of_order_num.push({name: `线程${n}`, data: current.current_tcp_out_of_order_num[i]})
        current_udp_session_num.push({name: `线程${n}`, data: current.current_udp_session_num[i]})
        current_http_session_num.push({name: `线程${n}`, data: current.current_http_session_num[i]})
        current_ssl_session_num.push({name: `线程${n}`, data: current.current_ssl_session_num[i]})
        current_dns_session_num.push({name: `线程${n}`, data: current.current_dns_session_num[i]})
    })
    return <div>
        <Panel>
            <SnapTable data={worker} columns={COLUMNS.base} getSum={(arr, column) => top[column]}/>
            <Row>
                <Col md={6}>
                    <Line title="缓冲区条目数" series={current_packet_buffer_size} height={200} />
                </Col>
                <Col md={6}>
                    <Line title="当前会话数" series={current_session_num} height={200} />
                </Col>
            </Row>
        </Panel>
        <Panel>
            <SnapTable data={worker} columns={COLUMNS.tcp} getSum={(arr, column) => top[column]}/>
            <Row>
                <Col md={6}>
                    <Line title="TCP会话数" series={current_tcp_session_num} height={200} />
                </Col>
                <Col md={6}>
                    <Line title="TCP乱序数" series={current_tcp_out_of_order_num} height={200} />
                </Col>
            </Row>
            <SnapTable data={worker} columns={COLUMNS.udp} getSum={(arr, column) => top[column]}/>
            <Line title="UDP会话数" series={current_udp_session_num} height={200} />
        </Panel>
        <Panel>
            <SnapTable data={worker} columns={COLUMNS.icmp} getSum={(arr, column) => top[column]}/>
        </Panel>
        <Panel>
            <SnapTable data={worker} columns={COLUMNS.http.concat(COLUMNS.ssl)} getSum={(arr, column) => top[column]}/>
            <Row>
                <Col md={6}>
                    <Line title="HTTP会话数" series={current_http_session_num} height={200} />
                </Col>
                <Col md={6}>
                    <Line title="SSL会话数" series={current_ssl_session_num} height={200} />
                </Col>
            </Row>
        </Panel>
        <Panel>
            <SnapTable data={worker} columns={COLUMNS.dns} getSum={(arr, column) => top[column]}/>
            <Line title="DNS会话数" series={current_dns_session_num} height={200} />
        </Panel>
    </div>
}

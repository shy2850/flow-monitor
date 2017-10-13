import React from 'react'
import { Table, Row, Col, Panel } from 'react-bootstrap'
import { toHex } from '../../util/Number'
import Line from '../charts/Line'
import SnapTable from '../table/SnapTable'

const reduceCurrent = (arr = []) => arr.reduce((base, item) => {
    if (base.length) {
        const last = base[base.length - 1]
        base[base.length - 1] = last - item
    }
    if (base.length !== arr.length - 1) {
        base.push(item)
    }
    return base
}, [])
export default ({nic = [], current = {}}) => {
    let recv_bytes = []
    let recv_packets = []
    let send_bytes = []
    let send_packets = []

    nic.map((v, i) => {
        let n = (101 + i).toString().slice(-2)
        recv_bytes.push({name: `nic ${n}`, data: reduceCurrent(current.recv_bytes[i])})
        recv_packets.push({name: `nic ${n}`, data: reduceCurrent(current.recv_packets[i])})
        send_bytes.push({name: `nic ${n}`, data: reduceCurrent(current.send_bytes[i])})
        send_packets.push({name: `nic ${n}`, data: reduceCurrent(current.send_packets[i])})
    })
    return <Panel header="各网卡汇总信息">
        <SnapTable name="网卡" data={nic} columns={['send_bytes', 'recv_bytes', 'send_packets', 'recv_packets', 'error_packets', 'drop_packets']}/>
        <Row>
            <Col md={6}>
                <Line title="发送流量 (mbps)" series={send_bytes} height={200} />
                <Line title="接收流量 (mbps)" series={recv_bytes} legend={[]} height={200}/>
            </Col>
            <Col md={6}>
                <Line title="发送网包 (kpps)" series={send_packets} height={200} />
                <Line title="接收网包 (kpps)" series={recv_packets} legend={[]} height={200} />
            </Col>
        </Row>
    </Panel>
}

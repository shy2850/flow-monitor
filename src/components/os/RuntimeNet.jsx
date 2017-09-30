import React from 'react'
import { Table, Row, Col, Panel } from 'react-bootstrap'
import { toStorage, toHex } from '../../util/Number'
import Line from '../charts/Line'

const SnapTable = ({nets = []}) => <Table striped bordered condensed hover>
    <thead>
        <tr>
            <th>接口\信息</th>
            <th>发送字节数</th>
            <th>接收字节数</th>
            <th>发送正确网包数</th>
            <th>发送错误网包数</th>
            <th>发送丢弃网包数</th>
            <th>接收正确网包数</th>
            <th>接收错误网包数</th>
            <th>接收丢弃网包数</th>
            <th>单位包字节数</th>
        </tr>
    </thead>
    <tbody>
        {nets.map(({name, bytes, packets, errs, drop}) => <tr>
            <td>{name}</td>
            <td>{toStorage(bytes.transmit)}</td>
            <td>{toStorage(bytes.receive)}</td>
            <td className={packets.transmit ? '' : 'text-danger'}>{toHex(packets.transmit)}</td>
            <td className={errs.transmit ? '' : 'text-danger'}>{toHex(errs.transmit)}</td>
            <td className={drop.transmit ? '' : 'text-danger'}>{toHex(drop.transmit)}</td>
            <td>{toHex(packets.receive)}</td>
            <td className={errs.receive ? '' : 'text-danger'}>{toHex(errs.receive)}</td>
            <td className={drop.receive ? '' : 'text-danger'}>{toHex(drop.receive)}</td>
            <td>{bytes.receive / packets.receive}</td>
        </tr>)}
    </tbody>
</Table>

export default ({net = {}}) => {
    let rbps = []
    let tbps = []
    let rpps = []
    let tpps = []
    let nets = []

    Object.keys(net).map(name => {
        rbps.push({name, data: net[name]._runtime.rbps})
        tbps.push({name, data: net[name]._runtime.tbps})
        rpps.push({name, data: net[name]._runtime.rpps})
        tpps.push({name, data: net[name]._runtime.tpps})
        nets.push({name, ...net[name]})
    })
    return <Panel>
        <SnapTable nets={nets}/>
        <Row>
            <Col md={6}>
                <Line title="发送流量 (mbps)" series={tbps} height={200} />
                <Line title="接收流量 (mbps)" series={rbps} legend={[]} height={200}/>
            </Col>
            <Col md={6}>
                <Line title="发送网包 (pps)" series={tpps} height={200} />
                <Line title="接收网包 (pps)" series={rpps} legend={[]} height={200} />
            </Col>
        </Row>
    </Panel>
}

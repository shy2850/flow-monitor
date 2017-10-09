import React from 'react'
import { Table, Row, Col, Panel } from 'react-bootstrap'
import { toStorage, toHex } from '../../util/Number'
import Line from '../charts/Line'

const SnapTable = ({nets = []}) => {
    let sum_bt = 0
    let sum_br = 0
    let sum_pt = 0
    let sum_pr = 0
    let sum_et = 0
    let sum_er = 0
    let sum_dt = 0
    let sum_dr = 0
    return <Table striped bordered condensed hover>
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
            {nets.map(({name, bytes, packets, errs, drop}) => {
                let bt = bytes.transmit
                let br = bytes.receive
                let pt = packets.transmit
                let pr = packets.receive
                let et = errs.transmit
                let er = errs.receive
                let dt = drop.transmit
                let dr = drop.receive

                sum_bt += Number(bt) || 0
                sum_br += Number(br) || 0
                sum_pt += Number(pt) || 0
                sum_pr += Number(pr) || 0
                sum_et += Number(et) || 0
                sum_er += Number(er) || 0
                sum_dt += Number(dt) || 0
                sum_dr += Number(dr) || 0                
                return <tr>
                    <td>{name}</td>
                    <td>{toStorage(bt)}</td>
                    <td>{toStorage(br)}</td>
                    <td className={pt ? '' : 'text-danger'}>{toHex(pt)}</td>
                    <td className={et ? '' : 'text-danger'}>{toHex(et)}</td>
                    <td className={dt ? '' : 'text-danger'}>{toHex(dt)}</td>
                    <td>{toHex(pr)}</td>
                    <td className={er ? '' : 'text-danger'}>{toHex(er)}</td>
                    <td className={dr ? '' : 'text-danger'}>{toHex(dr)}</td>
                    <td>{br / pr}</td>
                </tr>
            })}
            <tr>
                <td>汇总</td>
                <td>{toStorage(sum_bt)}</td>
                <td>{toStorage(sum_br)}</td>
                <td className={sum_pt ? '' : 'text-danger'}>{toHex(sum_pt)}</td>
                <td className={sum_et ? '' : 'text-danger'}>{toHex(sum_et)}</td>
                <td className={sum_dt ? '' : 'text-danger'}>{toHex(sum_dt)}</td>
                <td>{toHex(sum_pr)}</td>
                <td className={sum_er ? '' : 'text-danger'}>{toHex(sum_er)}</td>
                <td className={sum_dr ? '' : 'text-danger'}>{toHex(sum_dr)}</td>
                <td>{sum_br / sum_pr}</td>
            </tr>
        </tbody>
    </Table>
}

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

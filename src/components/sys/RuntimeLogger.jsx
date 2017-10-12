import React from 'react'
import { Table, Row, Col, Panel } from 'react-bootstrap'
import Line from '../charts/Line'
import SnapTable from '../table/SnapTable'

const COLUMNS = {
    logger: [
        'reconnect_num',
        'current_message_queue_size',
        'peek_message_queue_size',
        'report_messages',
        'report_bytes',
        'drop_messages',
        'drop_bytes'
    ],
    act: [
        'id',
        'report_messages',
        'report_bytes',
        'drop_messages',
        'drop_bytes'
    ]
}

export default ({logger = [], app = [], current = {}, top = {}}) => {
    let current_message_queue_size = []
    logger.map((v, i) => {
        let n = (101 + i).toString().slice(-2)
        current_message_queue_size.push({name: `线程${n}`, data: current.current_message_queue_size[i]})
    })
    return <div>
        <Panel header="Logger信息统计">
            <SnapTable data={logger} columns={COLUMNS.logger} getSum={(arr, column) => top[column]}/>
            <Line title="消息队列数" series={current_message_queue_size} height={200} />
        </Panel>
        <Panel header="APP行为统计">
            {app.map(({id, actions}) => <SnapTable key={`${id}`} data={actions} columns={COLUMNS.act} noItem getSum={(arr, column) => {
                if (column === 'id') {
                    return '汇总'
                }
            }}/>)}
        </Panel>
    </div>
}

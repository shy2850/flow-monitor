import React from 'react'
import { Table } from 'react-bootstrap'
import I18N from '../../util/I18N'
import { toHex } from '../../util/Number'

const GET_SUM = (arr = []) => arr.reduce((sum, n) => sum + n, 0)
export default ({
    noItem = false,
    columns = [],
    data = [],
    withSum = true,
    name = '',
    getSum = GET_SUM
}) => {
    let sum = {}
    return <Table striped bordered condensed hover>
        <thead>
            <tr>
                {!noItem && <th>序号</th>}
                {columns.map((c, i) => <th key={`${i}`}>{I18N(c)}</th>)}
            </tr>
        </thead>
        <tbody>
            {data.map((d, i) => <tr key={`${i}`}>
                {!noItem && <td>{name + ' ' + (i + 1)}</td>}
                {columns.map((c, index) => {
                    if (withSum) {
                        sum[c] = [d[c]].concat(sum[c] || [])
                    }
                    return <td key={`${index}`}>{toHex(d[c])}</td>
                })}
            </tr>)}
            {withSum && <tr>
                {!noItem && <td>汇总</td>}
                {columns.map((c, index) => <td key={`${index}`}>{toHex(getSum(sum[c], c) || GET_SUM(sum[c]))}</td>)}
            </tr>}
        </tbody>
    </Table>
}

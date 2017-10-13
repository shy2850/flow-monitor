import React from 'react'
import { Row, Col, InputGroup, Panel, FormControl } from 'react-bootstrap'
import CollapsePanel from './widget/Panel'
import { toStorage } from '../util/Number'

const Processor = ({processors}) => <CollapsePanel header={`CPU (${processors.length})`}>
    {processors.map((p, i) => <Col lg={3} md={4} sm={6} key={`${i}`}>
        <Panel>
            <p title={p.version}>{p.version}</p>
            <p>
                <small>内核: {p.cores || 1}</small>
            </p>
            {p.caches && p.caches.length && <p>
                缓存: {p.caches.map(toStorage).join(',')}
            </p>}
        </Panel>
    </Col>)}
</CollapsePanel>

const Memory = ({memories}) => <CollapsePanel header={`内存 (${memories.length})`}>
    {memories.filter(m => m.size).map((m, i) => <Col lg={3} md={4} sm={6} key={`${i}`}>
        <Panel>
            <p>{toStorage(m.size)}</p>
            <p title={m.description}>{m.description}</p>
        </Panel>
    </Col>)}
</CollapsePanel>

const Disk = ({disks}) => <CollapsePanel header={`硬盘 (${disks.length})`}>
    {disks.map((d, i) => <Col lg={3} md={4} sm={6} key={`${i}`}>
        <Panel>
            <p>{toStorage(d.size)}</p>
            <p title={d.product}>{`${d.description || ''} [${d.product || 'Unknown Product'}]`}</p>
        </Panel>
    </Col>)}
</CollapsePanel>

const Network = ({nets}) => {
    return <CollapsePanel header={`网络接口 (${nets.length})`}>
        {nets.map((n, i) => <Col lg={3} md={4} sm={6} key={`${i}`}>
            <Panel>
                <p>{n.id} [{n.family}]</p>
                <p>MAC: {n.mac}</p>
                <p title={n.product}>{n.product} &nbsp;</p>
                <p title={`${n.address}/${n.netmask}`}>地址/网关: {n.address}/{n.netmask}</p>
            </Panel>
        </Col>)}
    </CollapsePanel>
}

const Gfx = ({gfxes}) => <CollapsePanel header={`显卡 (${gfxes.length})`}>
    {gfxes.map((g, i) => <Col lg={3} md={4} sm={6} key={`${i}`}>
        <Panel>
            <p>{g.product} {g.description}</p>
        </Panel>
    </Col>)}
</CollapsePanel>

export default ({
    id,
    processors,
    memories,
    disks,
    nets,
    gfxes
}) => processors ? <div className="card-panel-holder">
    <Processor processors={processors}/>
    <Memory memories={memories}/>
    <Disk disks={disks}/>
    <Network nets={nets}/>
    <Gfx gfxes={gfxes}/>
</div> : <div/>

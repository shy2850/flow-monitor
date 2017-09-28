import React from 'react'
import { Link } from 'react-router-dom'
import { Panel, PanelGroup } from 'react-bootstrap'
import RuntimeCPU from '../containers/os/RuntimeCPU'

export default () => <PanelGroup>
    <Panel>
        <RuntimeCPU />
    </Panel>
</PanelGroup>

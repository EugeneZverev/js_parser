import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Grid from '@material-ui/core/Grid'
import CodeBlocksTable from './CodeBlocksTable/CodeBlocksTable'
import ViewTabPanel from './ViewTabPanel/ViewTabPanel'
import CodeComponentView from './CodeComponentView/CodeComponentView'
import useTabStyles from './ViewTabsStyles'
import { getComponentBodyBetween, getComponentByName } from '../../../scripts/generalScripts'

const ViewTabs = props => {
    const [tabValue, setTabValue] = useState(0)
    const [selectedComponentBody, setSelectedComponentBody] = useState(null)

    const handleTabChange = (event, newValue) => setTabValue(newValue)

    useEffect(() => {
        const component = getComponentByName(components, props.selectedComponent)

        if (component) {
            const currentComponentBody = getComponentBodyBetween(props.code, component.begin, component.end)
            setSelectedComponentBody(currentComponentBody)
        }
    }, [props.selectedComponent])

    let components
    if (props.description === 'source') components = props.components
    else if (props.description === 'base') components = props.components

    const tabClasses = useTabStyles()

    return (
        <Grid item xs>
            <Paper className={tabClasses.root}>
                <ViewTabPanel value={tabValue} index={0}>
                    <CodeBlocksTable description={props.description} components={components} handleRowClick={props.handleSelectComponent} selected={props.selectedComponent} />
                </ViewTabPanel>
                <ViewTabPanel value={tabValue} index={1}>
                    <CodeComponentView componentBody={selectedComponentBody} />
                </ViewTabPanel>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    className={tabClasses.tab}
                    centered
                >
                    <Tab label="Code components" />
                    {props.selectedComponent 
                        ? <Tab label="Current component" /> 
                        : <Tab label="Current component" disabled />
                    }
                    
                </Tabs>
            </Paper>
        </Grid>
    )
}

export default ViewTabs
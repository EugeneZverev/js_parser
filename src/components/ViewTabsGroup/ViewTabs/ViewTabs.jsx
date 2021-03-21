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
import { connect } from 'react-redux'
import { selectSourceComponent, selectBaseComponent } from './../../../redux/actions'

const ViewTabs = props => {
    const [tabValue, setTabValue] = useState(0)
    const [selectedComponentBody, setSelectedComponentBody] = useState(null)

    let code, selectedComponent, handleSelectComponent

    if (props.description === 'source') {
        code = props.sourceCode
        selectedComponent = props.selectedSourceComponent
        handleSelectComponent = props.selectSourceComponent
    } else if (props.description === 'base') {
        code = props.baseCode
        selectedComponent = props.selectedBaseComponent
        handleSelectComponent = props.selectBaseComponent
    }

    const handleTabChange = (event, newValue) => setTabValue(newValue)

    useEffect(() => {
        const component = getComponentByName(props.components, selectedComponent)

        if (component) {
            const currentComponentBody = getComponentBodyBetween(code, component.begin, component.end)
            setSelectedComponentBody(currentComponentBody)
        }
    }, [selectedComponent])

    const tabClasses = useTabStyles()

    return (
        <Grid item xs>
            <Paper className={tabClasses.root}>
                <ViewTabPanel value={tabValue} index={0}>
                    <CodeBlocksTable description={props.description} components={props.components} handleRowClick={handleSelectComponent} selected={selectedComponent} />
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
                    {selectedComponent 
                        ? <Tab label="Current component" /> 
                        : <Tab label="Current component" disabled />
                    }
                    
                </Tabs>
            </Paper>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        sourceCode: state.code.sourceCode,
        baseCode: state.code.baseCode,
        selectedBaseComponent: state.code.selectedBaseComponent,
        selectedSourceComponent: state.code.selectedSourceComponent
    }
}
const mapDispatchToProps = {
    selectSourceComponent, 
    selectBaseComponent   
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTabs) 
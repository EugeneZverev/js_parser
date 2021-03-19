import React from 'react'
import Grid from '@material-ui/core/Grid'
import ViewTabs from './ViewTabs/ViewTabs'

const ViewTabsGroup = props => {
    return (
        <Grid
            container
            className={props.classes}
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={1}
        >
            <ViewTabs 
                description='source' 
                code={props.sourceCode} 
                components={props.sourceComponents}
                selectedComponent={props.selectedSourceComponent}
                handleSelectComponent={props.selectSourceComponentHandler}
            />
            <ViewTabs 
                description='base' 
                code={props.baseCode} 
                components={props.baseComponents}
                selectedComponent={props.selectedBaseComponent}
                handleSelectComponent={props.selectBaseComponentHandler}
            />
        </Grid>
    )
}

export default ViewTabsGroup
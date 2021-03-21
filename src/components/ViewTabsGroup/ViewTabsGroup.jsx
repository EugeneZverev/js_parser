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
            <ViewTabs description='source' components={props.sourceComponents} />
            <ViewTabs description='base' components={props.baseComponents} />
        </Grid>
    )
}

export default ViewTabsGroup
import React from 'react'
import Button from '@material-ui/core/Button/Button'
import Grid from '@material-ui/core/Grid/Grid'
import { connect } from 'react-redux'

const ComponentReplaceButton = props => {

    return (
        <Grid container className={props.classes} direction="row" justify="center" alignItems="center" spacing={1}>
            <Grid item>{props.selectedSourceComponent}</Grid>
            <Grid item>
                <Button  variant="outlined" color="primary" onClick={props.onClick}>
                    Replace to
                </Button>
            </Grid>
            <Grid item>{props.selectedBaseComponent}</Grid>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        selectedBaseComponent: state.code.selectedBaseComponent,
        selectedSourceComponent: state.code.selectedSourceComponent
    }
}

export default connect(mapStateToProps, null)(ComponentReplaceButton) 
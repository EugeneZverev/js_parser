import React from 'react'
import Grid from '@material-ui/core/Grid'
import FileUploadButton from './FileUploadButton/FileUploadButton'

const FileUploadButtonsGroup = props => { 
    return (
        <Grid
            container
            className={props.classes}
            direction="column"
            justify="center"
            alignItems="center"
            spacing={1}
        >
            <FileUploadButton id='source' onChange={props.onChange('source')} />
            <FileUploadButton id='base' onChange={props.onChange('base')} />
        </Grid>
    )
}

export default FileUploadButtonsGroup
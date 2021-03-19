import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import useButtonStyles from './FileUploadButtonStyles'

const FileUploadButton = props => {
    const buttonClasses = useButtonStyles()

    return (
        <Grid item>
            <input
                accept=".js"
                className={buttonClasses.input}
                id={`contained-button-file-${props.id}`}
                type="file"
                onChange={props.onChange}
            />
            <label htmlFor={`contained-button-file-${props.id}`}>
                <Button variant="outlined" color="primary" component="span">
                    {`Upload ${props.id} file`} 
                </Button>
            </label>
        </Grid>
    )
}

export default FileUploadButton
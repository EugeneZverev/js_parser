import { makeStyles } from '@material-ui/core/styles'

const useButtonStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}))

export default useButtonStyles
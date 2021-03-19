import React from 'react' 

const ViewTabPanel = props => {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            style={{height: '400px'}}
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    )
}

export default ViewTabPanel
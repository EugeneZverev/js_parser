import React from 'react'
import Box from '@material-ui/core/Box'
import FileUploadButtonsGroup from './FileUploadButtonsGroup/FileUploadButtonsGroup'
import ViewTabsGroup from './ViewTabsGroup/ViewTabsGroup'
import { useGridStyles } from './AppStyles'
import ComponentReplaceButton from './ComponentReplaceButton/ComponentReplaceButton'
import { getComponentByName, getUniqueComponents, getComponentBodyBetween } from './../scripts/generalScripts'
import { findAllFunctionDeclarationsIn } from './../scripts/JSCodeParser'
import { connect } from 'react-redux'
import { changeSourceCode, changeBaseCode, selectSourceComponent, selectBaseComponent } from './../redux/actions'

const App = props => {
    const sourceComponents = findAllFunctionDeclarationsIn(props.sourceCode)
    const sourceComponent = getComponentByName(sourceComponents, props.selectedSourceComponent)
    let baseComponents = findAllFunctionDeclarationsIn(props.baseCode)

    if (sourceComponents.length !== 0) {
        if (sourceComponent) baseComponents = getUniqueComponents([sourceComponent], baseComponents)
        else baseComponents = getUniqueComponents(sourceComponents, baseComponents)
    }
    const baseComponent = getComponentByName(baseComponents, props.selectedBaseComponent)

    const fileUploadHandler = source => {
        return event => {
            const fileReader = new FileReader()
            const file = event.target.files[0]

            if (file) {
                fileReader.readAsText(file, 'utf-8')
                fileReader.onload = () => {
                    const code = fileReader.result

                    if (source === 'source') props.changeSourceCode(code)
                    else if (source === 'base') props.changeBaseCode(code)
                }
            }
        }
    }

    const replaceButtonClickHandler = () => {
        if (props.selectedSourceComponent && props.selectedBaseComponent) {
            const sourceComponentBegin = sourceComponent.begin
            const sourceComponentEnd = sourceComponent.end
            const deletedLength = sourceComponentEnd - sourceComponentBegin + 1
            const baseComponentBegin = baseComponent.begin
            const baseComponentEnd = baseComponent.end

            const baseComponentCode = getComponentBodyBetween(props.baseCode, baseComponentBegin, baseComponentEnd)

            let resultCode = Array.from(props.sourceCode.slice())
            resultCode.splice(sourceComponentBegin, deletedLength, baseComponentCode)
            resultCode = resultCode.join('')

            let link = document.createElement('a')
            link.download = 'result.js'

            let blob = new Blob(Array.from(resultCode), { type: 'text/javascript' })

            let reader = new FileReader()
            reader.readAsDataURL(blob)

            reader.onload = () => {
                link.href = reader.result
                link.click()
            }
        }
    }

    const gridClasses = useGridStyles()

    return (
        <Box>
            <FileUploadButtonsGroup classes={gridClasses.root} onChange={fileUploadHandler} />
            <ViewTabsGroup
                classes={gridClasses.root}
                sourceComponents={sourceComponents}
                baseComponents={baseComponents}
            />
            <ComponentReplaceButton classes={gridClasses.replaceButton} onClick={replaceButtonClickHandler} />
        </Box>
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
    changeSourceCode,
    changeBaseCode, 
    selectSourceComponent, 
    selectBaseComponent
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
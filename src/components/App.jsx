import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import FileUploadButtonsGroup from './FileUploadButtonsGroup/FileUploadButtonsGroup'
import ViewTabsGroup from './ViewTabsGroup/ViewTabsGroup'
import { useGridStyles } from './AppStyles'
import ComponentReplaceButton from './ComponentReplaceButton/ComponentReplaceButton'
import { getComponentByName, getUniqueComponents, getComponentBodyBetween } from './../scripts/generalScripts'
import { findAllFunctionDeclarationsIn } from './../scripts/JSCodeParser'

const App = () => {
    const [sourceCode, setSourceCode] = useState('')
    const [baseCode, setBaseCode] = useState('')
    const [selectedSourceComponent, setSelectedSourceComponent] = useState(null)
    const [selectedBaseComponent, setSelectedBaseComponent] = useState(null)

    const sourceComponents = findAllFunctionDeclarationsIn(sourceCode)
    const sourceComponent = getComponentByName(sourceComponents, selectedSourceComponent)
    let baseComponents = findAllFunctionDeclarationsIn(baseCode)

    if (sourceComponents.length !== 0) {
        if (sourceComponent) baseComponents = getUniqueComponents([sourceComponent], baseComponents)
        else baseComponents = getUniqueComponents(sourceComponents, baseComponents)
    }
    const baseComponent = getComponentByName(baseComponents, selectedBaseComponent)

    const fileUploadHandler = source => {
        return event => {
            const fileReader = new FileReader()
            const file = event.target.files[0]

            if (file) {
                fileReader.readAsText(file, 'utf-8')
                fileReader.onload = () => {
                    const code = fileReader.result

                    if (source === 'source') setSourceCode(code)
                    else if (source === 'base') setBaseCode(code)
                }
            }
        }
    }
    const selectSourceComponentHandler = name => setSelectedSourceComponent(name)
    const selectBaseComponentHandler = name => setSelectedBaseComponent(name)
    const replaceButtonClickHandler = () => {
        if (selectedSourceComponent && selectedBaseComponent) {
            const sourceComponentBegin = sourceComponent.begin
            const sourceComponentEnd = sourceComponent.end
            const deletedLength = sourceComponentEnd - sourceComponentBegin + 1
            const baseComponentBegin = baseComponent.begin
            const baseComponentEnd = baseComponent.end

            const baseComponentCode = getComponentBodyBetween(baseCode, baseComponentBegin, baseComponentEnd)

            let resultCode = Array.from(sourceCode.slice())
            resultCode.splice(sourceComponentBegin, deletedLength, baseComponentCode)
            resultCode = resultCode.join('')

            let link = document.createElement('a')
            link.download = 'result.js'

            let blob = new Blob(Array.from(resultCode), {type: 'text/javascript'})

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
            <FileUploadButtonsGroup
                classes={gridClasses.root}
                onChange={fileUploadHandler}
            />
            <ViewTabsGroup
                classes={gridClasses.root}
                sourceCode={sourceCode}
                baseCode={baseCode}
                sourceComponents={sourceComponents}
                baseComponents={baseComponents}
                selectedSourceComponent={selectedSourceComponent}
                selectedBaseComponent={selectedBaseComponent}
                selectSourceComponentHandler={selectSourceComponentHandler}
                selectBaseComponentHandler={selectBaseComponentHandler}
            />
            <ComponentReplaceButton
                classes={gridClasses.replaceButton}
                selectedSourceComponent={selectedSourceComponent}
                selectedBaseComponent={selectedBaseComponent}
                onClick={replaceButtonClickHandler}
            />
        </Box>
    )
}

export default App
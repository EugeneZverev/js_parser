export const getComponentByName = (componentsList, name) => {
    for (let component of componentsList) {
        if (component.name === name) return component
    }
}

export const getComponentBodyBetween = (code, begin, end) => code.slice(begin, end + 1)

export const getUniqueComponents = (sourceComponents, baseComponents) => {
    const uniqueComponents = new Set()
    for (let sourceComponent of sourceComponents) {
        
        const sourceComponentSignatureLength = sourceComponent.signature.length
        for (let baseComponent of baseComponents) {
            const baseComponentSignatureLength = baseComponent.signature.length
            if (sourceComponentSignatureLength === baseComponentSignatureLength) {
                uniqueComponents.add(baseComponent)
            } 
        }
    }
    
    return Array.from(uniqueComponents)
}
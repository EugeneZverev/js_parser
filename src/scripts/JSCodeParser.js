export function findAllFunctionDeclarationsIn(sourceCode) {
    const functionBeginRule = '(\\bfunction\\b)'
    const spacesAndLineBreaksRule = '[\\n\\s]'
    const functionNameRule = '([\\p{L}$_][\\p{L}$_\\d]*)'
    const signatureRule = '(\\(.*?\\))'

    const rules = [
        functionBeginRule,
        spacesAndLineBreaksRule, '+',
        functionNameRule, 
        spacesAndLineBreaksRule, '*',
        signatureRule,
        spacesAndLineBreaksRule, '*',
        '\\{',
    ].join('')
    const flags = 'gsu'
    const regexp = new RegExp(rules, flags)

    const allFoundFunctionDeclarations = Array.from(sourceCode.matchAll(regexp))
        .map(currentFunction => ({
            begin: currentFunction.index,
            end: (() => {
            	let bracesCounter = 1
                const lastIndex = currentFunction.index + currentFunction[0].length
                const codeString = currentFunction.input
                let bracketType = ''
                let isBracketBegan = false
    
                for (let i = lastIndex + 1; i < codeString.length; i++) {
                    let el = codeString[i]
                    if (isBracketBegan) {
                        if (el === bracketType) {
                            isBracketBegan = false
                            bracketType = ''
                        } 
                        continue
                    } else {
                        if (el === "'" || el === '"' || el === "`") {
                            bracketType = el
                            isBracketBegan = true
                            continue
                        }
                        if (el === '{') bracesCounter++
                        else if (el === '}') bracesCounter--
                        else continue

                        if (bracesCounter === 0) return i
                    }
                }
            })(),
            type: currentFunction[1],
            name: currentFunction[2],
            signature: currentFunction[3]
                .slice(1, -1)
                .split(',')
                .map(argument => argument.trim()),
    }))
    
    return allFoundFunctionDeclarations
}
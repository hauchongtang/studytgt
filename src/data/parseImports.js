import { getModuleInfoByModuleCode } from "../api/users"
var uniqueModCode = []
export const parseUrl = async (url) => {
    const urlParse = new URL(typeof(url) === "String"
      ? url
      : "https://nusmods.com/timetable/sem-1/share?CS2102=LEC:1,TUT:05&CS2103T=LEC:G16&CS2105=TUT:06,LEC:1&FSC2101=LEC:1&ST2334=LEC:1,TUT:10")
    const urlSearch = new URLSearchParams(urlParse.search)
    const entries = Array.from(urlSearch.entries())

    var result = []
    
    for (let i = 0; i < entries.length; i++) {
        let moduleCode = entries[i][0]
        let moduleInfo = entries[i][1]

        if (!uniqueModCode.includes(moduleCode)) {
            uniqueModCode.push(moduleCode)
        }
        if (moduleInfo === "") continue

        var moduleObj = {
            moduleCode: moduleCode,
            moduleInfo: await parseModuleInfo(moduleInfo, moduleCode)
        }

        result.push(moduleObj)
    }
    console.log(result)
    return result
}

const getModuleByCode = async (code, sem, key, mode) => {
    var valuesGlobal = []
    const result = await getModuleInfoByModuleCode(code, sem, key, mode)
    valuesGlobal.push(result)
    return valuesGlobal
}

export const parseModuleInfo = async (infoStr, moduleCode) => {
    let values = infoStr.split(',')
    let stringArr = []
    for (let value of values) {
        let arrVals = value.split(":")
        let jsonInfoStr = '"' + arrVals[0] + '":"' + arrVals[1] + '"'
        stringArr.push(jsonInfoStr)
    }

    var result = JSON.parse(`{${stringArr}}`)

    for (var key of Object.keys(result)) {
        result[key] = await getModuleByCode(moduleCode, 1, key, result[key])
    }
    return result
}

export const getUniqueModules = () => {
    if (uniqueModCode.length > 0) return uniqueModCode
    return ["No Modules"]
}
import axios from "axios"

export const getModuleInfoByModuleCode = async (moduleCode: string, semester: number, lessonType: string, classNo: any) => {
  var type = 'Lecture'
  switch (lessonType) {
    case "LEC":
      type = "Lecture"
      break
    case "TUT":
      type = "Tutorial"
      break
    case "LAB":
      type = "Lab"
      break
    case "REC":
      type = "Recitation"
      break
    default:
      type = "Lecture"
      break
  }

  try {
    const response = await axios.get(`https://api.nusmods.com/v2/2022-2023/modules/${moduleCode}.json`)

    return response.data.semesterData[semester - 1].timetable
      .filter((value: { classNo: any; lessonType: string }) => value.classNo === classNo && value.lessonType === type)
      .map((value: any) => value);
  } catch (error) {
    console.log(error);
    return [];
  }
}

const getModuleByCode = async (code: string, sem: number, key: string, mode: any) => {
  var valuesGlobal = []
  const result = await getModuleInfoByModuleCode(code, sem, key, mode)
  valuesGlobal.push(result)
  return valuesGlobal
}

export const parseUrl = async (url: string) => {
  if (url === null) return [];
  const urlParse = new URL(url);
  const urlSearch = new URLSearchParams(urlParse.search)
  const entries = Array.from(urlSearch.entries())

  var result = []
  var uniqueModCode: string[] = []
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

export const parseModuleInfo = async (infoStr: string, moduleCode: string) => {
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
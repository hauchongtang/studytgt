import {render,screen, waitFor} from "@testing-library/react";
import {parseUrl} from "../parseImports";

test("Check for the import url parser's correctness", async () => {
	const exampleUrl = "https://nusmods.com/timetable/sem-1/share?CS2102=LEC:1V,TUT:13&CS2103T=LEC:G19&FSC2101=LEC:1&ST2334=LEC:1,TUT:3";
	const output = [
  {
    "moduleCode": "CS2102",
    "moduleInfo": {
      "LEC": [
        [
          {
            "classNo": "1V",
            "startTime": "1200",
            "endTime": "1400",
            "weeks": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ],
            "venue": "I3-AUD",
            "day": "Tuesday",
            "lessonType": "Lecture",
            "size": 500,
            "covidZone": "B"
          }
        ]
      ],
      "TUT": [
        [
          {
            "classNo": "13",
            "startTime": "1000",
            "endTime": "1100",
            "weeks": [
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ],
            "venue": "COM3-01-23",
            "day": "Friday",
            "lessonType": "Tutorial",
            "size": 25,
            "covidZone": "Unknown"
          }
        ]
      ]
    }
  },
  {
    "moduleCode": "CS2103T",
    "moduleInfo": {
      "LEC": [
        [
          {
            "classNo": "G19",
            "startTime": "0800",
            "endTime": "0900",
            "weeks": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ],
            "venue": "COM1-B103",
            "day": "Wednesday",
            "lessonType": "Lecture",
            "size": 22,
            "covidZone": "B"
          },
          {
            "classNo": "G19",
            "startTime": "1600",
            "endTime": "1800",
            "weeks": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ],
            "venue": "I3-AUD",
            "day": "Friday",
            "lessonType": "Lecture",
            "size": 22,
            "covidZone": "B"
          },
          {
            "classNo": "G19",
            "startTime": "0800",
            "endTime": "1000",
            "weeks": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ],
            "venue": "COM1-0203",
            "day": "Thursday",
            "lessonType": "Lecture",
            "size": 22,
            "covidZone": "B"
          },
          {
            "classNo": "G19",
            "startTime": "0800",
            "endTime": "1000",
            "weeks": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ],
            "venue": "COM1-0203",
            "day": "Monday",
            "lessonType": "Lecture",
            "size": 22,
            "covidZone": "B"
          }
        ]
      ]
    }
  },
  {
    "moduleCode": "FSC2101",
    "moduleInfo": {
      "LEC": [
        [
          {
            "classNo": "1",
            "startTime": "1800",
            "endTime": "2200",
            "weeks": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ],
            "venue": "LT27",
            "day": "Monday",
            "lessonType": "Lecture",
            "size": 410,
            "covidZone": "B"
          }
        ]
      ]
    }
  },
  {
    "moduleCode": "ST2334",
    "moduleInfo": {
      "LEC": [
        [
          {
            "classNo": "1",
            "startTime": "0800",
            "endTime": "1000",
            "weeks": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ],
            "venue": "LT27",
            "day": "Tuesday",
            "lessonType": "Lecture",
            "size": 628,
            "covidZone": "B"
          }
        ]
      ],
      "TUT": [
        [
          {
            "classNo": "3",
            "startTime": "1100",
            "endTime": "1200",
            "weeks": [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13
            ],
            "venue": "S16-06118",
            "day": "Monday",
            "lessonType": "Tutorial",
            "size": 50,
            "covidZone": "B"
          }
        ]
      ]
    }
  }
]
	const result = await parseUrl(exampleUrl);
	expect(result).toStrictEqual(output);
})
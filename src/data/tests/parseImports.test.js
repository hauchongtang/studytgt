import {render,screen, waitFor} from "@testing-library/react";
import {parseUrl} from "../parseImports";

test("Check for the import url parser's correctness", async () => {
	const exampleUrl = "https://nusmods.com/timetable/sem-1/share?CS2102=LEC:1,TUT:05&CS2103T=LEC:G16&CS2105=TUT:06,LEC:1&FSC2101=LEC:1&ST2334=LEC:1,TUT:10";
	const output = [
		{
			"moduleCode": "CS2102",
			"moduleInfo": {
				"LEC": [
					[
						{
							"classNo": "1",
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
							"venue": "E-Hybrid_C",
							"day": "Tuesday",
							"lessonType": "Lecture",
							"size": 500,
							"covidZone": "Unknown"
						}
					]
				],
				"TUT": [
					[
						{
							"classNo": "05",
							"startTime": "1400",
							"endTime": "1500",
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
							"venue": "",
							"day": "Tuesday",
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
							"classNo": "G16",
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
							"size": 20,
							"covidZone": "A"
						},
						{
							"classNo": "G16",
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
							"venue": "COM1-B103",
							"day": "Friday",
							"lessonType": "Lecture",
							"size": 20,
							"covidZone": "A"
						},
						{
							"classNo": "G16",
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
							"venue": "AS6-0210",
							"day": "Friday",
							"lessonType": "Lecture",
							"size": 20,
							"covidZone": "A"
						},
						{
							"classNo": "G16",
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
							"day": "Tuesday",
							"lessonType": "Lecture",
							"size": 20,
							"covidZone": "A"
						}
					]
				]
			}
		},
		{
			"moduleCode": "CS2105",
			"moduleInfo": {
				"TUT": [
					[
						{
							"classNo": "06",
							"startTime": "1200",
							"endTime": "1300",
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
							"venue": "",
							"day": "Friday",
							"lessonType": "Tutorial",
							"size": 23,
							"covidZone": "Unknown"
						}
					]
				],
				"LEC": [
					[
						{
							"classNo": "1",
							"startTime": "1400",
							"endTime": "1600",
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
							"venue": "E-Hybrid_C",
							"day": "Monday",
							"lessonType": "Lecture",
							"size": 400,
							"covidZone": "Unknown"
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
							"covidZone": "A"
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
							"covidZone": "A"
						}
					]
				],
				"TUT": [
					[
						{
							"classNo": "10",
							"startTime": "1000",
							"endTime": "1100",
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
							"day": "Tuesday",
							"lessonType": "Tutorial",
							"size": 45,
							"covidZone": "A"
						}
					]
				]
			}
		}
	]
	const result = await parseUrl(exampleUrl);
	expect(result).toStrictEqual(output);
})
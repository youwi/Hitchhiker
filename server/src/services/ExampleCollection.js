export const example={
	"id": "bbfe3f1c-d058-c174-4bf6-e38e613aea96",
	"name": "Sample",
	"description": "",
	"order": [
		"5a96195a-7559-b689-d52b-9e2d2e05ab3c",
		"f21a0502-da15-90bb-74aa-40fbe5d1e83d",
		"f7e501d1-5847-049b-c13e-d78ad9d00ab4"
	],
	"folders": [
		{
			"id": "6d397836-5f8e-d758-24c0-653daedef54e",
			"name": "delete",
			"description": "",
			"order": [
				"2fd4f97f-1df6-799d-b07d-3008cf3adfdc"
			],
			"owner": "1010955"
		}
	],
	"timestamp": 1500194431285,
	"owner": "1010955",
	"public": false,
	"requests": [
		{
			"id": "2fd4f97f-1df6-799d-b07d-3008cf3adfdc",
			"headers": "Content-Type: application/json\n",
			"headerData": [
				{
					"key": "Content-Type",
					"value": "application/json",
					"description": "",
					"enabled": true
				}
			],
			"url": "http://{{apihost}}/sample/001",
			"queryParams": [],
			"preRequestScript": null,
			"pathVariables": {},
			"pathVariableData": [],
			"method": "DELETE",
			"data": [],
			"dataMode": "raw",
			"tests": "\ntests[\"Status code is 200\"] = responseCode.code === 200;\n\ntests[\"request is success\"] = responseObj.success;\n\ntests[\"Response time is less than 500ms\"] = responseTime < 500;",
			"currentHelper": "normal",
			"helperAttributes": {},
			"time": 1500195765037,
			"name": "sample delete",
			"description": "",
			"collectionId": "bbfe3f1c-d058-c174-4bf6-e38e613aea96",
			"responses": [],
			"rawModeData": "{\n\t\"id\": \"002\",\n\t\"name\": \"sample 3\"\n}"
		},
		{
			"id": "5a96195a-7559-b689-d52b-9e2d2e05ab3c",
			"headers": "Content-Type: application/json\n",
			"headerData": [
				{
					"key": "Content-Type",
					"value": "application/json",
					"description": "",
					"enabled": true
				}
			],
			"url": "http://{{apihost}}/sample/001",
			"queryParams": [],
			"preRequestScript": null,
			"pathVariables": {},
			"pathVariableData": [],
			"method": "GET",
			"data": null,
			"dataMode": "params",
			"tests": "\ntests[\"Status code is 200\"] = responseCode.code === 200;\n\ntests[\"request is success\"] = responseObj.success;\n\ntests[\"id is correct\"] = responseObj.result.id === \"001\";",
			"currentHelper": "normal",
			"helperAttributes": {},
			"time": 1500195778453,
			"name": "sample get",
			"description": "",
			"collectionId": "bbfe3f1c-d058-c174-4bf6-e38e613aea96",
			"responses": []
		},
		{
			"id": "f21a0502-da15-90bb-74aa-40fbe5d1e83d",
			"headers": "Content-Type: application/json\n",
			"headerData": [
				{
					"key": "Content-Type",
					"value": "application/json",
					"description": "",
					"enabled": true
				}
			],
			"url": "http://{{apihost}}/sample",
			"queryParams": [],
			"preRequestScript": null,
			"pathVariables": {},
			"pathVariableData": [],
			"method": "POST",
			"data": [],
			"dataMode": "raw",
			"tests": "\ntests[\"Status code is 200\"] = responseCode.code === 200;\n\ntests[\"request is success\"] = responseObj.success;\n\ntests[\"id is correct\"] = responseObj.result.id === \"002\";",
			"currentHelper": "normal",
			"helperAttributes": {},
			"time": 1500195787228,
			"name": "sample post",
			"description": "",
			"collectionId": "bbfe3f1c-d058-c174-4bf6-e38e613aea96",
			"responses": [],
			"rawModeData": "{\n\t\"id\": \"002\",\n\t\"name\": \"sample 2\"\n}"
		},
		{
			"id": "f7e501d1-5847-049b-c13e-d78ad9d00ab4",
			"headers": "Content-Type: application/json\n",
			"headerData": [
				{
					"key": "Content-Type",
					"value": "application/json",
					"description": "",
					"enabled": true
				}
			],
			"url": "http://{{apihost}}/sample",
			"queryParams": [],
			"preRequestScript": null,
			"pathVariables": {},
			"pathVariableData": [],
			"method": "PUT",
			"data": [],
			"dataMode": "raw",
			"version": 2,
			"tests": "\ntests[\"Status code is 200\"] = responseCode.code === 200;\n\ntests[\"request is success\"] = responseObj.success;\n\ntests[\"name is update success\"] = responseObj.result.name === \"sample 3\";",
			"currentHelper": "normal",
			"helperAttributes": {},
			"time": 1500195794286,
			"name": "sample put",
			"description": "",
			"collectionId": "bbfe3f1c-d058-c174-4bf6-e38e613aea96",
			"responses": [],
			"rawModeData": "{\n\t\"id\": \"002\",\n\t\"name\": \"sample 3\"\n}"
		}
	]
}
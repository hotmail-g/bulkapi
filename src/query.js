#!/usr/bin/env node

import fs from 'fs';
import { fetchRequest } from './fetchRequest.js';
import { globalOptions } from './bulkapi.js';
let instanceUrl = '', rootPath = '';
async function createQueryJob(query, fileName) {
    let queryRequest = JSON.stringify({
        "operation": "query",
        "query": query,
        "contentType": "CSV",
        "columnDelimiter": "COMMA",
        "lineEnding": "CRLF"
    });
    const uri = instanceUrl + 'jobs/query';
    const createJobResponse = await fetchRequest(uri, '', 'POST', 'JSON', queryRequest);
    if (createJobResponse && createJobResponse.id) {
        const responseObject = await getQueryJobStatus(createJobResponse.id, fileName);
        return responseObject;
    }
}
async function getQueryJobStatus(queryJobId, fileName) {
    const uri = instanceUrl + 'jobs/query/' + queryJobId;
    rootPath = `${globalOptions.rootPath}${queryJobId}/`;
    if (!fs.existsSync(rootPath)) {
        fs.mkdirSync(rootPath, { recursive: true });
    }
    let jobStatus = await fetchRequest(uri, '', 'GET', 'JSON');
    console.log(`Query job (${queryJobId}) status for ${fileName} is ${jobStatus.state}`);
    const jobStates = ['JobComplete', 'Aborted', 'Failed'];
    if (jobStatus && jobStatus.state && !jobStates.includes(jobStatus.state)) {
        getQueryJobStatus(queryJobId, fileName);
    } else {
        const result = await getQueryResult(queryJobId, fileName);
        return result;
    }
}
async function getQueryResult(queryJobId, fileName) {
    const uri = `${instanceUrl}jobs/query/${queryJobId}/results?maxRecords=5000000`;
    const queryResult = await fetchRequest(uri, { 'Accept': 'test/csv' }, 'GET', 'TEXT');
    const filePath = `${rootPath}${fileName}.csv`;
    fs.writeFileSync(filePath, queryResult);
}
function queryJob() {
    instanceUrl = globalOptions.bulkApiBaseUrl;
    createQueryJob(globalOptions.soql, globalOptions.objectName);
}
export { queryJob };
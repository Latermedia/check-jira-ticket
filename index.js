const axios = require('axios');
const base64 = require('base-64');

const githubApiUrl = 'https://api.github.com/repos/';
const githubPulls = '/pulls/';
const jiraApiUrl = '/rest/api/3/issue/';

const pullRequestNumber = process.env.PR_NUMBER;
const repository = process.env.REPO;
const githubToken = process.env.GH_API_TOKEN;
const jiraBaseUrl = process.env.JIRA_SERVER;
const jiraUser = process.env.JIRA_SERVICE_USER;
const jiraToken = process.env.JIRA_SERVICE_API_TOKEN;

const githubFullUrl = `${githubApiUrl}${repository}${githubPulls}${pullRequestNumber}`;

const prHeaders = {
  'Accept': 'application/vnd.github.v3+json',
  'Authorization': `Bearer ${githubToken}`,
};

const jiraBasicAuth = `${jiraUser}:${jiraToken}`;
const stringBasicAuth = base64.encode(jiraBasicAuth);

const jiraHeaders = {
  'Authorization': `Basic ${stringBasicAuth}`,
  'Content-Type': 'application/json',
};

axios.get(githubFullUrl, { headers: prHeaders })
  .then((prDataResponse) => {
    const prTitleCheck = prDataResponse.data.title.match(/([A-Za-z]{2,}-[0-9]+)/gm);

    if (!prTitleCheck) {
      console.log('No JIRA ticket found, please verify the issue ID is included in the pull request title. For more info, review the check-jira-ticket git repo.');
      process.exit(1);
    } else if (prTitleCheck.length > 1) {
      console.log('More than one JIRA Ticket was found in PR title: ');
      for (i = 0; i < prTitleCheck.length; i++)
         console.log(prTitleCheck[i]);
      process.exit(1);
    } else if (prTitleCheck.length === 1) {
      console.log(`JIRA Ticket was found in PR title: ${prTitleCheck[0]}`);
      jiraIssue = prTitleCheck[0];
    }

    jiraIssueUpper = jiraIssue.toUpperCase();
    const jiraFullUrl = `${jiraBaseUrl}${jiraApiUrl}${jiraIssueUpper}`;
    return axios.get(jiraFullUrl, { headers: jiraHeaders });
  })
  .then((jiraIssueResponse) => {
    if (jiraIssueResponse.data.key === jiraIssueUpper) {
      console.log(`The title contains a valid JIRA ticket: ${jiraIssueUpper}`);
    } else {
      console.log(`The title does not contain a valid JIRA ticket: ${jiraIssueUpper}`);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
    console.log(`The title does not contain a valid JIRA ticket: ${jiraIssueUpper}`);
    process.exit(1);
  });
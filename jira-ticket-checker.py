#!/usr/bin/env python
import base64
import os
import re
import requests
import sys
from requests.structures import CaseInsensitiveDict

github_api_url = 'https://api.github.com/repos/'
github_pulls = '/pulls/'
jira_api_url = '/rest/api/3/issue/'
jira_issue = 'blank'
pull_request_number = os.environ['PR_NUMBER']
repository = os.environ['REPO']
github_token = os.environ['GH_API_TOKEN']
jira_base_url = os.environ['JIRA_SERVER']
jira_user = os.environ['JIRA_SERVICE_USER']
jira_token = os.environ['JIRA_SERVICE_API_TOKEN']

github_full_url = github_api_url + repository + github_pulls + pull_request_number

pr_headers = CaseInsensitiveDict()
pr_headers["Accept"] = "application/vnd.github.v3+json"
pr_headers["Authorization"] = "Bearer " + github_token

jira_basic_auth = '{}:{}'.format(jira_user, jira_token)
byte_basic_auth = bytes(jira_basic_auth, encoding='utf8')
base64_basic_auth = base64.b64encode(byte_basic_auth)
string_basic_auth = base64_basic_auth.decode()

jira_headers = {
    'Authorization': 'Basic {}'.format(string_basic_auth),
    'Content-Type': 'application/json',
}

pr_data_response = requests.get(url=github_full_url, headers=pr_headers)
pr_title_check = (re.search(r'[A-Z]{2,}-[0-9]+', pr_data_response.title))

if pr_title_check is None:
    print("No JIRA Ticket match found.")
    sys.exit(1)
elif pr_title_check.count > 1:
    print("More than one JIRA Ticket was found in PR title: {}".format(pr_title_check))
    sys.exit(1)
elif pr_title_check.count == 1:
    print("JIRA Ticket was found in PR title: {}".format(pr_title_check))
    jira_issue = pr_title_check

jira_full_url = jira_base_url + jira_api_url + jira_issue
jira_issue_response = requests.get(url=jira_full_url, headers=jira_headers)

if jira_issue_response.key == jira_issue:
    print('The title contains a valid JIRA ticket: {}'.format(jira_issue))
else:
    print('The title does not contain a valid JIRA ticket: {}'.format(jira_issue))
    sys.exit(1)
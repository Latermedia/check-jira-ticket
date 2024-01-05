# check-jira-ticket
GitHub Action: Check if jira ticket exists before merge

## Workflow Use
```
check-jira-ticket:
   name: check-jira-ticket
   runs-on: ubuntu-latest
   steps:
      - name: Check Jira Ticket
      uses: Latermedia/check-jira-ticket@v1
      with:
         jiraApiToken: ${{ env.JIRA_SERVICE_API_TOKEN }}
         jiraServiceUser: ${{ env.JIRA_SERVICE_USER }}
         jiraServer: ${{ env.JIRA_SERVER }}
         githubToken: ${{ env.GH_API_TOKEN }}
```
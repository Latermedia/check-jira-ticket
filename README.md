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

## What is Checked
The title of a Pull Request is checked for the following:
* There is a ticket in the title
* There is not more than one ticket in the title
* The ticket found in the title is a valid Jira ticket 

## REGEX
`/([A-Z]{2,}-[0-9]+)/gm`
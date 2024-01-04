# Container image that runs your code
FROM python:3.12
RUN pip3 install requests --upgrade

COPY jira-ticket-checker.py jira-ticket-checker.py
CMD ["python", "jira-ticket-checker.py"]
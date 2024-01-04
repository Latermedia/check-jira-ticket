# Container image that runs your code
FROM python:3.12
RUN pip3 install requests --upgrade

RUN mkdir -p /github/workspace
COPY jira-ticket-checker.py /github/workspace/jira-ticket-checker.py
CMD ["python", "jira-ticket-checker.py"]
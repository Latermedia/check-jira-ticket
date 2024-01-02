# Container image that runs your code
FROM ubuntu:latest
RUN apt-get update && apt-get install -y python3

COPY jira-ticket-checker.py /jira-ticket-checker.py
RUN chmod +x /jira-ticket-checker.py
ENTRYPOINT ["python", "jira-ticket-checker.py"]
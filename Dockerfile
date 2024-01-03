# Container image that runs your code
FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN pip3 install requests --upgrade

COPY jira-ticket-checker.py /github/workspace/jira-ticket-checker.py
RUN chmod +x /github/workspace/jira-ticket-checker.py
ENTRYPOINT ["python3", "jira-ticket-checker.py"]
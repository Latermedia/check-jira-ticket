# Container image that runs your code
FROM ubuntu:latest
RUN apt-get update && apt-get install -y python3 && apt-get install python3-pip
RUN pip3 install requests --upgrade

COPY jira-ticket-checker.py /jira-ticket-checker.py
RUN chmod +x /jira-ticket-checker.py
ENTRYPOINT ["python", "jira-ticket-checker.py"]
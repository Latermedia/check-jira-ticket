# Container image that runs your code
FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN pip3 requests --upgrade

ADD . /work
WORKDIR /work
RUN chmod +x jira-ticket-checker.py
CMD ["python", "./jira-ticket-checker.py"]

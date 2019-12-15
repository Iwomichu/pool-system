FROM python:3.8.0-alpine
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
WORKDIR /usr/src/code
RUN apk update \
  && apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install pipenv
COPY Pipfile Pipfile.lock /usr/src/code/
RUN pipenv install --system
COPY ./entrypoint.sh /usr/src/code/entrypoint.sh
COPY . /usr/src/code/
ENTRYPOINT [ "/usr/src/code/entrypoint.sh" ]
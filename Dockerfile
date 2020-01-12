FROM nikolaik/python-nodejs:python3.8-nodejs13-alpine
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PATH /usr/src/code/node_modules/.bin:$PATH
WORKDIR /usr/src/code
RUN apk update \
  && apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install pipenv
COPY Pipfile Pipfile.lock /usr/src/code/
RUN pipenv install --system
COPY package.json package-lock.json /usr/src/code/
RUN npm i --silent
COPY ./entrypoint.sh /usr/src/code/entrypoint.sh
COPY . /usr/src/code/
RUN npm run dev
ENTRYPOINT [ "/usr/src/code/entrypoint.sh" ]
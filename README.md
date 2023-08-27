## Simple Close.com integration

### Integration supports:
* getting all existing pipelines
* getting all opportunities base on a pipeline id

### Installation

Create a .env file and specify personal values from .env.example,
for example providing this values:
```shell
CLOSE_API_KEY=
CLOSE_API_ENDPOINT=
PORT=
NODE_ENV=
CACHE_DURATION=
```

Using docker:
! docker method is not working currently because of tsoa, ill try to fix it in a short time
```shell
docker build . -t close-osh && \
docker run -d -p80:3000 close-osh
```
change ports and image tag as you like

Using typescript directly:
```shell
npm install && \
 npm run build && \
  npm run start
```

### Usage
Accessing port specified in .env file and open ```/docs``` route to see swagger interface


### TODO
* Create a more abstract approach
* Add pagination
* Create a generic filter to work not only with pipeline id but with other fields


<hr />

Author: Andrei Pavalachi <andrei.pavalachi@hotmail.com>

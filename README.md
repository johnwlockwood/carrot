# Modern Brontend (ES6 and React), and Python Backend Recipe 

# Recipe for this example

## Intialize repo

# Frontend
## [Create A React App](https://github.com/facebookincubator/create-react-app)

# Backend
## Create a python virtual environment

### Install pyenv-virtualenv: 
    brew install pyenv-virtualenv
    
### Create virtual environment for this app 
    pyenv virtualenv create flaskexample

### Activate the virtual environment: 
    pyenv activate flaskexample

## [Create A Flask App](http://flask.pocoo.org/)

# Reverse Proxy to bring them all together
### Install Nginx
    brew install nginx

## Create nginx config file
    cp /usr/local/etc/nginx/nginx.conf ./

Edit it to add reverse proxying to frontend react app and backend flask app.

    http {
        ...
        upstream nodeweb {
            server localhost:3000;
        }

        upstream flaskapp {
            server localhost:5000;
        }
        ...
        server {
            ...
            location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header        X-Forwarded-Proto $scheme;
                proxy_set_header Host $host;
                
                # enable EventSource
                proxy_set_header Connection '';
                proxy_http_version 1.1;
                chunked_transfer_encoding off;
                proxy_buffering off;
                proxy_cache off;

                proxy_pass http://nodeweb$is_args$args;
            }

            location ~ /u/(?<section>.*) {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header        X-Forwarded-Proto $scheme;
                proxy_buffering off;
                proxy_set_header Host $host;

                proxy_pass http://flaskapp/$section$is_args$args;
            }
        }
    }


Launch nginx with config

    nginx -c $(pwd)/nginx.conf

Run Flask dev server:

    FLASK_APP=root/app/hello.py flask run

Run react app:

    cd greens
    yarn start

[Visit the nginx server localhost:8080](http://localhost:8080/) You will be served the frontend

[Load the flask app backend url](http://localhost:8080/u)

Both are from the same host and port origin and to keep frontend fetches in the same-origin browser security policy.

# Fetch from python

## Add some state and fetch when app component mounts

https://facebook.github.io/react/docs/state-and-lifecycle.html


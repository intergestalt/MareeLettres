## Results

### setup

concurrency: 50 ( run multiple processes: $ meteor-down test.js & ) 

subscriptions:

- all challenges (24)
- all proposals (24*24=576)

server: heroku free, mlab free (no oplog tailing)

test runner: macbook pro 2009

#### connect, subscribe, get initial content, stay connected

result: 300 users

#### connect, subscribe, get initial content, disconnect, start again

result: 50 users

#### connect, stay connected

result: 350 users

### setup

same as above, but 24*200=4800 proposals

#### connect, subscribe, get initial content, stay connected

result: 300 users

oku[web.1]: Process running mem=513M(100.2%)
2017-07-19T10:10:22.477866+00:00 heroku[web.1]: Error R14 (Memory quota exceeded)
2017-07-19T10:10:25.474659+00:00 app[web.1]: # of sessions: 301

#### connect, subscribe, get initial content, disconnect, start again

result: 50 users (response time up from 450ms to 4500ms)

#### connect, subscribe only challenges, get initial content, disconnect, start again after 5s

result: 100 users (response still good at 50 users)

#### connect, stay connected

result: 400 users
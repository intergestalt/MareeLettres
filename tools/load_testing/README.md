## Results

### setup

concurrency: 50 ( run multiple processes: $ meteor-down test.js & ) 

subscriptions:

- all challenges (24)
- all proposals (24*200=4800)

server: heroku free, mlab free (no oplog tailing)

test runner: macbook pro 2009

#### connect, subscribe, get initial content, stay connected

result: 300 users

#### connect, subscribe, get initial content, disconnect, start again

result: 50 users

#### connect, stay connected

result: 350 users



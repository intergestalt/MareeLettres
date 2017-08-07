# load testing

## loadtest

https://github.com/alexfernandez/loadtest

### 200 proposals by challenge, 7. August

loadtest -c 10 --rps 200 http://maree.herokuapp.com/api/challenges/98Auwp5wakBTLjeCe/proposals

#### with simple:rest

[Mon Aug 07 2017 16:13:51 GMT+0200 (CEST)] INFO Requests: 0, requests per second: 0, mean latency: 0 ms
[Mon Aug 07 2017 16:13:56 GMT+0200 (CEST)] INFO Requests: 42, requests per second: 8, mean latency: 112.8 ms
[Mon Aug 07 2017 16:13:56 GMT+0200 (CEST)] INFO Errors: 42, accumulated errors: 42, 100% of total requests
[Mon Aug 07 2017 16:14:01 GMT+0200 (CEST)] INFO Requests: 242, requests per second: 40, mean latency: 113.5 ms
[Mon Aug 07 2017 16:14:01 GMT+0200 (CEST)] INFO Errors: 200, accumulated errors: 242, 100% of total requests
[Mon Aug 07 2017 16:14:06 GMT+0200 (CEST)] INFO Requests: 386, requests per second: 29, mean latency: 1741.9 ms
[Mon Aug 07 2017 16:14:06 GMT+0200 (CEST)] INFO Errors: 127, accumulated errors: 369, 95.6% of total requests
[Mon Aug 07 2017 16:14:11 GMT+0200 (CEST)] INFO Requests: 625, requests per second: 48, mean latency: 8247.2 ms
[Mon Aug 07 2017 16:14:11 GMT+0200 (CEST)] INFO Errors: 110, accumulated errors: 479, 76.6% of total requests
[Mon Aug 07 2017 16:14:16 GMT+0200 (CEST)] INFO Requests: 870, requests per second: 49, mean latency: 4157.2 ms
[Mon Aug 07 2017 16:14:16 GMT+0200 (CEST)] INFO Errors: 189, accumulated errors: 668, 76.8% of total requests
[Mon Aug 07 2017 16:14:21 GMT+0200 (CEST)] INFO Requests: 1128, requests per second: 52, mean latency: 5737.1 ms
[Mon Aug 07 2017 16:14:21 GMT+0200 (CEST)] INFO Errors: 178, accumulated errors: 846, 75% of total requests
[Mon Aug 07 2017 16:14:26 GMT+0200 (CEST)] INFO Requests: 1390, requests per second: 52, mean latency: 11055.4 ms
[Mon Aug 07 2017 16:14:26 GMT+0200 (CEST)] INFO Errors: 97, accumulated errors: 943, 67.8% of total requests
[Mon Aug 07 2017 16:14:31 GMT+0200 (CEST)] INFO Requests: 1637, requests per second: 49, mean latency: 9549.9 ms
[Mon Aug 07 2017 16:14:31 GMT+0200 (CEST)] INFO Errors: 72, accumulated errors: 1015, 62% of total requests
[Mon Aug 07 2017 16:14:36 GMT+0200 (CEST)] INFO Requests: 1884, requests per second: 49, mean latency: 6301.8 ms
[Mon Aug 07 2017 16:14:36 GMT+0200 (CEST)] INFO Errors: 93, accumulated errors: 1108, 58.8% of total requests
[Mon Aug 07 2017 16:14:41 GMT+0200 (CEST)] INFO Requests: 2133, requests per second: 50, mean latency: 4543.9 ms
[Mon Aug 07 2017 16:14:41 GMT+0200 (CEST)] INFO Errors: 151, accumulated errors: 1259, 59% of total requests
[Mon Aug 07 2017 16:14:46 GMT+0200 (CEST)] INFO Requests: 2401, requests per second: 54, mean latency: 8797.1 ms
[Mon Aug 07 2017 16:14:46 GMT+0200 (CEST)] INFO Errors: 85, accumulated errors: 1344, 56% of total requests
[Mon Aug 07 2017 16:14:51 GMT+0200 (CEST)] INFO Requests: 2640, requests per second: 48, mean latency: 9012 ms
[Mon Aug 07 2017 16:14:51 GMT+0200 (CEST)] INFO Errors: 37, accumulated errors: 1381, 52.3% of total requests
[Mon Aug 07 2017 16:14:56 GMT+0200 (CEST)] INFO Requests: 2890, requests per second: 50, mean latency: 6319.6 ms
[Mon Aug 07 2017 16:14:56 GMT+0200 (CEST)] INFO Errors: 55, accumulated errors: 1436, 49.7% of total requests
[Mon Aug 07 2017 16:15:01 GMT+0200 (CEST)] INFO Requests: 3136, requests per second: 49, mean latency: 6278.2 ms
[Mon Aug 07 2017 16:15:01 GMT+0200 (CEST)] INFO Errors: 73, accumulated errors: 1509, 48.1% of total requests

#### with simple:json-routes



## meteor_down

(deprecated, subscriptions are veryy much limited by design now)
# Evening Echo RSS
This Serverless function provides an RSS feed for each of the news pages on Cork's Evening Echo newspaper website.

## Installing and using
* Configure your AWS account
* Install Node.js 8+

```bash
git clone git@github.com:conoro/evening-echo-rss.git
cd evening-echo-rss
npm install -g serverless
npm install
serverless deploy
```
Then you access each RSS feed like so:

* https://url.of.serverless.function/dev/rss?page=https://www.eveningecho.ie/corknews
* https://url.of.serverless.function/dev/rss?page=https://www.eveningecho.ie/nationalnews
* https://url.of.serverless.function/dev/rss?page=https://www.eveningecho.ie/business

LICENSE Apache-2.0

Copyright Conor O'Neill 2018, conor@conoroneill.com

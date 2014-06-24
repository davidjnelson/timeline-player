# Timeline App

## Installation
```bash
git clone https://github.com/davidjnelson/timeline-tech-challenge.git
cd timeline-tech-challenge
npm install
bower install
```

## Running the app
```bash
gulp start-web-server
```

Visit http://localhost:8000 in your web browser.

## Running functional tests
```bash
gulp start-selenium (once)
gulp functional-test-local (repeatedly)
```

## Documentation on the selenium wire protocol
https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/text

## Documentation on webdriver for functional tests which uses the selenium wire protocol
https://github.com/admc/wd/blob/master/doc/api.md

## Running integration and unit tests
```bash
node_modules/karma/bin/karma start
```
Make sure not to open any other tabs in the window that karma is running in, or the tests will get very slow.

## Debugging integration tests in a browser
In a different browser window than the one karma is running in, type this in the browser:
```
http://localhost:9876/debug.html
```
It is _very_ important not to open any other tabs in the window karma is running in, or the tests will run slowly.

#!/bin/bash
session_id=`curl -X POST -H "Content-Type: application/json" -d '{"desiredCapabilities":{"browser":"chrome"}}' http://localhost:9515/session | jq -r .sessionId`

curl -X POST -H "Content-Type: application/json" -d '{"url":"http://www.google.com/"}' http://localhost:9515/session/$session_id/url

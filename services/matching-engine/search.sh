#!/bin/bash
curl -s -X POST http://127.0.0.1:3000/match \
     -H "Content-Type: application/json" \
     -d "{\"description\": \"$1\"}"

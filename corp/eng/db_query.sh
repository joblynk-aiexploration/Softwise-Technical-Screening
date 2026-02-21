#!/bin/bash
# JobLynk AI Exploration - Secure Data Bridge
export PGPASSWORD='AIzaSyC69gwKzgTO9'
psql -h 127.0.0.1 -U postgres -d agent_memory -c "$1"

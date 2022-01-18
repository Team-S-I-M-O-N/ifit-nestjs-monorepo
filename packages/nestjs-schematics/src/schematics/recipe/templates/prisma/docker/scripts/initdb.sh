#!/bin/bash

#bind to tcp port instead of unix socket so migrations can run
socat TCP-LISTEN:5432,bind=127.0.0.1,reuseaddr,fork UNIX-CLIENT:/var/run/postgresql/.s.PGSQL.5432 &
socat_process_id=$!
source ~/.bashrc
yarn --cwd /root/pulse db-migrate

#free the port so postgres can bind to it after initialization is complete
kill $socat_process_id

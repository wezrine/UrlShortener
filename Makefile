.PHONY: $(MAKECMDGOALS)

setup:
	cd ./client && npm i && npm start	

server:
	cd ./server && npm i && node app.js

test:
	cd ./client && node_modules/.bin/cypress run "cypress/integration/test.js"

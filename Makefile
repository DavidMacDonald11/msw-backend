SHELL := /bin/zsh
.DEFAULT_GOAL := run

.PHONY: run
run:
	nodemon -r dotenv/config app.js

.PHONY: update
update:
	git push heroku main
	heroku logs -t

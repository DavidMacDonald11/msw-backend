SHELL := /bin/zsh
.DEFAULT_GOAL := run

.PHONY: run
run:
	nodemon -r dotenv/config app.js

.PHONY: deploy
deploy:
	git push origin main
	vercel --prod
	vercel logs https://davids-minecraft-server-api.vercel.app

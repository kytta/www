.PHONY: build
build:
	hugo --gc

.PHONY: publish
publish: build
	pnpx vercel deploy ./public/

.PHONY: publish-prod
publish-prod:
	pnpx vercel --prod deploy ./public/

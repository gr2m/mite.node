test:
	@find test/mite.node-*.js | xargs -n 1 -t nodeunit

.PHONY: test
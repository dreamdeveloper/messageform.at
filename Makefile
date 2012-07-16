REPORTER = dot

serve:
	@./node_modules/.bin/stylus --inline --include-css -l -w ./dev/css & ./node_modules/.bin/serve ./dev

test:
	@./node_modules/.bin/mocha \
		--require test/common \
		--reporter $(REPORTER) \
		--growl \
		test/unit.js

test-browser:
	@open "http://127.0.0.1:3000/test/" & ./node_modules/.bin/serve . 

.PHONY: test

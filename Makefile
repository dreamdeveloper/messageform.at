REPORTER = dot

default:
	@./node_modules/requirejs/bin/r.js -o dev/js/app.build.js
	@rm -f ./build/css/*.styl

serve:
	@./node_modules/.bin/serve ./dev

install:
	@./node_modules/.bin/serve -S ./build

test:
	@./node_modules/.bin/mocha \
		--require test/common \
		--reporter $(REPORTER) \
		--growl \
		test/unit.js

test-browser:
	@open "http://127.0.0.1:3000/test/" & ./node_modules/.bin/serve .

.PHONY: test

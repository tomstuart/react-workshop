'use strict';

var failFast = require('jasmine-fail-fast');
jasmine.getEnv().addReporter(failFast.init());

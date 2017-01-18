var assert = require('assert');
var Promise = require("es6-promise").Promise;
var Px2MoveContentsTo = require('../libs/index.js');

describe('tests', function() {

	it("test", function(done) {
		this.timeout(60*1000);

		var px2MoveContentsTo = new Px2MoveContentsTo({
			'entryScript': __dirname+'/pickles2/.px_execute.php',
			'rules': __dirname+'/testdata/input.csv',
			'dumpTo': __dirname+'/dump_to/'
		});
		px2MoveContentsTo.run(function(result){
			done();
		});

	});

});

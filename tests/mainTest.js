var assert = require('assert');
var Promise = require("es6-promise").Promise;
var px2agent = require('px2agent');
var Px2CopyContentsTo = require('../libs/index.js');

describe('tests', function() {

	it("test", function(done) {
		this.timeout(60*1000);

		var px2CopyContentsTo = new Px2CopyContentsTo({
			'entryScript': __dirname+'/pickles2/.px_execute.php',
			'rules': __dirname+'/testdata/input.csv',
			'copyTo': __dirname+'/copy_to/'
		});
		px2CopyContentsTo.run(function(result){
			// console.log('done');
			done();
		});

	});

});

describe('後始末', function() {

	it("clearcache", function(done) {
		this.timeout(60*1000);

		var px2proj = px2agent.createProject(__dirname+'/pickles2/.px_execute.php');
		px2proj.query('/?PX=clearcache', {
			"complete": function(data, code){
				done();
			}
		});

	});

});

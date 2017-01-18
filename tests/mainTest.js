var assert = require('assert');
var Promise = require("es6-promise").Promise;
var px2agent = require('px2agent');
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

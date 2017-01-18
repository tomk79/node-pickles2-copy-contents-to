/**
 * pickles2-move-contents-to.js
 */
module.exports = function(options){
	var Promise = require("es6-promise").Promise;
	this.px2proj = require('px2agent').createProject(options.entryScript);

	/**
	 * 実行
	 */
	this.run = function(callback){
		callback = callback||function(){};
		callback();
		return;
	}
}

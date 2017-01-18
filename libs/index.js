/**
 * pickles2-copy-contents-to.js
 */
module.exports = function(options){
	var Promise = require("es6-promise").Promise;
	var csv = require('csv');
	var it79 = require('iterate79');
	var utils79 = require('utils79');
	var px2agent = require('px2agent');
	var fs = require('fs');
	var fsX = require('fs-extra');

	/**
	 * 起動
	 */
	this.run = function(callback){
		callback = callback||function(){};
		return execute(false, callback);
	}

	/**
	 * 起動 (リハーサル)
	 */
	this.dryrun = function(callback){
		callback = callback||function(){};
		return execute(false, callback);
	}

	/**
	 * ファイルを複製する
	 */
	function copyFile(from, to, isDryrun, callback){
		callback = callback||function(){};
		if(isDryrun){
			callback();
			return;
		}
		if( !utils79.is_file(from) ){
			callback();
			return;
		}

		fsX.mkdirsSync( utils79.dirname( to ) );

		// console.log(from, to);
		fsX.copySync( from, to );

		callback();
		return;
	}

	/**
	 * ディレクトリを移動する
	 */
	function copyDir(from, to, isDryrun, callback){
		callback = callback||function(){};
		if(isDryrun){
			callback();
			return;
		}
		if( !utils79.is_dir(from) ){
			callback();
			return;
		}

		fsX.mkdirsSync( utils79.dirname( to ) );

		// console.log(from, to);
		fsX.copySync( from, to );

		callback();
		return;
	}

	/**
	 * 実行
	 */
	function execute(isDryrun, callback){
		callback = callback||function(){};
		var px2proj;
		var csvList;
		var px2conf = {};

		new Promise(function(rlv, rjc){rlv();})
			.then(function(){ return new Promise(function(rlv, rjc){
				// Pickles 2 プロジェクトを生成
				px2proj = px2agent.createProject(options.entryScript);
				rlv();
			}); })
			.then(function(){ return new Promise(function(rlv, rjc){
				// Pickles 2 の設定を参照
				px2proj.get_path_controot(function(val){
					px2conf.path_controot = val;
					px2proj.get_path_docroot(function(val){
						px2conf.path_docroot = val;
						px2conf.realpath_controot = require('path').resolve(px2conf.path_docroot+px2conf.path_controot)+'/';

						// console.log(px2conf);
						rlv();
					});
				});
			}); })
			.then(function(){ return new Promise(function(rlv, rjc){
				// CSVを解析
				csv.parse(
					fs.readFileSync(options.rules),
					function(err, data){
						// console.log(data);
						csvList = data;
						rlv();
					}
				);
			}); })
			.then(function(){ return new Promise(function(rlv, rjc){
				// 移動処理を実行
				it79.ary(
					csvList,
					function(it1, row, idx){
						if( !row[0] ){
							it1.next();
							return;
						}
						if( !row[1] ){
							row[1] = row[0];
						}

						copyFile( require('path').resolve(px2conf.realpath_controot+row[0]), require('path').resolve(options.copyTo+row[1]), isDryrun, function(){

							// リソースディレクトリを移動
							px2proj.path_files(row[0], '', function(beforeFiles){
								// console.log(beforeFiles);
								px2proj.path_files(row[1], '', function(afterFiles){
									// console.log(afterFiles);
									copyDir(require('path').resolve(px2conf.realpath_controot+beforeFiles)+'/', require('path').resolve(options.copyTo+afterFiles)+'/', isDryrun, function(){
										it1.next();
									});
								});
							});

						});

					},
					function(){
						rlv();
					}
				);
			}); })
			.then(function(){
				// 完了
				callback();
				rlv();
			})
		;

		return;
	}

}

# pickles2-move-contents-to

CSV の入力データを元に、 Pickles 2 コンテンツを移動します。


## 使い方 - Usage

```js
var Px2MoveContentsTo = require('pickles2-move-contents-to');
var px2MoveContentsTo = new Px2MoveContentsTo({
	'entryScript': '/path/to/pickles2/.px_execute.php',
	'rules': '/path/to/input.csv',
	'dumpTo': '/path/to/dumpToDirectory/'
});
px2MoveContentsTo.run(function(result){
	console.log('done!');
});
```

or

```js
px2MoveContentsTo.dryrun(function(result){
	console.log('done!');
});
```

## ライセンス - License

MIT License


## 作者 - Author

- Tomoya Koyanagi <tomk79@gmail.com>
- website: <http://www.pxt.jp/>
- Twitter: @tomk79 <http://twitter.com/tomk79/>

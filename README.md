# pickles2-copy-contents-to

CSV の入力データを元に、 Pickles 2 コンテンツを複製します。


## 使い方 - Usage

```js
var Px2CopyContentsTo = require('pickles2-copy-contents-to');
var px2CopyContentsTo = new Px2CopyContentsTo({
	'entryScript': '/path/to/pickles2/.px_execute.php',
	'rules': '/path/to/input.csv',
	'copyTo': '/path/to/copyToDirectory/'
});
px2CopyContentsTo.run(function(result){
	console.log('done!');
});
```

or

```js
px2CopyContentsTo.dryrun(function(result){
	console.log('done!');
});
```

## ライセンス - License

MIT License


## 作者 - Author

- Tomoya Koyanagi <tomk79@gmail.com>
- website: <http://www.pxt.jp/>
- Twitter: @tomk79 <http://twitter.com/tomk79/>

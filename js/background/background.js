(function() {

	chrome.browserAction.onClicked.addListener(function(tab) {
		// クリップボードの中身を利用するため、ペーストコマンドを実行する。
		document.execCommand('paste');
	});

	document.addEventListener('paste', function(e) {
		e.preventDefault();

		var openCountLimit = 15;
		var openCount = 1;
		var urlArray = e.clipboardData.getData('text').split('\n');
		var url;

		for (var i = 0; i < urlArray.length; i++) {
			url = urlArray[i];
			if (url.match(new RegExp('^https?://'))) {
				
				// オープン上限数を超えた場合終わる
				if (openCountLimit < openCount) {
					alert('一度のオープン上限数を超えています。上限数=' + openCountLimit);
					return;
				}
				
				console.log(url);
				open(url);
				openCount++;
			}			
		}
	});

	function open(url) {
		var createProperties = {
			url : url
		};
		var createTabCallback = function() {
			return;
		};
		chrome.tabs.create(createProperties, createTabCallback);
	}
})();
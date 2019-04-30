/*------------------
 Reader Request
 -----------------*/
function clickAddReaderBtn() {
	var message = {
		fn: '0',
		dt: ''
	};

	document.querySelector('#regist_02 #secInValidateNumber_02').checked = true;
	document.querySelector('#submitOn input[type=submit]').click();

	chrome.extension.sendMessage(message);
}

function completeReaderRequest() {
	var message = {
		fn: '1',
		dt: ''
	};

	if (document.querySelector('#imgNumber') === null) {
		document.querySelector('#submitOn input[type=submit]').click();
		message.fn = '3';
	} else {
		message.dt = document.querySelector('#imgNumber').src;
	}

	chrome.extension.sendMessage(message);
}

function clickSubmit(inputImgData) {
	var message = {
		fn: '2',
		dt: ''
	}

	var input = document.querySelector('input#secInValidateNumber');
	input.value = inputImgData;
	document.querySelector('#submitOn input[type=submit]').click();

	chrome.extension.sendMessage(message);
}

function checkInput() {
	var message = {
		fn: '4',
		dt: ''
	};

	if (document.querySelector('#imgNumber') == null) {
		message.fn = '3';
	} else {
		message.dt = document.querySelector('#imgNumber').src;
	}

	chrome.extension.sendMessage(message);
}

/*------------------
 Good
 -----------------*/
function clickAddIineBtn() {
	var message = {
		fn: '6',
		dt: ''
	}

	// いいねセレクタ取得
	var good = document.querySelector('a._SRPdpszF');

	// いいねボタンが存在しない場合、いいね処理をスキップ
	if (good == null) {
		message.fn = '5';
	}
	// いいねリンクにいいね済みクラスがある場合、いいね処理をスキップ
	else if (good.classList.contains('_qnBfV007')) {
		message.fn = '7';
	} else {
		// 未いいねの場合、いいねリンクをクリックする
		good.click();
	}
	chrome.extension.sendMessage(message);
}

/*------------------
 Maintenance
 -----------------*/
function deleteReader(id) {
	var message = {
		fn: '8',
		dt: ''
	}

	var $linkLists = document.querySelectorAll('td.title a');

	if ($linkLists.length == 0) {
		message.fn = '9';
		return;
	}

	var $targetItem;

	$linkLists.forEach(function (item) {
		if (item.getAttribute('href') == 'https://ameblo.jp/' + id + '/') {
			$targetItem = item;
			return false;
		}
	});

	var $deleteBtn = $targetItem.parentNode.parentNode.querySelector('td.delete input');

	if ($deleteBtn.length == 0) {
		message.fn = '9';
		return;
	}

	$deleteBtn.click();

	var $yesBtn = document.querySelector('p.minimumApplyButton a');

	if ($yesBtn.length == 0) {
		message.fn = '9';
		return;
	}

	$yesBtn.click();

	chrome.extension.sendMessage(message);
}

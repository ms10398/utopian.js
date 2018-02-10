'use strict';

var utopian = {};

var API_HOST = 'https://api.utopian.io/api';
var ENDPOINT_MODERATORS = API_HOST + '/moderators';
var ENDPOINT_SPONSORS = API_HOST + '/sponsors';
var ENDPOINT_POSTS = API_HOST + '/posts';
var ENDPOINT_STATS = API_HOST + '/stats';

utopian.getModerators = function () {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: ENDPOINT_MODERATORS,
			success: function success(result) {
				resolve(result);
			},
			error: function error(xhr, status, _error) {
				reject(_error);
			}
		});
	});
};

utopian.getSponsors = function () {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: ENDPOINT_SPONSORS,
			success: function success(result) {
				resolve(result);
			},
			error: function error(xhr, status, _error2) {
				reject(_error2);
			}
		});
	});
};

utopian.getStats = function () {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: ENDPOINT_STATS,
			success: function success(result) {
				resolve(result);
			},
			error: function error(xhr, status, _error3) {
				reject(_error3);
			}
		});
	});
};

utopian.getModerator = function (username) {
	return new Promise(function (resolve, reject) {
		utopian.getModerators().then(function (moderators) {
			moderators.results.filter(function (moderator) {
				if (moderator.account === username && moderator.banned === false && moderator.reviewed === true) {
					resolve(moderator);
				}
			});
		}).catch(function (err) {
			return reject(err);
		});
	});
};

utopian.getSponsor = function (username) {
	return new Promise(function (resolve, reject) {
		utopian.getSponsors().then(function (sponsors) {
			sponsors.results.filter(function (sponsor) {
				if (sponsor.account === username) {
					resolve(sponsor);
				}
			});
		}).catch(function (err) {
			return reject(err);
		});
	});
};

utopian.getPosts = function () {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	if (options.limit > 20 || options.limit < 1) {
		options.limit = 20;
	}

	if (Object.keys(options).length === 0) {
		options.limit = 20;
		options.skip = 0;
	}
	ENDPOINT_POSTS += '?';
	for (var x in options) {
		ENDPOINT_POSTS = '' + ENDPOINT_POSTS + (x + '=' + options[x] + '&');
	}
	ENDPOINT_POSTS = ENDPOINT_POSTS.slice(0, -1);
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: ENDPOINT_POSTS,
			success: function success(result) {
				resolve(result);
			},
			error: function error(xhr, status, _error4) {
				reject(_error4);
			}
		});
	});
};

utopian.getTotalPostCount = function () {
	ENDPOINT_POSTS = ENDPOINT_POSTS + '?limit=1&skip=0';
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: ENDPOINT_POSTS,
			success: function success(result) {
				resolve(result.total);
			},
			error: function error(xhr, status, _error5) {
				reject(_error5);
			}
		});
	});
};

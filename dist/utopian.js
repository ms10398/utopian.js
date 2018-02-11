'use strict';

var utopian = {};

var API_HOST = 'https://api.utopian.io/api';
var ENDPOINT_MODERATORS = API_HOST + '/moderators';
var ENDPOINT_SPONSORS = API_HOST + '/sponsors';
var ENDPOINT_POST = API_HOST + '/posts';
var ENDPOINT_STATS = API_HOST + '/stats';
var GITHUB_REPO_URL = 'https://api.github.com/repos/';

/**
 * @method getModerators: Return the moderators of Utopian
 * @returns Promise object array of utopian moderators
 */
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

/**
 * @method getSponsors: Return the sponsors of Utopian
 * @returns Promise object array of utopian sponsors
 */
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

/**
 * @method getStats: Return the return utopian statistics
 * @returns Promise object array of utopian statistics
 */
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

/**
 * @method getModerator: Return the return specific data from a moderator
 * @argument {string} username: username of the moderator
 * @returns Promise object array of utopian moderators
 */
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

/**
 * @method getSponsor: Return the return specific data from a Sponsor
 * @argument {string} username: username of the sponsor
 * @returns Promise object array of utopian sponsor
 */
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

/**
 * @method getPosts: Return list of posts in a given query
 * @argument {Object}: query for the data
 * @returns Promise object array of posts
 */
utopian.getPosts = function () {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	if (options.limit > 20 || options.limit < 1) {
		options.limit = 20;
	}

	if (Object.keys(options).length === 0) {
		options.limit = 20;
		options.skip = 0;
	}
	var ENDPOINT_POSTS = ENDPOINT_POST;
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

/**
 * @method getTotalPostCount: Return count of all posts
 * @returns Promise type number
 */
utopian.getTotalPostCount = function () {
	var ENDPOINT_POSTS = ENDPOINT_POST;
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

/**
 * @method getPost: Return the post in a given query
 * @argument {string, string}: author and permlink of the post
 * @returns Promise object of post
 */
utopian.getPost = function (username, permlink) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: ENDPOINT_POST + '/' + username + '/' + permlink,
			success: function success(data) {
				resolve(data);
			},
			error: function error(xhr, status, _error6) {
				reject(_error6);
			}
		});
	});
};

/**
 * @method getPostURL: Return the post URL
 * @argument {string}: postID in blockchain
 * @returns Promise URL of the post
 */
utopian.getPostURL = function (postID) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: ENDPOINT_POST + '/byid/' + postID,
			success: function success(data) {
				resolve('https://utopian.io' + data.url);
			},
			error: function error(xhr, status, _error7) {
				reject(_error7);
			}
		});
	});
};

/**
 * @method getPostByAuthor: Return the posts
 * @argument {username, options}: username of author and limit and skip as options
 * @returns Promise Object of the posts
 */
utopian.getPostsByAuthor = function (username) {
	var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var ENDPOINT_POSTS = ENDPOINT_POST;

	if (options.limit > 20 || options.limit < 1) {
		options.limit = 20;
	}

	if (Object.keys(options).length === 0) {
		options.limit = 20;
		options.skip = 0;
	}
	options.section = 'author';
	options.author = username;
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
			error: function error(xhr, status, _error8) {
				reject(_error8);
			}
		});
	});
};

/**
* @method getGithubRepoIdByRepoName: Return github repo id by given github repo
* @argument {string} repoName: repository full name, i.e.: utopian-io/utopian-api-npm
* @returns Promise object array of posts
*/
function getGithubRepoIdByRepoName(repoName) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: '' + GITHUB_REPO_URL + repoName,
			success: function success(data) {
				resolve(data.id);
			},
			error: function error(xhr, status, _error9) {
				reject(_error9);
			}
		});
	});
}

/**
 * @method getPostsByGithubProject: Return list of posts related to given github repository
 * @argument {string} repoName: repository name, i.e.: utopian-io/utopian-api-npm
 * @argument {Object} options: options for the data (optional)
 * @returns Promise object array of posts
 */
utopian.getPostsByGithubProject = function (repoName, options) {
	return new Promise(function (resolve, reject) {
		return getGithubRepoIdByRepoName(repoName).then(function (projectId) {
			return utopian.getPosts(Object.assign({
				section: 'project',
				sortBy: 'created',
				platform: 'github',
				projectId: projectId,
				type: 'all'
			}, options || {})).then(resolve).catch(reject);
		}).catch(reject);
	});
};

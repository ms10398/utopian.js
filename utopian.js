let utopian = {}

const API_HOST = 'https://api.utopian.io/api'
const ENDPOINT_MODERATORS = API_HOST + '/moderators'
const ENDPOINT_SPONSORS = API_HOST + '/sponsors'
const ENDPOINT_POST = API_HOST + '/posts'
const ENDPOINT_STATS = API_HOST + '/stats'
const GITHUB_REPO_URL = 'https://api.github.com/repos/'


/**
 * @method getModerators: Return the moderators of Utopian
 * @returns Promise object array of utopian moderators
 */
utopian.getModerators = () => {
	return new Promise((resolve, reject) => {
		$.ajax(
		{
			url: ENDPOINT_MODERATORS,
			success: function(result) {
		        resolve(result);
		    },
		    error: function(xhr, status, error) {
		    	reject(error)
		    }
		})
	})
}


/**
 * @method getSponsors: Return the sponsors of Utopian
 * @returns Promise object array of utopian sponsors
 */
utopian.getSponsors = () => {
	return new Promise((resolve, reject) => {
		$.ajax(
		{
			url: ENDPOINT_SPONSORS,
			success: function(result) {
		        resolve(result);
		    },
		    error: function(xhr, status, error) {
		    	reject(error)
		    }
		})
	})
}

/**
 * @method getStats: Return the return utopian statistics
 * @returns Promise object array of utopian statistics
 */
utopian.getStats = () => {
	return new Promise((resolve, reject) => {
		$.ajax(
		{
			url: ENDPOINT_STATS,
			success: function(result) {
		        resolve(result);
		    },
		    error: function(xhr, status, error) {
		    	reject(error)
		    }
		})
	})
}

/**
 * @method getModerator: Return the return specific data from a moderator
 * @argument {string} username: username of the moderator
 * @returns Promise object array of utopian moderators
 */
utopian.getModerator = (username) => {
	return new Promise((resolve, reject) => {
		utopian.getModerators().then((moderators) => {
	    	moderators.results.filter((moderator) => {
			if (moderator.account === username && moderator.banned === false && moderator.reviewed === true) {
			  resolve(moderator)
			}
	  		})
		}).catch((err) => reject(err))
	})
}

/**
 * @method getSponsor: Return the return specific data from a Sponsor
 * @argument {string} username: username of the sponsor
 * @returns Promise object array of utopian sponsor
 */
utopian.getSponsor = (username) => {
  return new Promise((resolve, reject) => {
    utopian.getSponsors().then((sponsors) => {
      sponsors.results.filter((sponsor) => {
        if (sponsor.account === username) {
          resolve(sponsor)
        }
      })
    }).catch((err) => reject(err))
  })
}

/**
 * @method getPosts: Return list of posts in a given query
 * @argument {Object}: query for the data
 * @returns Promise object array of posts
 */
utopian.getPosts = (options={}) => {

  if (options.limit > 20 || options.limit < 1) {
    options.limit = 20
  }

  if (Object.keys(options).length === 0) {
    options.limit = 20
    options.skip = 0
  }
  let ENDPOINT_POSTS = ENDPOINT_POST
  ENDPOINT_POSTS+= '?';
  for(let x in options)
  {
  	ENDPOINT_POSTS = `${ENDPOINT_POSTS}` + `${x}=${options[x]}&`
  }
  ENDPOINT_POSTS = ENDPOINT_POSTS.slice(0,-1)
  return new Promise((resolve, reject) => {
	$.ajax(
		{
			url: ENDPOINT_POSTS,
			success: function(result) {
		        resolve(result);
		    },
		    error: function(xhr, status, error) {
		    	reject(error)
		    }
		})
	})
}

/**
 * @method getTotalPostCount: Return count of all posts
 * @returns Promise type number
 */
utopian.getTotalPostCount = () => {
  let ENDPOINT_POSTS = ENDPOINT_POST
  ENDPOINT_POSTS = `${ENDPOINT_POSTS}?limit=1&skip=0` 
  return new Promise((resolve, reject) => {
    $.ajax(
		{
			url: ENDPOINT_POSTS,
			success: function(result) {
		        resolve(result.total);
		    },
		    error: function(xhr, status, error) {
		    	reject(error)
		    }
		})
	})
}

/**
 * @method getPost: Return the post in a given query
 * @argument {string, string}: author and permlink of the post
 * @returns Promise object of post
 */
utopian.getPost = (username, permlink) => {
  return new Promise((resolve, reject) => {
		$.ajax(
		{
			url: `${ENDPOINT_POST}/${username}/${permlink}`,
			success: function(data) {
		  		resolve(data)
			},
			error: function(xhr, status, error) {
					reject(error)
			}
	  })
	})
}

/**
 * @method getPostURL: Return the post URL
 * @argument {string}: postID in blockchain
 * @returns Promise URL of the post
 */
utopian.getPostURL = (postID) => {
  return new Promise((resolve, reject) => {
		$.ajax(
		{
			url: `${ENDPOINT_POST}/byid/${postID}`,
			success: function(data) {
		  		resolve(`https://utopian.io${data.url}`)
			},
			error: function(xhr, status, error) {
					reject(error)
			}
	  })
	})
}

/**
 * @method getPostByAuthor: Return the posts
 * @argument {username, options}: username of author and limit and skip as options
 * @returns Promise Object of the posts
 */
utopian.getPostsByAuthor = (username, options={}) => {
  	let ENDPOINT_POSTS = ENDPOINT_POST

  if (options.limit > 20 || options.limit < 1) {
    options.limit = 20
  }

  if (Object.keys(options).length === 0) {
    options.limit = 20
    options.skip = 0
  }
  options.section = 'author'
  options.author = username
  ENDPOINT_POSTS+= '?';
  for(let x in options)
  {
  	ENDPOINT_POSTS = `${ENDPOINT_POSTS}` + `${x}=${options[x]}&`
  }
  ENDPOINT_POSTS = ENDPOINT_POSTS.slice(0,-1)
  return new Promise((resolve, reject) => {
	$.ajax(
		{
			url: ENDPOINT_POSTS,
			success: function(result) {
		        resolve(result);
		    },
		    error: function(xhr, status, error) {
		    	reject(error)
		    }
		})
	})
}

/**
* @method getGithubRepoIdByRepoName: Return github repo id by given github repo
* @argument {string} repoName: repository full name, i.e.: utopian-io/utopian-api-npm
* @returns Promise object array of posts
*/
function getGithubRepoIdByRepoName (repoName) {
  return new Promise((resolve, reject) => {
		$.ajax(
		{
			url: `${GITHUB_REPO_URL}${repoName}`,
			success: function(data) {
		  		resolve(data.id)
			},
			error: function(xhr, status, error) {
					reject(error)
			}
	  })
	})
}

/**
 * @method getPostsByGithubProject: Return list of posts related to given github repository
 * @argument {string} repoName: repository name, i.e.: utopian-io/utopian-api-npm
 * @argument {Object} options: options for the data (optional)
 * @returns Promise object array of posts
 */
utopian.getPostsByGithubProject = (repoName, options) => {
  return new Promise((resolve, reject) => {
    return getGithubRepoIdByRepoName(repoName)
      .then(projectId => {
        return utopian.getPosts(Object.assign({
          section: 'project',
          sortBy: 'created',
          platform: 'github',
          projectId,
          type: 'all'
        }, options || {})).then(resolve).catch(reject)
      }).catch(reject)
  })
}

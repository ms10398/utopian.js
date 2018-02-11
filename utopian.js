let utopian = {}

const API_HOST = 'https://api.utopian.io/api'
const ENDPOINT_MODERATORS = API_HOST + '/moderators'
const ENDPOINT_SPONSORS = API_HOST + '/sponsors'
let ENDPOINT_POSTS = API_HOST + '/posts'
const ENDPOINT_STATS = API_HOST + '/stats'


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

utopian.getPosts = (options={}) => {

  if (options.limit > 20 || options.limit < 1) {
    options.limit = 20
  }

  if (Object.keys(options).length === 0) {
    options.limit = 20
    options.skip = 0
  }
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

utopian.getTotalPostCount = () => {
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

utopian.getPost = (username, permlink) => {
  return new Promise((resolve, reject) => {
		$.ajax(
		{
			url: `${ENDPOINT_POSTS}/${username}/${permlink}`,
			success: function(data) {
		  		resolve(data)
			},
			error: function(xhr, status, error) {
					reject(error)
			}
	  })
	})
}

utopian.getPostURL = (postID) => {
  return new Promise((resolve, reject) => {
		$.ajax(
		{
			url: `${ENDPOINT_POSTS}/byid/${postID}`,
			success: function(data) {
		  		resolve(`https://utopian.io${data.url}`)
			},
			error: function(xhr, status, error) {
					reject(error)
			}
	  })
	})
}

utopian.getPostsByAuthor = (username, options={}) => {

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



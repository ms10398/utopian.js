let utopian = {};

const API_HOST = 'https://api.utopian.io/api'
const ENDPOINT_MODERATORS = API_HOST + '/moderators'
const ENDPOINT_SPONSORS = API_HOST + '/sponsors'
const ENDPOINT_POSTS = API_HOST + '/posts'
const ENDPOINT_STATS = API_HOST + '/stats'


utopian.getModerators = () => {
	return new Promise((resolve, reject) => {
		$.ajax(
		{
			url: ENDPOINT_MODERATORS,
			success: function(result) {
		        console.log(result)
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
		        console.log(result)
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



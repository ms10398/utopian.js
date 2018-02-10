/**
 * Unit test for the existing functions in the library.
 * Some fields are testing for assertion of data type.
 * 
 * @author Jayser Mendez
 * @version 0.0.1
 */

'use strict';
var assert = chai.assert;
var expect = chai.expect;

describe('Function to get moderators', function () {
      it('should return an object with an array called result which holds objects or empty array', function () {

            return utopian.getModerators()
                  .then(function(moderators) {
                        expect(moderators).to.be.a('object');
                        expect(moderators.results).to.be.a('array');
                        expect(moderators.total).to.be.a('number');
                  });
      });
});

describe('Function to get sponsors', function () {
      it('should return an object with an array called result which holds objects or empty array', function () {

            return utopian.getSponsors()
                  .then(function(sponsors) {
                        expect(sponsors).to.be.a('object');
                        expect(sponsors.results).to.be.a('array');
                        expect(sponsors.total).to.be.a('number');
                  });
      });
});

describe('Function to get stats', function () {
      it('should return an object with an attribute named stats', function () {

            return utopian.getStats()
                  .then(function(stats) {
                        expect(stats).to.be.a('object');
                        expect(stats.stats).to.be.a('object');
                        expect(stats.stats.bot_is_voting).to.be.a('boolean');
                  });
      });
});

describe('Function to get moderator data', function () {
      it('should return an object with fields of the user profile', function () {

            return utopian.getModerator('ms10398')
                  .then(function(moderator) {
                        expect(moderator).to.be.a('object');
                        expect(moderator.account).to.be.a('string');
                        expect(moderator.banned).to.be.a('boolean');
                  });
      });
});

describe('Function to get a single sponsor data', function () {
      it('should return an object with fields of the sponsor profile', function () {

            return utopian.getSponsor('yabapmatt')
                  .then(function(sponsor) {
                        expect(sponsor).to.be.a('object');
                        expect(sponsor.account).to.be.a('string');
                        expect(sponsor.is_witness).to.be.a('boolean');
                  });
      });
});

describe('Function to get posts', function () {
      it('should return an object with an array called result which holds objects or empty array', function () {

            return utopian.getPosts()
                  .then(function(posts) {
                        expect(posts).to.be.a('object');
                        expect(posts.results).to.be.a('array');
                        expect(posts.total).to.be.a('number');
                  });
      });
});

describe('Function to get posts count', function () {
      it('should return a number with the count of the post', function () {

            return utopian.getTotalPostCount()
                  .then(function(count) {
                        expect(count).to.be.a('number');
                  });
      });
});
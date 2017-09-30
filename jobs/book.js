/*
List of jobs
*/

var user_rating = require('./user_rating')
var user_contacts = require('./user_contacts')

exports.jobs = {
    'getUserRating' : user_rating.getUserRating
    ,'getUserContacts' : user_contacts.getUserContacts
}


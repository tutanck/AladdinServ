/*
List of jobs
*/

var user_rating = require('./user_rating')
var user_contacts = require('./user_contacts')
var user_context = require('./user_context')

exports.jobs = {
    'getUserRating' : user_rating.getUserRating
    ,'getUserContacts' : user_contacts.getUserContacts
    ,'getUserContext' : user_context.getUserContext
}


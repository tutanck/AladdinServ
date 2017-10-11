/*
List of jobs
*/

var user_rating = require('./user_rating')
var user_contacts = require('./user_contacts')
var messages = require('./messages')

exports.jobs = {
    'getUserRating' : user_rating.getUserRating
    ,'getUserContacts' : user_contacts.getUserContacts
    ,'sendMessage' : messages.sendMessage
}


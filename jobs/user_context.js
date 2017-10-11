

var user_contacts = require('./user_contacts')

var user_rating = require('./user_rating')

var coll = 'PROFILES'

exports.getUserContext = (regina, bundle) => {
    console.log("job::getUserContext is running with bundle = "+JSON.stringify(bundle))
    
    let pipeline =  
    [
        { 
            $match: {
                id: bundle.userID                
            } 
        }
    ];
    
    return regina.get(coll).aggregate(pipeline,{}); 
}

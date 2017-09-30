/*
'user_rating' collection's pipeliner
*/

var coll = 'USER_RATING'

exports.getUserRating = (regina, bundle) => { 
    console.log("job::getUserRating is running with bundle = "+JSON.stringify(bundle))
    let pipeline =  
    [
        { 
            "$match": {
                "toID": bundle.userID
            } 
        },
        {
            "$group": {
                "_id" : "$toID"
                ,"nbStars" : { "$sum": "$rating" }
                ,"nbVoters": { "$sum": 1 }
            }
        },
        {
            "$project": {
                "nbStars": 1,
                "nbVoters": 1,
                "reputation": { 
                    "$divide": ["$nbStars", "$nbVoters"]
                }
            }
        }
    ];

    return regina.get(coll).aggregate(pipeline,{});
}
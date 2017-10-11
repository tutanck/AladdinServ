/*
'messages' collection's pipeliner
*/

var coll = 'MESSAGES'

exports.getUserContacts = (regina, bundle) => { 
    console.log("job::getUserContacts is running with bundle = "+JSON.stringify(bundle))
    
    let pipeline =  
    [
        {
            $project: {
                "senderID": 1, "toID": 1
            }
        },
        { 
            $match: {
                "$or" :
                [
                    {"senderID": bundle.userID},
                    {"toID": bundle.userID}
                ]
                
            } 
        },
        { 
            $group :
            {
                "_id":null
                ,"senders":{"$addToSet":"$senderID"}
                ,"recipients":{"$addToSet":"$toID"}
            }
        },
        { 
            $project : {
                "_id":{"$setUnion":["$senders","$recipients"]}
            }
        },
        {
            $project: {
                "_id" : {
                    $filter: {
                        input: "$_id",
                        as: "uid",
                        cond: {  $ne: [ "$$uid", bundle.userID ]  }
                    }
                }
            }
        },
        {
            $unwind : "$_id" 
        },
        {
            $lookup:
            {
                from: "PROFILES",
                localField: "_id",
                foreignField: "id",
                as: "profile"
            }
        },
        {
            $project: {
                "profile": 1, "_id": 0
            }
        },
        {
            $unwind : "$profile" 
        }
    ];
    
    return regina.get(coll).aggregate(pipeline,{});
}
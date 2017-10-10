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
                "idList":{"$setUnion":["$senders","$recipients"]}
            }
        },
        {
            $project: {
                "idList" : {
                  $filter: {
                     input: "$idList",
                     as: "uid",
                     cond: {  $ne: [ "$$uid", bundle.userID ]  }
                  }
               }
            }
         }
    ];
    
    return regina.get(coll).aggregate(pipeline,{});
}
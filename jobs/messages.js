var coll = 'MESSAGES'

exports.sendMessage = (regina, bundle) => {
    console.log("job::sendMessage is running with bundle = "+JSON.stringify(bundle))
    
     bundle.date = new Date();
    
    return regina.get(coll).insert(bundle,{}); 
}

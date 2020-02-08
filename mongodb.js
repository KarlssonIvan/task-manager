const mongodb = require('mongodb')
const {MongoClient, ObjectID} = mongodb

const connectionUrl = 'mongodb://127.0.0.1:27017'
const database = 'task-manager'

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log(`unable to connect to database due to ${error}`)
    }
    const db = client.db(database)
    // const updatePromise = db.collection('users').updateOne({
    //     '_id': new ObjectID("5e231572fabace0912e0ccb7")
    //     }, {
    //         $set: {
    //             name: 'Karlsson'
    //         }
    // })
    // const updatePromise = db.collection('users').updateOne({
    //     '_id': new ObjectID("5e231572fabace0912e0ccb7")
    // }, {
    //     $inc: {
    //         age: 3
    //     }
    // })
    const updatePromise = db.collection('tasks').updateMany({
        'completed': false
    }, {
        $set: {
            completed: true
        }
    })
    updatePromise.then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log({error})
    })
    
    const deletePromise = db.collection('tasks').deleteOne({
        descriptiom: 'task one'
    })
    deletePromise.then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log({ error })
    })
})
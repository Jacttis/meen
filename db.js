const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'peliculas'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (item) => {
  const collection = db.collection('movies')
  return collection.insertOne(item)
}


const getPelis = (input) => {
  // hardcodeado: peliculas con "Toy" en el titulo
  const filter = {
    $or:[
   {'title':{$regex: input}},
   {'fullplot':{$regex:input}},
   {'cast':{$in:[input]}}
    ]
  };
  const projection = {
    'title': 1, 
    '_id': 0,
    'year':1,
    'imdb.rating':1,
    'tomatoes.critic.rating':1,
    'metacritic':1
  };
  const coll = db.collection('movies');
  const cursor = coll.find(filter, { projection });
  const result = cursor.toArray();
  return result;
}

const getPelisHard = () => {
  // hardcodeado: peliculas con "Toy" en el titulo
  const filter = {
    $and:[{cast:{$in:['Leonardo DiCaprio']}},{cast:{$in:['Robert De Niro']}}],
    year:{$lte:1995}
  };
  const projection = {
    'title': 1, 
    '_id': 0,
    'year':1,
    'imdb.rating':1,
    'tomatoes.critic.rating':1,
    'metacritic':1
  };
  const coll = db.collection('movies');
  const cursor = coll.find(filter, { projection });
  const result = cursor.toArray();
  return result;
}


module.exports = { init, insertItem, getPelis,getPelisHard }

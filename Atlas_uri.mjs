// atlas_uri.mjs
//const mongodbUri = "mongodb+srv://aipectowner:Sultan7872@cluster0.q7hzrsw.mongodb.net/?retryWrites=true&w=majority";




const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.q7hzrsw.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(mongodbURI);
const database = client.db('ecom');
const productsCollection = database.collection('products');
export default mongodbUri;
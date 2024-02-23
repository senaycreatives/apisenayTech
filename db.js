const mongoose = require('mongoose');
const databaseUrl = process.env.DATABASE_URL;
'mongodb+srv://andifab23:A9ie9sBRLCXkxXPc@cluster0.hhskedx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/telgrambot'
async function connect() {
    try{
    const result = await mongoose.connect(databaseUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
return result    
}
    catch(err){
       throw new Error(err)
    }
}
module.exports = {connect}
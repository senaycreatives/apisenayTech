const mongoose = require('mongoose');
async function connect() {
    try{
    const result = await mongoose.connect('mongodb+srv://andifab23:A9ie9sBRLCXkxXPc@cluster0.hhskedx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/telgrambot',{
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
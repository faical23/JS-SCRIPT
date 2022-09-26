
        const mongoose = require('mongoose');
const Support = mongoose.Schema({
},{timestamps:true})
mongoose.model('Support',Support);
module.exports = mongoose.model('Support',Support );
        
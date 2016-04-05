var mongoose = require('mongoose')
    Schema = mongoose.Schema

var GardenSchema = new Schema({
  joinDate: { type: Date, default: Date.now },
  address: String,
  name: String,
  description: String,
  gardeners: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  coords: {
      latitude: Number,
      longitude: Number,
      id: Number
    },
})

var Garden = mongoose.model('Garden', GardenSchema);

module.exports = Garden;
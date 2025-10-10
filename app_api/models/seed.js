const mongoose = require('./db'); // starts connect attempt
const Trip = require('./travlr'); // model

mongoose.connection.once('open', async () => {
  try {
    await Trip.deleteMany({});
    const fs = require('fs');
    const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));
    await Trip.insertMany(trips);
    console.log('Seed complete');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
});

const client = require('./client.cjs');
const createRestaurant = async(restaurantName) => {
  try{
    await client.query(`
      INSERT INTO restaurants (name)
      VALUES ('${restaurantName})';
    `);
    } catch(err) {
      console.log(err);

    }
}

module.exports = {
  createRestaurant
}
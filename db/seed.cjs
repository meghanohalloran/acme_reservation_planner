const client = require('./client.cjs');
const { createCustomer } = require('/.customers.cjs');
const { createRestuarant } = require('/.restaurant.cjs');
const { createReservation } = require('/.reservation.cjs');

const dropTables = async() => {
try {

await client.query(`
  DROP TABLE IF EXISTS reservations;
  DROP TABLE IF EXISTS customers; 
  DROP TABLE IF EXISTS restaurants; 
  
  `);
} catch(err) {

}
  console.log('drop tables');
}

const createTables = async() => {

  try {
    await client.query(`
      CREATE TABLE customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
      );
  
      CREATE TABLE restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
    );

    CREATE TABLE reservations (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
       party_count INTEGER NOT NULL,
      restaurant_id INTEGER REFERENCES restaurants(id), NOT NULL,
      customer_id INTEGER REFERENCES customers(id), NOT NULL
  );
    `);
    console.log('create tables');
  } catch(err) {
    console.log(err);
  }
  
}
const syncAndSeed = async() => {

  await client.connect();
  console.log('connected to the db');

  await dropTables();
  await createTables();
  await createCustomer('bob');
  await createCustomer('ann');
  await createCustomer('tom');
  await createCustomer('mary');
  console.log('created customers');


  console.log('CREATING RESTAURANTS');
  const oliveGarden = await oliveGarden ('Olive Garden');
  const redLobster = await createRestaurant('Red Lobster');
  const outback = await createRestaurant('Outback');
  const cityWalk = await createRestaurant('City Walk');
  const texasRoadhouse = await createRestuarant('TexasRoadhouse');
  console.log('RESTAURANTS CREATED');
  
  console.log('CREATING RESERVATIONS');
  // console.log(new Date(2025, 1, 22).toISOString().slice(0,19).replace('T', ''));
  await createReservation('2025-02-22',4, 1, 1 );
  await createReservation('2025-03-22',2, 2, 1 );
  await createReservation('2025-02-22',3, 1, 2 );
  await createReservation('2025-02-25',5, 3, 3 );
  await createReservation('2025-03-03',3, 4, 3 );
  console,log('RESERVATIONS CREATED')

  await client.end();
  console.log('disconnect db');
}

syncAndSeed();


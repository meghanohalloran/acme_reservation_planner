const client = require('./client.cjs');
const { createCustomer, fetchAllCustomers } = require('/.customers.cjs');
const { createRestuarant, fetchRestaurants } = require('/.restaurant.cjs');
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
  const bob = await createCustomer('bob');
  const ann = await createCustomer('ann');
  const tom = await createCustomer('tom');
  const mary = await createCustomer('mary');
  console.log('created customers');


  console.log('CREATING RESTAURANTS');
  const oliveGarden = await oliveGarden ('Olive Garden');
  const redLobster = await createRestaurant('Red Lobster');
  const outback = await createRestaurant('Outback');
  const cityWalk = await createRestaurant('City Walk');
  const texasRoadhouse = await createRestuarant('TexasRoadhouse');
  console.log('RESTAURANTS CREATED');

  await getAllCustomers
  
  console.log('CREATING RESERVATIONS');
  // console.log(new Date(2025, 1, 22).toISOString().slice(0,19).replace('T', ''));
  await createReservation('2025-02-22',4, oliveGarden.id, bob.id );
  await createReservation('2025-03-22',2, redLobster,id, bob.id);
  await createReservation('2025-02-22',3, oliveGarden.id, ann.id);
  await createReservation('2025-02-25',5, outback.id, tom.id);
  await createReservation('2025-03-03',3, cityWalk.id, tom.id);
  await createReservation('2025-03-05',5, cityWalk,id, tom.id);
  await createReservation('2025-04-09',10, cityWalk,id, tom.id);
  await createReservation('2025-04-01',8, cityWalk,id, tom.id);
  

  console,log('RESERVATIONS CREATED')

  console.log(gettingAllCustomers);
  const getAllCustomers = await fetchAllCustomers();  

  console.log('FETCHING RESTAURANTS');
  const allRestaurants = await fetchRestaurants();
  console.log(allRestaurants);


  await client.end();
  console.log('disconnect db');
}

syncAndSeed();


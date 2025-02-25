const client = require('./client.cjs');

const dropTables = async() => {
try {

await client.query(`
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
      restaurant_id INTEGER REFERENCES restaurants(id),
      customers_id INTEGER REFERENCES customers(id)
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

  


  await client.end();
  console.log('disconnect db');
}

syncAndSeed();


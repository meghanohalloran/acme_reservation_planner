const client = require('./client.cjs');
const createCustomer = async (customerName) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO customers (name)
      VALUES ('${customerName}');
      );
    `);

    const customer = rows[0];
      return customer;

  } catch (err) {
    console.log(err);
  }
};


const fetchAllCustomers = async() => {
  try {
    const { rows: retrievedCustomers } = await client.query(`
      
      SELECT * FROM customers');
  `);

    
      // console.log(rows);
      // console.log(retrievedCustomers);
      return retrievedCustomers;
     } catch(err) {
      console.log(err);
}; 

module.exports = {
  createCustomer,
  getAllCustomers
  }
}
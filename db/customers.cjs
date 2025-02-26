const client = require('./client.cjs');
const createCustomer = async (customerName) => {
  try {
    await client.query(`
      INSERT INTO customers ()
      VALUES ('${customerName}');
      );
    `);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createCustomer
};
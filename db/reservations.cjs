const client = require('./client.cjs');
const createReservation = async(reservationDate, partyCount, restaurantID, customerID) => {
  console.log('CREATING RESERVATION')
}
try {
  await client.query(`
    INSERT INTO reservations )date, party_countid, customer_id);
    VALUES('${reservationDate}', ${partyCount}, ${restaurantID}, ${customerId})

    `)


}catch(err)
  console.log(err);

Module.EXPORTS = {
  createReservation
}
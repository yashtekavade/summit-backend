// Import necessary modules
import { ObjectId } from "mongodb";
// Declare a variable to hold the database connection
let cluster0;


export default class summitDAO {
  // Method to inject the database connection
  static async InjectDB(conn) {
    // If the connection is already established, return
    if (cluster0) {
      return;
    }
    try {
      // Establish a connection to the database
      cluster0 = await conn.db("summit");
    } catch (e) {
      // Log any errors that occur during connection
      console.error(
        `Unable to establish a collection handle in summitDAO: ${e}`
      );
    }
  }

  async register(result) {
    try {
      // Insert the registration details into the database
      let sportsSelection = result.sportsConfirm

      const status = await cluster0.collection(`register_${sportsSelection}`).insertOne(result);
      if (status.insertedCount === 0) {
        throw new Error("Unable to register");
      }else{
        return { status: "success" };
      }
      } catch (e) {
      // Log any errors that occur during insertion
      console.error(`Unable to register: ${e}`);
      return { error: e };
    }
  }

 
}

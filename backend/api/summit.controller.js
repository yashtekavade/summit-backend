// Import necessary modules and initialize DAO
import summitDAO from "../dao/summitDAO.js";
import sendEmail from "../sendmail.js";
const dao = new summitDAO(); // Create a new instance of the LuxuriantDAO class



export default class summitController {

  static async apiRegister(req, res) {
    try{
      const details = req.body

      console.log(details);  
      const register = await dao.register(details);
      if (register.status == "success"){
        const sendMail = await sendEmail(details);
        if (sendMail){
          res.json({message: "success", mail: "success"});
        }else{
          res.json({mail:"failure"});
        }
        // res.json({message: "success"});
      }else{
        res.json({message: "failure"});
      }
    }catch(e){
      console.log(e)
      res.status(500).json({ error: e.message });
    }


  }

}
// Import necessary modules and initialize DAO
import summitDAO from "../dao/summitDAO.js";
import sendEmail from "../sendmail.js";
const dao = new summitDAO();



export default class summitController {

  static async apiRegister(req, res) {
    try{
      const details = req.body
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

  static async apiGetDetails(req, res) {
    try{
      const sports = req.body.title
      console.log(sports)
      const getDetails = await dao.getDetails(sports);
      if (getDetails){
        res.json(getDetails);
      }else{
        res.json({message: "failure"});
      }
    }catch(e){
      console.log(e)
      res.status(500).json({ error: e.message });
    }
  }

}
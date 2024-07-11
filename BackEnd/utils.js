const axios =require("axios");
const moment = require('moment');
const getProductsSale = (req,res) => {
   axios.get(`${process.env.BASE_URL}phone`).then((respone) => {
      const phone =respone.data[0];
      const currentTime = moment();

      const phoneStartSell = moment(phone.timeStartSell, 'DD/MM/YYYY HH:mm:ss');
      const phoneEndSell = moment(phone.timeEndSell, 'DD/MM/YYYY HH:mm:ss');
  
      if(currentTime.isBetween(phoneStartSell, phoneEndSell))
      {
         res.status(200).send(phone);

      }
      else{
         res.sendStatus(204);
      }
      
   }).catch((err) => {
      console.log(err)
      res.status(500).send("server error");
   });
};



const RegisterSale  = (req,res) => {

   const phone = req.body.phone;
   if(!phone||phone?.length>20)
   {
      console.log(err)
      res.status(500).send("SDT không đúng")
   }
   axios.get(`${process.env.BASE_URL}phoneGetSale?phone=${phone}`).then((respone) => {
      if(respone.data.length>0)
      {
         res.status(400).send("Số điện thoại này đã được đăng ký")
      }
      else
      {
         axios.post(`${process.env.BASE_URL}phoneGetSale`,{phone}).then((e)=>{
            res.send("Thành công")
         }).catch((err)=>{
            console.log(err)
            res.status(500).send("server error")})
      }
   }).catch((err) => {
      console.log(err)
      res.status(500).send("server error");
   });

  
};
module.exports={getProductsSale,RegisterSale}
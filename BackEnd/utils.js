const axios =require("axios");

const getProductsSale = (req,res) => {
   axios.get(`${process.env.BASE_URL}phone`).then((respone) => {
      res.status(200).send(respone.data[0]);
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
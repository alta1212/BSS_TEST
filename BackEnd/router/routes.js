const express=require("express");
const router=express.Router();
const utils=require('../utils')


router.get('/getFlashSellProduct',utils.getProductsSale);
router.post('/getSale',utils.RegisterSale);
module.exports= router ;

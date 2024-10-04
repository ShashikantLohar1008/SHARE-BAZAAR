const {model}=require("mongoose");

const {OrdersSchema}=require("../schemas/OrderSchema");

const OrdersModel=new model("Orders",OrdersSchema);

module.exports={OrdersModel};
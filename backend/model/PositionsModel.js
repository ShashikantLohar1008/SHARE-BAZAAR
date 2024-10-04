const {model}=require("mongoose");

const {PositionsSchema}=require("../schemas/PositionSchema");

const PositionsModel=new model("positions",PositionsSchema);

module.exports={PositionsModel};
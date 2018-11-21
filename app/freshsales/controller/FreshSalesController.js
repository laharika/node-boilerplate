'use strict';

let { success, error } = require("../../../utils/ResponseWrapperUtils");
let { notNull, isNull } = require("../../../utils/ObjectUtils");
let FreshSales = require("../service/FreshSalesService");

let FreshSalesController = {

  test: async (req, res) => {
    try{
      let freshClient = await FreshSales.getAsyncFresh(FreshSales.getServer(), FreshSales.getApiKey());
      let output = await FreshSales.test(freshClient);
      return success(res, output);
    }catch(err){
      console.log("Oops! Some error occurred!!", err);
      return error(err);
    }
  }

};

module.exports = FreshSalesController;

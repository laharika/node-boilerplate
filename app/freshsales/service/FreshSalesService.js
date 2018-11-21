const Promise   = require('bluebird');
const Freshsales = require('freshsales-api');
const request = require('request');
const freshSalesConfig = require("../../../config/local/freshsales.config.json");

let FreshSalesService = {

  getServer: function(){
		return freshSalesConfig.server;
	},

	getApiKey: function(){
		return freshSalesConfig.apikey;
	},

  getAsyncFresh: function(server, apiKey){
		let asyncFreshConn = Promise.promisifyAll(
		    new Freshsales(server, this.getAuthHeaders(apiKey))
		);
    console.log(asyncFreshConn);
		return asyncFreshConn;
	},

  getAuthHeaders: function(apiKey){
		let auth = {  api_key: apiKey };
		return auth;
	},

  makeRequest: function (method, auth, url, qs, data) {		// eslint-disable-line max-params
		return new Promise(function(resolve, reject){
      console.log("method: ",method, " auth: ", auth, " url: ", url);
			const options = {
				method: method,
				headers: {
					'Content-Type': 'application/json',
					'Authorization': auth
				},
				url: url,
				qs: qs
			}
			if(data) {
				options.body = JSON.stringify(data)
			}

			request(options, function(error, response, body){
				if (error) {
					return reject(error);
				}
				if(response.statusCode >= 200 && response.statusCode <=300){
					return resolve(JSON.parse(body));
				}else{
					if(response){
						return reject(
							{"name": "FreshSalesError",
							"statusCode": response.statusCode,
							"message": response.statusMessage}
						);
					}else{
						return reject({"name": "FreshSalesError"});
					}
				}
			})
		});
	},

  test: async function(freshClient){
  		let requester = await this.makeRequest('GET', freshClient.authorization, "https://effy-renmoney.freshsales.io/api/leads/4006816812");
  		if(requester){
        console.log(requester);
  			return requester;
  		}
  		return null;
  	}
}

module.exports = FreshSalesService;

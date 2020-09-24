import request from '@/utils/request.js';
import qs from "qs"
// function GetCategory( ){
// 	return new Promise((resolve,reject)=>{
// 		request.get("/mi/category.php",
			 
// 		 )
// 		.then(res=>{resolve(res)})
// 		.catch(err=>reject(err))
// 	})
// }
 
 /**
  * 获取产品页面具体数据
  * @param {Object} data eg:{id:1354252}
 */
// function GetProduce(data){
// 	return new Promise((resolve,reject)=>{
// 		request.get("/mi/product.php",
// 			 {params:data}
// 		 )
// 		.then(res=>{resolve(res)})
// 		.catch(err=>reject(err))
// 	})
// }
function GetData(){
	return new Promise((resolve,reject)=>{
		request.get("https://www.520mg.com/table")
		.then(res=>{resolve(res)})
		.catch(err=>reject(err))
	})
	
	}

export {GetData};
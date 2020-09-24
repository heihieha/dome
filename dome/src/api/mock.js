import mock from 'mockjs'

// 使用mock拦截ajax请求  当请求该路由时 会执行匿名函数
mock.mock("index", function(){
	let result = [];
	for( let i=0;i< (Math.floor(Math.random()*20) +5); i++){
		let obj = {
			img:mock.Random.image('250x250'),
			name:mock.Random.datetime(),
			desc:mock.Random.ctitle(20),
			price:mock.Random.float(60, 100)
		}
		result.push(obj);
	}
	return result
})
mock.mock("https://www.520mg.com/table", function(){
	let result = [];
	for( let i=0;i< 100; i++){
		let obj = {
			OrderNum:mock.Random.integer(10000),
			createAt:mock.Random.ctitle(),
			customerId:mock.Random.increment(1800000),
			totalAmount:mock.Random.float(160, 300, 1, 2),
			storeName:mock.Random.cword(4),
			status:mock.Random.natural(0, 6),
		}
		result.push(obj);
	}
	return result
	
	
})
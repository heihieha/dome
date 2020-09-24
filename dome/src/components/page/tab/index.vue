<template>
	<div class="tab">
		<template>
			<div class="top">
				<div>
					配送方式
					<el-radio v-model="radio" label="1">全部</el-radio>
					<el-radio v-model="radio" label="2">自提配送</el-radio>
					<el-radio v-model="radio" label="3">配送</el-radio>
				</div>
				<div class="it">
					<div class="ink"><span>订单编号</span><input class="inp" v-model="input" placeholder="订单编号"></input></div>
					<div class="ink"><span>商品编号</span><input class="inp" v-model="input1" placeholder="商品编号"></input></div>
					<div class="ink"><span>所属门店</span><input class="inp" v-model="input2" placeholder="所属门店"></input></div>
				</div>
				<div class="it">
					<div class="ink"><span>会员账号</span><input class="inp" v-model="input3" placeholder="会员账号"></input></div>
					<div class="ink"><span>收货人 </span><input class="inp" v-model="input4" placeholder="收货人"></input></div>
					<div class="ink"><span>下单时间</span><input class="inp date" type="date" v-model="date"></input><input class="inp date"
						 type="date" v-model="date1"></input></div>
				</div>
				<div class="right">
					<el-button type="primary" @click="Cha()">查询</el-button>
					<el-button type="primary" @click="dele(tableData)">删除多个</el-button>
				</div>
			</div>
			<el-table ref="multipleTable" :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
			 tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border height="400" @select="dian">
				<el-table-column type="selection" width="40" align='center' >
				</el-table-column>
				<el-table-column prop="OrderNum" label="订单日期" width="200">
				</el-table-column>
				<el-table-column prop="createAt" label="姓名" width="200">
				</el-table-column>
				<el-table-column prop="customerId" label="会员编号" width="200">
				</el-table-column>
				<el-table-column prop="totalAmount" label="订单总额" width="200">
				</el-table-column>
				<el-table-column prop="storeName" label="所属门店" width="200">
				</el-table-column>
				<el-table-column label="订单状态" width="150">
					<template slot-scope="scope">
						<div v-if="scope.row.status===0" class="red">已付款</div>
						<div v-else-if="scope.row.status===1" class="red">待付款</div>
						<div v-else-if="scope.row.status===2" class="red">待发货</div>
						<div v-else-if="scope.row.status===3" class="red">待收货</div>
						<div v-else-if="scope.row.status===4" class="red">已完成</div>
						<div v-else-if="scope.row.status===5">待退款</div>
						<div v-else-if="scope.row.status===6">已退款</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="120">
					<template slot-scope="scope">
						<div class="ss" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-search"></i>查询订单</div>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			 :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="this.tableData.length">
			</el-pagination>
			<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
				<div >
					<el-input v-model="list.OrderNum" placeholder="请输入内容"></el-input>
					<el-input v-model="list.createAt" placeholder="请输入内容"></el-input>
					<el-input v-model="list.customerId" placeholder="请输入内容"></el-input>
					<el-input v-model="list.storeName" placeholder="请输入内容"></el-input>
					<el-input v-model="list.totalAmount" placeholder="请输入内容"></el-input>
				</div>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="dialogVisible = false,tian()">确 定</el-button>
				</span>
			</el-dialog>
		</template>
	</div>
</template>

<script>
	import mock from '@/api/mock.js'
	import {
		GetData
	} from '@/api/request.js'
	export default {
		data() {
			return {
				list:{},
				id:-1,
				tableData: [],
				multipleSelection: [],
				arr: [],
				add:[],
				radio: 1,
				input: '',
				input1: '',
				input2: '',
				input3: '',
				input4: '',
				date: '',
				date1: '',
				pageSize: 10,
				currentPage: 1,
				dialogVisible:false
			}
		},
		created() {
			this.data()
		},
		watch: {
			input: function(e, v) {
				console.log(e, v)
				if (e === '') {
					this.data()
				}
			}
		},
		methods: {
			dian(selection,row){
				// console.log(row,this.add)
				this.add.push(row)
			},
			dele(row){
				// let arr = []
				this.add.forEach(item=>{
					this.arr.push(item.customerId)
				})
				console.log(this.add,this.arr)
				this.tableData = row.filter(item=>{
					return this.arr.indexOf(item.customerId) < 0
				})
				// row.splice(this.add[0].customerId,i)
				// row.forEach(item=>{
				// 	row.splice(this.add[0].customerId,i)
					
				// })
			},
			tian(){
				let id = this.id
				this.tableData.splice(id,1,this.list)
			},
			handleEdit(index, row) {
				this.id = index
				this.dialogVisible = true
				this.list = JSON.parse(JSON.stringify(row))
			},
			handleClose(done) {
				this.$confirm('确认关闭？')
					.then(_ => {
						done();
					})
					.catch(_ => {});
			},
			Cha() {
				let _sea = this.input.toLowerCase()
				let _sea1 = this.input1.toLowerCase()
				let _sea2 = this.input2.toLowerCase()
				let newData = []
				if (!_sea || !_sea1 || !_sea2) {
					this.data()
				} else {
					this.tableData.filter(item => {
						if (item.OrderNum.toString().indexOf(_sea) != -1 || item.customerId.toString().indexOf(_sea1) != -1 || item.storeName
							.toString().indexOf(_sea2) != -1) {
							newData.push(item)
						}
					})
				}

				this.tableData = newData;
			},
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
				this.pageSize = val;
				this.data(this.criteria, this.currentPage, this.pageSize);
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
				this.currentPage = val;
				this.data(this.criteria, this.currentPage, this.pageSize);
			},
			data() {
				GetData()
					.then(res => {
						// console.log(res.data)
						this.tableData = res.data
						this.$emit('data', this.tableData)

					})
					.catch(err => console.log(err))
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}
		}

	}
</script>

<style lang="less">
	.top {
		position: relative;
		padding-bottom: 20px;
	}

	.right {
		position: absolute;
		top: 30px;
		right: 10px;
	}

	.ink {
		display: inline-block;
	}

	.date {
		width: 39% !important;
	}

	.inp {
		width: 70%;
		height: 30px;
		margin-left: 10px;
		padding-left: 5px;
		border-radius: 5px;
		border: #CCCCCC 1px solid;
	}

	.it {
		padding-top: 20px;
	}

	.top {
		text-align: left;
		font-size: 16px;
	}

	.el-tabs__content {
		height: 700px !important;
		padding: 0 20px;
	}

	.red {
		color: #FF0000;
	}

	.ss {
		color: #0000FF;
		text-decoration: underline;
		font-size: 14px;
		cursor: pointer;
	}
</style>

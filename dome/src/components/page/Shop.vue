<template>
	<div>
		<template>
			<el-tabs tab-position="top" style="height: 200px;" @tab-click="handleClick">
				<el-tab-pane :label="'当日订单('+this.sum.str+')'">
					<tab v-on:data="data"></tab>
				</el-tab-pane>
				<el-tab-pane :label="'待付款(' + this.sum.str1/100 + ')'">
					<tabDa></tabDa>
				</el-tab-pane>
				<el-tab-pane :label="'待发货(' + this.sum.str2/100 + ')'">
					<tabDa></tabDa>
				</el-tab-pane>
				<el-tab-pane :label="'待收货(' + this.sum.str3/100 + ')'">
					<tabDa></tabDa>
				</el-tab-pane>
				<el-tab-pane :label="'已完成(' + this.sum.str4/100 + ')'">
					<tabDa></tabDa>
				</el-tab-pane>
				<el-tab-pane :label="'待退款(' + this.sum.str5/100 + ')'">
					<tabDa></tabDa>
				</el-tab-pane>
				<el-tab-pane :label="'已退款(' + this.sum.str6/100 + ')'">
					<tabDa></tabDa>
				</el-tab-pane>
			</el-tabs>
		</template>
	</div>
</template>
<script>
	import tab from '@/components/page/tab'
	import tabDa from '@/components/page/tab/tabDa'
	import Bus from '@/utils/bus'
	export default {
		name: 'Home',
		components: {
			tab,
			tabDa
		},
		data() {
			return {
				str:1,
				str1:1,
				num: 0,
				sum: {
					str: 0,
					str1: 0,
					str2: 0,
					str3: 0,
					str4: 0,
					str5: 0,
					str6: 0
				},
				arr: [],
			};
		},
		
		methods: {
			handleClick(tab, event) {
				this.myDa.forEach(item=>{
					if(item.status == tab.index){
						this.arr.push(item)
					}
				})
				Bus.$emit('data1', this.arr)
				this.arr = []
			},
			data(tableData) {
				this.myDa = tableData
				for (let i = 0; i < tableData.length; i++) {
					if (tableData[i].status === 1) {
						this.sum.str1 += tableData.length
					} else if (tableData[i].status === 2) {
						this.sum.str2 += tableData.length
					} else if (tableData[i].status === 3) {
						this.sum.str3 += tableData.length
					} else if (tableData[i].status === 4) {
						this.sum.str4 += tableData.length
					} else if (tableData[i].status === 5) {
						this.sum.str5 += tableData.length
					} else if (tableData[i].status === 6) {
						this.sum.str6 += tableData.length
					}
				}
			}
		}
	};
</script>

<style>
</style>

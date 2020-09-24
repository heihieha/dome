<template>
	<div class="hello">
		<el-container>
			<el-aside :width="isCollapse?'66px':'270px'" class="trvi">
				<div class="left-top">
					<img src="../assets/logo.png" :class="isCollapse?'img1':'img'">
				</div>
				<div class="left-bottom">
					<div class="buttom clearfix" @click="zhan()">
						<i class="el-icon-s-unfold i fl" v-if="!isCollapse"></i>
						<i class="el-icon-s-fold i fl" v-else></i>
						<div class="zhan">
							<div v-if="!isCollapse">收起</div>
							<div v-else></div>
						</div>
					</div>
					<el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
						<el-submenu :index="item.value" v-for="item in ser" :key="item.value">
							<template slot="title">
								<img :src="item.img" class="im">
								<span slot="title" >{{item.name}}</span>
							</template>
							<el-menu-item-group v-for="item in item.lsit" :key="item.value">
								<el-submenu :index="item.value">
									<span slot="title" @click="addTab(item.name)">{{item.name}}</span>
									<!-- <router-link to="/shop"> -->
									<el-menu-item v-for="item in item.noce" :key="item.value" :index="item.value" @click="addTab(item.name)">{{item.name}}</el-menu-item>
									<!-- </router-link> -->
								</el-submenu>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</div>
			</el-aside>
			<el-container>
				<el-header>
					<div class="top">
						<div class="fr top-font">
							<span>退出登录</span>
							<img src="../assets/img/derive.png" class="fr top-img">
						</div>
						<div class="fr top-text">
							<span class="text">管理员</span>
							<i class="el-icon-arrow-down"></i>
						</div>
						<img src="../assets/img/ionc.jpg" class="fr img">
					</div>
				</el-header>
				<el-main>
					<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
						<el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
							<router-view></router-view>
						</el-tab-pane>
					</el-tabs>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				isCollapse: true,
				editableTabsValue: '2',
				editableTabs: [{
					title: '首页',
					name: '1',
					content: 'Tab 1 content'
				}],
				tabIndex: 2,
				ser: [
					{
						name: "首页",
						value: "1",
						img: require("../assets/img/home.png")
					},
					{
						name: "商品",
						value: "2",
						img: require("../assets/img/commodity.png"),
						lsit: [{
								name: "商品管理",
								value: "2-1",
							},
							{
								name: "商品配置",
								value: "2-2",
								noce: [{
										name: "商品后台分类",
										value: "2-2-1"
									},
									{
										name: "图片库管理",
										value: "2-2-2"
									}
								]
							}
						]
					},
					{
						name: "交易",
						value: "3",
						img: require("../assets/img/deal.png")
					},
					{
						name: "用户",
						value: "4",
						img: require("../assets/img/user.png")
					},
					{
						name: "门店",
						value: "5",
						img: require("../assets/img/shop.png"),
						lsit:[
							{name:"门店管理",value: "5-1"}
						]
					},
					{
						name: "营销",
						value: "6",
						img: require("../assets/img/marketing.png")
					},
					{
						name: "设置",
						value: "7",
						img: require("../assets/img/set.png")
					},
					{
						name: "服务",
						value: "8",
						img: require("../assets/img/serve.png")
					},
					{
						name: "数据",
						value: "9",
						img: require("../assets/img/data.png")
					},
					{
						name: "结算",
						value: "10",
						img: require("../assets/img/close.png")
					},
					{
						name: "内容",
						value: "11",
						img: require("../assets/img/conent.png")
					},
				],
			}
		},
		methods: {
			ccc(e) {
				console.log(e)
			},
			zhan() {
				this.isCollapse = !this.isCollapse
			},
			handleOpen(keyPath) {
				console.log(keyPath);
			},
			handleClose(keyPath) {
				console.log(keyPath);
			},
			addTab(targetName) {
				let newTabName = ++this.tabIndex + '';
				this.editableTabs.push({
					title: targetName,
					name: newTabName,
					content: 'New Tab content'
				});
				this.editableTabsValue = newTabName;
				this.$router.push({
					path:'/shop'
				})
			},
			removeTab(targetName) {
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;
				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}

				this.editableTabsValue = activeName;
				this.editableTabs = tabs.filter(tab => tab.name !== targetName);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.top {
		position: absolute;
		z-index: 100;
		width: 93.7%;
		height: 60px;
		border-bottom-left-radius: 10px;
		box-shadow: -3px 3px 20px #e7e6ea;
		background-color: #FFFFFF;

		.top-font {
			padding-right: 20px;
			font-size: 16px;
			color: #477ef6;
		}

		.top-img {
			width: 30px;
			margin: 12px 0 0 20px;
		}

		.top-text {
			padding-right: 21px;
			font-size: 16px;

			.text {
				padding-right: 10px;
			}
		}

		.img {
			width: 38px;
			height: 38px;
			margin: 10px 10px;
			border-radius: 50%;
		}
	}

	.left-top {
		padding: 40px 10px;
		.img {
			width: 100px;
		}

		.img1 {
			width: 40px;
			margin-bottom: 48px;
		}
	}

	.left-bottom {
		text-align: left;
		.buttom {
			.i {
				line-height: 40px;
				font-size: 22px;
			}

			.zhan {
				padding-left: 30px;
				font-size: 18px;
			}

			width: 100%;
			height: 40px;
			padding-left: 20px;
			line-height: 40px;
			cursor:pointer;
			background-color: #FFFFFF;
		}
	}

	.trvi {
		transition: all .3s;
	}

	.im {
		width: 22px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 100%;
		min-height: 400px;
	}

	.el-header {
		padding: 0;
		margin-left: 30px;
	}

	.el-header,
	.el-footer {
		background-color: #F7F6FB;
		color: #333;
		// text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #FFFFFF;
		color: #333;
		// text-align: center;
		// line-height: 200px;
	}

	.el-main {
		padding: 20px 0 0 20px;
		background-color: #f7f6fb;
		// background-color: #F7F6FB;
		color: #333;
		// text-align: center;
		// line-height: 160px;
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-menu {
		border: none;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>

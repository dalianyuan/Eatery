function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.init();
}
Content.template = `
	<!--商品列表title开始-->
	<h1>
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
		<span class="span2 left">&nbsp;-&nbsp; 会员列表</span>
		<span class="span3 left">
			<a href="javascript:;">
				<img src="/images/jnsy.png"/>
			</a>
		</span>
		<span class="span4 right">
			<a href="/html/vip/vip_add.html">添加新会员</a>
		</span>
	</h1>
	<!--商品列表title结束-->

	<!--商品列表搜索栏开始-->
	<div id="form-div">
		<!--<form id="form" action="/search_goods" method="post" enctype="multipart/form-data">-->
			<img src="/images/icon_search.gif" />
			<select name="type">
				<option value="">所有等级</option>
				<option value="">1</option>
				<option value="">2</option>
				<option value="">3</option>
			</select>
			<select name="mark">
				<option value="">积分区间</option>
				<option value="">100-500</option>
				<option value="">大于500 </option>
			</select>
			<select name="all">
				<option value="">全部</option>
			</select>
			关键字
			<input type="text" name="goods_keywords" id="goods_keywords" />
			<button id="btn" onclick="search()">搜索</button>
		<!--</form>-->
	</div>
	<!--商品列表搜索栏结束-->

	<!--商品列表显示开始-->
	<div id="list-div">
		<table id="table" cellpadding="3" cellspacing="1">
			<tr>
				<th>会员编号</th>
				<th>会员名称</th>
				<th>电子邮箱</th>
				<th>是否已验证</th>
				<th>可用资金</th>
				<th>等级积分</th>
				<th>注册日期</th>
			</tr>
			<tr>
				<td id="order_num">
					00001
				</td>
				<td id="order_name">
					大脸源
				</td>
				<td>
					15504055618@163.com
				</td>
				<td>
					<img src="/images/yes.gif" />
				</td>
				<td>
					￥799
				</td>
				<td>
					496
				</td>
				<td>
					2018-03-24
				</td>
			</tr>
			
		</table>

		<!--列表下的页码开始-->
		<div id="page">
			总计 <span id="totalRecords" data-length="">24</span> 个记录&nbsp;分为 <span id="totalPages">3
    		</span> 页&nbsp;当前第 <span id="pageCurrent">1</span> 页,每页
			<input type="text" name="pageSize" id="pageSize" value="7" />
			<span id="pageLink">
    			<a href="javascript:;">第一页</a>
    			<a href="javascript:;">上一页</a>
    			<a href="javascript:;">下一页</a>
    			<a href="javascript:;">最末页</a>
    			<select name="gotoPage" id="gotoPage">
    				<option value="1">1</option>
    			</select>
    		</span>
		</div>
		<!--列表下的页码结束-->

	</div>
	<!--商品列表显示结束-->

	<!--商品列表底部结束-->
	<div id="footer">
		共执行 9 个查询，用时 0.024190 秒，Gzip 已禁用，内存占用 3.580 MB <br/> 版权所有 © 2005-2018 上海商派软件有限公司，并保留所有权利。
	</div>
	<!--商品列表底部结束-->
`;

$.extend(Content.prototype, {
	init: function(){
		this.createDom();
		this.showList();
	},
	createDom: function(){
		this.element = $(Content.template);
		this.contentContainer.append(this.element);
	},
	showList: function(){
		
	}
})
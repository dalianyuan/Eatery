function Content(contentContainer){
	this.contentContainer = contentContainer;
	this.init();
}
Content.template = `
	<h1 class="h1Title">
		<span class="span1 left">
			<a href="javascript:;">Eatery后台管理中心 </a>
		</span>
	</h1>
	<div id="canvas"></div>
`;

$.extend(Content.prototype, {
	init: function(){
		this.createDom();
		this.showTable();
	},
	createDom: function(){
		this.element = $(Content.template);
		this.contentContainer.append(this.element);
	},
	showTable: function(){
		// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('canvas'));

        // 指定图表的配置项和数据
        var option = {
		    legend: {},
		    tooltip: {},
		    dataset: {
		        source: [
		            ['product', '2015', '2016', '2017', '2018'],
		            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3],
		            ['Milk Tea', 86.5, 92.1, 85.7, 83.1],
		            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4]
		        ]
		    },
		    xAxis: [
		        {type: 'category', gridIndex: 0},
		        {type: 'category', gridIndex: 1}
		    ],
		    yAxis: [
		        {gridIndex: 0},
		        {gridIndex: 1}
		    ],
		    grid: [
		        {bottom: '55%'},
		        {top: '55%'}
		    ],
		    series: [
		        // 这几个系列会在第一个直角坐标系中，每个系列对应到 dataset 的每一行。
		        {type: 'bar', seriesLayoutBy: 'row'},
		        {type: 'bar', seriesLayoutBy: 'row'},
		        {type: 'bar', seriesLayoutBy: 'row'},
		        // 这几个系列会在第二个直角坐标系中，每个系列对应到 dataset 的每一列。
		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1},
		        {type: 'bar', xAxisIndex: 1, yAxisIndex: 1}
		    ]
		}

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
	}
})

//区域滑动初始化
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

function returnMap() {
	$("#searchDiv").hide();
}
$('#choiceTyoe li').click(function(e) {
	$(this).siblings().children("a").removeClass("a-clicked");
	$(this).children("a").addClass("a-clicked");
	
	$("#pois").empty(); //清空结果
	
	var type = $(this).attr("id");
	mui.get("http://api.map.baidu.com/geodata/v3/poi/list?geotable_id=" + dataStore.xueyuan + "&ak=" + dataStore.ak + "&leixing=" + type, function(data) {
		var d = data.pois;
		var li;
		for(var a = 0; a < d.length; a++) {

			li = $('<li data-index="'+ a + '" class="mui-table-view-cell"> <div>	<img src="fonts/xueyuan.svg" ></div><font>' + d[a].title + '</font></li>')
			$(li).click(function() {

				var p = d[$(this).attr("data-index")];

				$("#header-text").html(p.title)
				var point = new BMap.Point(p.location[0], p.location[1]);
				//设置中心和比例尺
				map.setCenter(point);
				map.setZoom(19);

				// 添加点覆盖物
				map.clearOverlays();
				var marker = new BMap.Marker(point);
				map.addOverlay(marker);

				var content = p.description;

				var infoWindow = new BMap.InfoWindow("<font style='color:#97999a;font-size:12px'>" + p.address + "</font>", {
					width: 200,
					title: "<div style='color:#0078ff'>" + p.title + "</div>"
				});

				marker.openInfoWindow(infoWindow);
				marker.addEventListener("click", function() {
					this.openInfoWindow(infoWindow);
				});

				// 隐藏搜索页面
				$("#searchDiv").hide();

			});
			$("#pois").append(li);
		}

	}, "json")

})
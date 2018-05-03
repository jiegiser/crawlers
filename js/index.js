//打开菜单
function openMenu() {
	$("#openMenu").hide();
	$("#left-menu ").animate({
		left: "15px"
	});
}

//右上角初始化地图
$("#reset").click(function() {
	map.clearOverlays();
	map.centerAndZoom(new BMap.Point(116.038355, 28.686546), 16);
})

// 隐藏菜单
function closeMenu() {
	$("#left-menu ").animate({
		left: "-50px"
	}, function() {
		$("#openMenu").show();
	});
}

//左下角显示与隐藏
var more_btn_sum = 1;

function openAndCloseMoreBtn() {
	if(more_btn_sum != -1) {

		$('#jiucuo').animate({
			'left': '10px',
			'bottom': '130px',
			'opacity': '1'
		});
		$('#xinzeng').animate({
			'left': '68px',
			'bottom': '113px',
			'opacity': '1'
		});
		$('#shezhi').animate({
			'left': '114px',
			'bottom': '67px',
			'opacity': '1'
		});
		$('#wode').animate({
			'left': '140px',
			'bottom': '10px',
			'opacity': '1'
		});
	} else {
		$('#jiucuo').animate({
			'left': '0px',
			'bottom': '0px',
			'opacity': '0'
		});
		$('#xinzeng').animate({
			'left': '0px',
			'bottom': '0px',
			'opacity': '0'
		});
		$('#shezhi').animate({
			'left': '0px',
			'bottom': '0px',
			'opacity': '0'
		});
		$('#wode').animate({
			'left': '0px',
			'bottom': '0px',
			'opacity': '0'
		});
	}
	more_btn_sum = more_btn_sum * -1;
}

// 打开搜索页面
function openSearchDiv() {
	$("#searchDiv").show();
	// $("#search-input").focus();
	if($("#header-text").attr("data-index") == "0") {
		$("#pois").empty(); //清空结果

		mui.get("http://api.map.baidu.com/geodata/v3/poi/list?geotable_id=" + dataStore.xueyuan + "&ak=" + dataStore.ak + "&leixing=xueyuan", function(data) {
			var d = data.pois;
			var li;
			for(var a = 0; a < d.length; a++) {

				li = $('<li data-index="' + a + '" class="mui-table-view-cell"> <div>	<img src="fonts/xueyuan.svg" ></div><font>' + d[a].title + '</font></li>')
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
	}
	$("#header-text").attr("data-index", 1)

}
// 创建Map实例
var map = new BMap.Map("map",{
	mapType:BMAP_NORMAL_MAP
});

// 初始化地图,设置中心点坐标和地图级别
map.centerAndZoom(new BMap.Point(103.69808435439336,36.08967602771201), 16);

// 底图切换
$("#basemap").click(function(){
	var index=$(this).attr("data-index");
	if(index>0){
		map.setMapType(BMAP_SATELLITE_MAP);
	}else{
		map.setMapType(BMAP_NORMAL_MAP)
	}
	$(this).attr("data-index",index*(-1))
})

//右下角定位
$("#zoom").click(function() {
	plus.geolocation.getCurrentPosition(function(position){
		map.clearOverlays();
		var point=new BMap.Point(position.coords.longitude,position.coords.latitude)
		map.setCenter(point);
		var myIcon = new BMap.Icon("fonts/location.png", new BMap.Size(32,32));
		var mark=new BMap.Marker(point,{icon:myIcon});
		map.addOverlay(mark);
	},function(error){
		mui.toast("定位失败.请打开GPS");
	},{
		provider:"baidu",
		timeout:10000,
		coordsType:"bd09ll"
	});
})

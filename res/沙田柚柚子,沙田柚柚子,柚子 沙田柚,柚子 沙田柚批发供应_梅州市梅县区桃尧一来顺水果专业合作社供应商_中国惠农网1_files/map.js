/**
 * 
 */
//百度地图API功能
	function loadJScript() {
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = "http://api.map.baidu.com/api?v=2.0&ak=5Pu807wCfP1rzkCM2k17YZ0a&callback=init";
		document.body.appendChild(script);
		
	}
	
	var map ;
	function init() {
		map = new BMap.Map("dituContent");            // 创建Map实例
		var $map_div = $("#dituContent");
		var $lng = $($map_div).attr("data-lng");
		var $lat = $($map_div).attr("data-lat");
		var $is_exist = ($lng != "" && $lat != "");
		var $address = $("#sp_address").html(); // 获取实际地址
		// 如果没有保存经纬度，则根据实际地址获取经纬度
		if(!$is_exist && typeof($address)!=='undefined'){
			getLBSByAddress($address,'' ,function(result){
				createMarker(result.lng, result.lat, true);
			});
		}
		
		createMarker($lng, $lat, $is_exist);
		
}

function createMarker(lng, lat, is_exist){
	var point = new BMap.Point(lng, lat); // 创建点坐标
	
	/// 设置可视范围，没有保存经纬度也没有实际地址，则默认可视范围为长沙
	map.centerAndZoom(is_exist ? point : "长沙", 15);
	//启用滚轮放大缩小
	map.enableScrollWheelZoom();                 
	
	// 将标注添加到地图中
	if(is_exist){
		var marker = new BMap.Marker(point);  // 创建标注
		map.addOverlay(marker);              
		map.panTo(point); 
	}
}

window.onload = loadJScript;  //异步加载地图
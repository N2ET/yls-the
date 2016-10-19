
//根据地址获取经纬度
function getPointByAddress(address,city,func){
	var mygeocoder = new BMap.Geocoder();
	mygeocoder.getPoint(address,function(point){
		if(typeof func == 'function'){
			func.apply(window,[point]);
		}
	},city);
};

//根据地址获取LBS信息
function getLBSByAddress(address,city,func){
	var mygeocoder = new BMap.Geocoder();
	mygeocoder.getPoint(address,function(point){
		mygeocoder.getLocation(point,function(r){
			if(typeof func == 'function'){
				var result;
				if(r){
					result = new Object();
					result.province = r.addressComponents.province;
					result.city = r.addressComponents.city;
					result.district = r.addressComponents.district;
					result.lng = r.point.lng;
					result.lat = r.point.lat;
				}
				func.apply(window,[result]);
		}
	},{enableHighAccuracy: true});
	},city);
};

//根据IP获取城市信息
function getCityByIP(func){
	var myCity = new BMap.LocalCity();
	myCity.get(function(result){
		if(typeof func == 'function'){
			func.apply(window,[result.name]);
		}
	});
};

//根据IP获取经纬度
function getPointByIP(func){
	var myCity = new BMap.LocalCity();
	myCity.get(function(result){
		if(result){
			getPointByAddress(result.name,result.name,func);
		}
	});
};

//根据IP获取LBS信息
function getLBSByIP(func){
	var myCity = new BMap.LocalCity();
	myCity.get(function(result){
		if(result){
			getLBSByAddress(result.name,result.name,func);
		}
	});
};

//根据浏览器获取经纬度
function getPointByGeolocation(func){
	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			if(typeof func == 'function'){
				func.apply(window,[r.point]);
			}
		}
	},{enableHighAccuracy: true});
};

//根据浏览器获取LBS信息
function getLBSByGeolocation(func){
	var geolocation = new BMap.Geolocation();
	var mygeocoder = new BMap.Geocoder();
	geolocation.getCurrentPosition(function(rs){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			mygeocoder.getLocation(rs.point,function(r){
				if(typeof func == 'function'){
					var result;
					if(r){
						result = new Object();
						result.province = r.addressComponents.province;
						result.city = r.addressComponents.city;
						result.district = r.addressComponents.district;
						result.lng = r.point.lng;
						result.lat = r.point.lat;
					}
					func.apply(window,[result]);
				}
			});
		}
	},{enableHighAccuracy: true});
};
import { common,request } from './request.js'

// 获取地理位置 经纬度
export function geolocate() {
    return request(
		`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAegNeT3FywkU9a4_IaJF0omXOILWbZfws`,
		'POST'
	)
}
// 获取具体位置 国家省市区
export function geocode(query) {
	console.log("query: ",query,);
    return request({
		url:`https://maps.googleapis.com/maps/api/geocode/json?latlng=${query.lat},${query.lng}&key=AIzaSyAegNeT3FywkU9a4_IaJF0omXOILWbZfws&language=EN`,
		method:'GET'
	})
}
//App更新
export function updateApi(params) {
    return common({
        url: `/api/app/update`,
        method: 'GET',
    })
}
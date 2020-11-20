import {request,common} from './request.js'

// 获取地理位置 经纬度
export function geolocate() { // 个人信息 get
    return request(`https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAegNeT3FywkU9a4_IaJF0omXOILWbZfws`,'POST')
}
// 获取具体位置 国家省市区
export function geocode(query) { // 个人信息 get
    return request(
        `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAegNeT3FywkU9a4_IaJF0omXOILWbZfws`,
        'POST',
        query
    )
}


// 示例
export function addApi(query) {
	return common({
		url:`/cms/visit/add`,
		method:'POST',
		query:query
	})
}

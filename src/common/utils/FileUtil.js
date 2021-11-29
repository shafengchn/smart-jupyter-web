
export const toFormData = (obj, parentKey = '', formData = new FormData()) => {
	Object.keys(obj).forEach(key=>{
		let newKey = parentKey=='' ? key : ( parentKey + '.' + key )
		if(obj[key] instanceof File) {
			formData.append(newKey, obj[key]);
		} else if (obj[key] instanceof Array && obj[key].length > 0) {
			obj[key].forEach(item=>{
				// TODO append("item[]", value);
			})
		} else if (obj[key] instanceof Object) {
			// 递归添加
			toFormData(obj[key], key, formData);
		} else if (typeof obj[key] == 'string') {
			formData.append(newKey, obj[key]);
		} else if (typeof obj[key] == 'number') {
			formData.append(newKey, obj[key]);
		}
	})
	return formData;
}
//根据当前时间返回不同问候语
export const getTime = () => {
	let massage = ''
	let hours = new Date().getHours()
	if (hours >= 8 && hours <= 12) {
		massage = "HI,上午好！"
	} else if (hours > 12 && hours <= 18) {
		massage = 'HI,下午好！'
	} else if (hours > 18 && hours <= 24) {
		massage = 'HI,晚上好！'
	}
	return massage
}
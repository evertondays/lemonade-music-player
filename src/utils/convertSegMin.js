function convertSegMin(seg){
	seg = seg.toFixed(0);

	var min = (seg / 60);
	min = Math.floor(min);

	var res = seg % 60;
	if (res < 10) {
		res = "0" + res;
	}

	return `${min}:${res}`;
}

export default convertSegMin;
/*
* Исходные данные
*/
h0 = 5;
h1 = [30] // массив высот вышек
h2 = 8;
N = -114; //dB
Pmin = Math.pow(10, N/10);
Pi = 12.5;
f = 162.025;
l = 300/f;
G1 = 0.81;
G2 = 0.81;
/*
* Для учета рельефа
*/
H = [0.897, 0.99];          // отношение высоты препятствия к первой зоне Френеля
F0 = [0, -6.31, -20, -31];  // функция множителя ослабления
/*
* Функция для нахождения распространения сигнала без помеж
*/
function x(h1) {
    return (Pi * G1 * G2 * (h1*h1 + h0*h0) * (h2*h2 + h0*h0) * l*l) / (2 * Pmin)
}
/*
* Функция получения максимального и минимального рельефа
*/
function get(R) {
    max = R[0];
    min = R[0];
    for (i = 1; i < R.length; i++) {
        if (R[i] > max)
            max = R[i];
        if (R[i] < min)
            min = R[i];
    }
    return [max, min];
}
/*
* Основной алгоритм
*/
function calc() {
    R = [];
    for (i = 0; i < h1.length; i++) {
        j = 0;
        R.push([0,0,0,0,0,0,0,0]);
        for (ii = 0; ii < H.length; ii++)
            for (jj = 0; jj < F0.length; jj++) {
                // считаем с учетом рельефа
                f_h1 = (x(h1[i]) * Math.pow(10, 0.1*F0[jj]*H[ii])) / Math.abs(Math.log(2) * Math.pow(10,-4));
                R[i][j] = Math.pow(f_h1, 0.25);
                j++;
            }
        }
    return R;
}
/*
 * для перевода координат
 * 
*/
function toGeo(str) {
	tmp = str.split('.', 3);
	result = parseFloat(parseFloat(tmp[0]) + (((parseFloat(tmp[1]) * 60) + parseFloat(tmp[2])) / 3600));
	return result;
}

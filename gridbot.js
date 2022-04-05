const url = "wss://stream.data.alpaca.markets/v1beta1/crypto";
const socket = new WebSocket(url);

const auth = {"action": "auth", "key": "PKGRR7D9O4J5EL0CYE8M", "secret": "jReOvKa3fNfXbTHMEW0ugIQkZ0P9gZmksdaiKTMB"}
const subscribe = {"action":"subscribe", "trades":["ETHUSD"], "quotes":["ETHUSD"], "bars":["ETHUSD"]}
console.log(socket)

const quotesElement = document.getElementById('quotes')
const tradesElement = document.getElementById('trades')

var chart = LightweightCharts.createChart(document.body, {
	width: 600,
  height: 300,
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
	},
    layout: {
        backgroundColor: '#000000',
        textColor: '#ffffff',
    },
    grid: {
        vertLines: {
            color: '#404040',
        },
        horzLines: {
            color: '#404040',
        },
    },
    priceScale: {
        borderColor: '#cccccc',
    },
    timeScale: {
        borderColor: '#cccccc',
        timeVisible: true,
    }
});

var candleSeries = chart.addCandlestickSeries();
var data = [
	{ time: '2018-10-19', open: 54.62, high: 55.50, low: 54.52, close: 54.90 },
	{ time: '2018-10-22', open: 55.08, high: 55.27, low: 54.61, close: 54.98 },
	{ time: '2018-10-23', open: 56.09, high: 57.47, low: 56.09, close: 57.21 },
	{ time: '2018-10-24', open: 57.00, high: 58.44, low: 56.41, close: 57.42 }]
candleSeries.setData(data);
socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    const message = data[0]['msg']
    //console.log(data);

    if (message == 'connected') {
        console.log('authinticating')

        socket.send(JSON.stringify(auth));
    }

    if (message == 'authenticated') {
        socket.send(JSON.stringify(subscribe))
    }

    for (var key in data) {
        console.log(data[key])

        const type = data[key].T;

        if (type == 'q') {
            console.log('got a quote')
            //console.log(data[key])

            const quoteElement = document.createElement('div')
            quoteElement.className = 'quote';
            quoteElement.innerHTML = `<b>${data[key].t}</b> ${data[key].bp} ${data[key].ap}`
            quotesElement.appendChild(quoteElement);

            var elements = document.getElementsByClassName('quote');
            if (elements.length > 10) {
                quotesElement.removeChild(elements[0]);
            }
        }
        if (type == 't') {
            console.log('got a trade')
            //console.log(data[key])

            const tradeElement = document.createElement('div')
            tradeElement.className = 'trade';
            tradeElement.innerHTML = `<b>${data[key].t}</b> ${data[key].p} ${data[key].s}`
            tradesElement.appendChild(tradeElement);

            var elements = document.getElementsByClassName('trade');
            if (elements.length > 10) {
                tradesElement.removeChild(elements[0]);
            }
        }
        if (type == 'b') {
            console.log('got a bar')
            //console.log(data[key])
        }
    }
}
//958'
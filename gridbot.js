const url = "wss://stream.data.alpaca.markets/v1beta1/crypto";
const socket = new WebSocket(url);

const auth = {"action": "auth", "key": "PKGRR7D9O4J5EL0CYE8M", "secret": "jReOvKa3fNfXbTHMEW0ugIQkZ0P9gZmksdaiKTMB"}
const subscribe = {"action":"subscribe", "trades":["ETHUSD"], "quotes":["ETHUSD"], "bars":["ETHUSD"]}
console.log(socket)

const quotesElement = document.getElementById('quotes')
const tradesElement = document.getElementById('trades')
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
        }
        if (type == 't') {
            console.log('got a trade')
            //console.log(data[key])

            const tradeElement = document.
        }
        if (type == 'b') {
            console.log('got a bar')
            //console.log(data[key])
        }
    }
}
//2343
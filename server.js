const express = require('express');
const app = express();
const cors = require('cors');
const QRCode = require('easyqrcodejs-nodejs');
app.use(cors());
app.use(
    express.urlencoded({
      extended: true
    })
  );
app.use(express.json());

app.post('/',(req, res) => {
    //console.log(createQR(req.body))
    createQR(req.body).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).json({message: "Error"})
    })
});

const cryptoNames = ['Solana', 'Algorand', 'Tezos'];

function createQR(data) {
    return Promise.all(data.map((cry, index) => {
        const options = {
            text: `${cryptoNames[index]}: ${cry.price}`,
            width: 100,
            height: 100,
        };
        const qrcode = new QRCode(options);
        return qrcode.toDataURL();
        // qrcode.saveImage({
        // path: `C:/Users/Admin/Desktop/${cryptoNames[index]}.png` // save path
        //  });
    }));
}

app.listen(5000);


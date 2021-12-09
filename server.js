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
    createQR(req.body).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).json({message: "Error"})
    })
});

const cryptoNames = ['Solana', 'Algorand', 'Tezos'];

function createQR(data) {
    return Promise.all(data.map((cry, index) => {
        console.log(cry['logo'])
        const options = {
            text: `${cryptoNames[index]}: ${cry.price}`,
            width: 100,
            height: 100,
            logo: cry['logo'], 
		    logoWidth: 30, // fixed logo width. default is `width/3.5`
		    logoHeight: 30, // fixed logo height. default is `heigth/3.5`
        };
        const qrcode = new QRCode(options);
        return qrcode.toDataURL();
        // qrcode.saveImage({
        // path: `C:/Users/Admin/Desktop/${cryptoNames[index]}.png` // save path
        //  });
    }));
}

app.listen(5000);


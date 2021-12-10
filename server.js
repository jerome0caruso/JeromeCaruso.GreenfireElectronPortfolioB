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
    
   const currencyQrCodes = req.body.map(async(currency) => {
       
        const qrCode = await createQR(currency);
        const enhanchedCurrency = {...currency, qrCode};
        console.log(enhanchedCurrency)
        return enhanchedCurrency;
    })
    Promise.all(currencyQrCodes).then(data => {
        res.send(data);
    });
});


async function createQR(currency) {
        const options = {
            text: `${currency.name}: ${currency.price || "Crypto Project"}`,
            width: 100,
            height: 100,
            logo: currency.logo, 
		    logoWidth: 30, // fixed logo width. default is `width/3.5`
		    logoHeight: 30, // fixed logo height. default is `heigth/3.5`
        };
        const qrcode = new QRCode(options);
        return await qrcode.toDataURL();
        // qrcode.saveImage({
        // path: `C:/Users/Admin/Desktop/${cryptoNames[index]}.png` // save path
        //  });
}

app.listen(5000);


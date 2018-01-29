/*
* @Author: Marte
* @Date:   2018-01-17 10:11:14
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-25 10:46:51
*/

'use strict';

let http = require('http')
let https = require('https')
let fs = require('fs')
let webpush = require('web-push')
let express = require('express')
let app = express()
let ejs = require('ejs')
let bodyParser = require('body-parser')

let documentRoot = __dirname

var options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
    // passphrase: 'mpfe'
}

let httpsServer = https.createServer(options, app).listen(443)

app.use(express.static('public'))
app.use(express.static('images'))

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/store', function(req, res) {
    // console.log(typeof(req.body))
    // console.log(req.body);
    let subscriptionStr = Object.keys(req.body)[0]
    let subscription = JSON.parse(subscriptionStr)
    // console.log(subscription);
    // console.log(JSON.parse(subscription))
    const vapidKeys = {
      publicKey:
    'BBh0BvNIu56yhPEScv6KxycqSmpRBY2cc5-Z2697zS412keLKLuAYXDtPGVPE2uijwWhj14Ffoq1J0PhzwWOba4',
      privateKey: 'jOH8LzYbt8a0O2Rgbvd1N3ZPxVNYtlVsfQ7tJNcXKpE'
    }

    webpush.setGCMAPIKey('AAAAQQeCt9M:APA91bH_jzQ37ym5hBklh7Q_jU25a1aZlZoHHpu3PsJV7EkmqF6JKBKVN-BAflkDxBgqTDTY0Ms9V97sNJzL4ie_RpvmFiDBmWHiVbdulQP00L10grghF-GbvhKSGPeKCE_jetekjk86');
    webpush.setVapidDetails(
      'mailto:1048155766@qq.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey
    )

    delete subscription['expirationTime']
    // console.log(subscription)

    console.log(webpush.generateRequestDetails(subscription))
    webpush.sendNotification(subscription).then((data) => {
        console.log('haha')
    }).catch((err) => {
        console.log(err)
    })
})

// 设置模板引擎
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('index')
})

// app.use(function(err, req, res, next) {
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
// })

// node原生实现
// let server = https.createServer(options, function(req, res) {
//     let url = req.url
//     let filePath = documentRoot + url
//     console.log(url)

//     fs.readFile(filePath, function(err, data) {
//         if (err) {
//             res.writeHeader(404, {
//                 'content-type': 'text/html;charset="utf-8"'
//             })
//             res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
//             res.end();
//         }
//         else{
//             console.log(req.url)
//             if (req.url.match(/(\.js)$/)) {
//                 res.writeHeader(200, {
//                     'content-type' : 'text/javascript'
//                 })
//             }
//             else {
//                 res.writeHeader(200, {
//                     'content-type' : 'text/html;charset="utf-8"'
//                 })

//                 if (req.url.match(/index\.html/)) {
//                     const vapidKeys = {
//                       publicKey:
//                     'BEDn-kGsRxNegZTveuwf5JpzQeJNc5A9sEdRouDeSuXKLS3bV07MHK2ZMu8joGvBHHI5RZOGk9w95QXqSXKtM2Q',
//                       privateKey: 'Y8Zeyp0mpho_tFHopkeCKdauff-9M4_67yPFKe8m4do'
//                     }

//                     webpush.setVapidDetails(
//                       'mailto:web-push-book@gauntface.com',
//                       vapidKeys.publicKey,
//                       vapidKeys.privateKey
//                     )

//                     // webpush.sendNotification(subscription)

//                     // let post_data = {
//                     //     "registration_ids": ["eDF9pTTAv4Q:APA91bFAxDZFZsFd3pIRhSuXKD5gNlAn-3xFgmxP468__8n1YI6SVPU8HSFmWzBJSix5aAKnjRRHQ32Ry6tCWciVXulxzisDF_2t_z2auiymMon4CLz2fG1KwrkM-UA3X7uy_jxQy_6y"]
//                     // }
//                     // post_data = JSON.stringify(post_data)
//                     // let opt = {
//                     //     method: 'POST',
//                     //     host: 'android.googleapis.com',
//                     //     protocol: 'https:',
//                     //     path: '/gcm/send',
//                     //     headers: {
//                     //         'Content-Type': "application/json",
//                     //         Authorization: 'AAAAQQeCt9M:APA91bH_jzQ37ym5hBklh7Q_jU25a1aZlZoHHpu3PsJV7EkmqF6JKBKVN-BAflkDxBgqTDTY0Ms9V97sNJzL4ie_RpvmFiDBmWHiVbdulQP00L10grghF-GbvhKSGPeKCE_jetekjk86'
//                     //     }
//                     // }
//                     // let req = https.request(opt, function(serverfeedback) {
//                     //     // req.end()
//                     // })
//                     // // console.log('mark')

//                     // req.on('error', (e) => {
//                     //     console.error(`problem with request: ${e}`);
//                     // })
//                     // req.write(post_data)
//                     // // console.log(serverfeedback.statusCode)
//                     // req.on('response', (chunk) => {
//                     //     console.log('data')
//                     // })
//                 }
//             }
//             res.write(data)
//             res.end()
//         }
//     })
// }).listen(443)



console.log('server config ok!')
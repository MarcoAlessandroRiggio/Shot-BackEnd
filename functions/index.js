const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addShot = functions.https.onRequest((req, res) => {
    let shotter = req.query.shotter;
    let numberOfShots = admin.database()
        .ref('/Shots')
        .child(`/${shotter}`);
    numberOfShots.once('value', (snap) => {
        numberOfShots.set(parseInt(snap.val() + 1))
            .then((data) => res.status(200).send(data))
            .catch((err) => res.status(500).send(err));
    }).catch((err) => res.status(500).send(err));
});

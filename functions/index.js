const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.pushNotification = functions.database.ref('/{user}}').onWrite( event => {
    let user = event.before._data["user"];
    let oldValue = event.before._data["value"];
    let newValue = event.after._data["value"];
    
    console.log(user, oldValue, newValue);

    if(oldValue < newValue) {
        const payload = {
            notification: {
                title: `${user}  has shotted!`,
                body: `Now ${user}'s record is ${newValue}.`,
                sound: "default"
            },
        };
        const options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };
        return admin.messaging().sendToTopic("pushNotifications", payload, options);
    }
    return null;
});
'use strict';

const Promise = require('bluebird');

class MyError extends Error {

}

Promise.resolve().then(() => {
    console.log('start');
}).then(() => {
    throw new MyError('my error is occured');
}).then(() => {
    console.log('my error don\'t occured');
}).catch(MyError, (err) => {
    console.log(err);
}).catch((err) => {
    console.log(err);
    console.log('error is occured');
}).then(() => {
    console.log('end');
});

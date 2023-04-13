const https = require('https');

// console.log('start');
// https.get('https://jsonplaceholder.typicode.com/users/1', res => {
//   let data = [];

//   res.on('data', chunk => {
//     data.push(chunk);
//   });

//   res.on('end', () => {
//     console.log(JSON.parse(Buffer.concat(data).toString()));
//   });
// }).on('error', err => {
//   console.log('Error: ', err.message);
// });
// console.log('end');

const promisifiedGet = new Promise((resolve, reject) => {
  https.get('https://jsonplaceholder.typicode.com/users/1', res => {
    let data = [];

    res.on('data', chunk => {
      data.push(chunk);
    });

    res.on('end', () => {
    resolve(JSON.parse(Buffer.concat(data).toString()));
    });
  }).on('error', err => {
    reject('Error: ', err.message);
  });
})

// promisifiedGet.then((response) => {
//   console.log(response);
//   console.log('called first but executed later');
// }).catch(err => console.log(err))

console.log('called last');

(async () => {
  try {
    const something = await promisifiedGet()
    // console.log(user);
    console.log('called first but executed later');
  } catch (error) {
    console.log(error);
  }
})()

// async () => await asyncAwaitGet();
// // console.log('called last');
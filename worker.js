"use strict";

let startTime;
let timer = false;
let elapsedTime = 0;

self.addEventListener("message", function (e) {
  if (e.data === "start") {
    if (!timer) {
      startTime = performance.now() - elapsedTime;
      timer = true;
      runTimer();
    }
  } else if (e.data === "stop") {
    timer = false;
    elapsedTime = performance.now() - startTime;
  } else if (e.data === "reset") {
    timer = false;
    elapsedTime = 0;
    self.postMessage({ hour: 0, minute: 0, second: 0, count: 0 });
  }
});

function runTimer() {
  if (timer) {
    const now = performance.now();
    elapsedTime = now - startTime;

    let totalMilliseconds = Math.floor(elapsedTime);
    let count = Math.floor((totalMilliseconds % 1000) / 10);
    let second = Math.floor((totalMilliseconds / 1000) % 60);
    let minute = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
    let hour = Math.floor((totalMilliseconds / (1000 * 60 * 60)) % 24);

    self.postMessage({ hour, minute, second, count });

    setTimeout(runTimer, 10);
  }
}

// let hour = 0;
// let minute = 0;
// let second = 0;
// let count = 0;
// let timer = false;

// // Listen for messages from the main script
// onmessage = function (e) {
//   if (e.data === "start") {
//     timer = true;
//     runTimer();
//   } else if (e.data === "stop") {
//     timer = false;
//   } else if (e.data === "reset") {
//     timer = false;
//     hour = 0;
//     minute = 0;
//     second = 0;
//     count = 0;
//     // Send the updated time back to the main script
//     postMessage({ hour, minute, second, count });
//   }
// };

// function runTimer() {
//   if (timer) {
//     count++;

//     if (count === 100) {
//       second++;
//       count = 0;
//     }

//     if (second === 60) {
//       minute++;
//       second = 0;
//     }

//     if (minute === 60) {
//       hour++;
//       minute = 0;
//       second = 0;
//     }

//     // Send the updated time back to the main script
//     postMessage({ hour, minute, second, count });
//     setTimeout(runTimer, 10); // Run the function again after 10ms
//   }
// }

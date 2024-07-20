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

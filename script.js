"use scrict";

// Timer buttons
let startBtn = document.getElementById("start");
let stopBtn = document.getElementById("stop");
let resetBtn = document.getElementById("reset");

// Create Web Worker
let worker = new Worker("worker.js");

// Listen for messages from the worker
worker.onmessage = function (e) {
  let { hour, minute, second, count } = e.data;

  let hrString = hour < 10 ? "0" + hour : hour;
  let minString = minute < 10 ? "0" + minute : minute;
  let secString = second < 10 ? "0" + second : second;
  let countString = count < 10 ? "0" + count : count;

  document.getElementById("hr").innerHTML = hrString;
  document.getElementById("min").innerHTML = minString;
  document.getElementById("sec").innerHTML = secString;
  document.getElementById("count").innerHTML = countString;
};

// Button click events
startBtn.addEventListener("click", function () {
  worker.postMessage("start");
  startBtn.style.display = "none";
  stopBtn.style.display = "block";
});

stopBtn.addEventListener("click", function () {
  worker.postMessage("stop");
  startBtn.style.display = "block";
  stopBtn.style.display = "none";
});

resetBtn.addEventListener("click", function () {
  worker.postMessage("reset");
  startBtn.style.display = "block";
  stopBtn.style.display = "none";
});

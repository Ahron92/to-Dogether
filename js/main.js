"use strict";

function getPresentTime() {
  const todayDate = document.querySelector(".date");
  const todayTime = document.querySelector(".time");

  const today = new Date();
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

  const day = dayNames[today.getDay()];

  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();

  const ampm = hour > 12 ? "오후" : "오전";
  hour %= 12;
  hour = hour || 12;

  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;
  hour = hour < 10 ? `0${hour}` : hour;
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;

  todayDate.textContent = `${year}-${month}-${date}`;
  todayTime.textContent = `${ampm} ${hour}:${minute}:${second}`;
  setTimeout(getPresentTime, 1000);
}

function init() {
  getPresentTime();
}

init();

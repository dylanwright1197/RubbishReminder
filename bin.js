// const puppeteer = require('puppeteer');
import puppeteer from "puppeteer";
import moment from "moment";
import { sendCalendarInvite } from "./calendar-notification.js";

// var XMLHttpRequest = require('xhr2');

var binMap = [];

// function getUprn() {
//     const postcode = 'G69 6GZ';
//     const houseNumber = '9';

// var req = new XMLHttpRequest();
// req.open("GET", "http://api.ideal-postcodes.co.uk/v1/addresses?api_key=iddqd&query=9%20springhill%20farm%20way%20glasgow",true);

// req.onreadystatechange = function () {

//     json = JSON.parse(JSON.stringify(req.responseText))
//     console.log(json);

// }
// req.send();
// }

//906700338829

export async function runBinFinder(uprn) {
  binMap = [];
  console.log("uprn before request", uprn);
  const url = `https://www.glasgow.gov.uk/forms/refuseandrecyclingcalendar/CollectionsCalendar.aspx?UPRN=${uprn}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({ path: "screenshot.png" });

  const data = await page.evaluate(() => {
    const tableBody = document.querySelectorAll(
      "#Application_Calendar tbody tr td"
    );
    calendarArray = Array.from(tableBody).map((element) => element.innerHTML);

    return calendarArray.filter((element) => element.includes("<img"));
  });

  await data.forEach(mapBinDayAndColour);
  await browser.close();

  return binMap;
}

async function mapBinDayAndColour(binDay) {
  var date = binDay.substr(0, binDay.indexOf("<div "));

  var binType =
    binDay.includes("green") && binDay.includes("blue")
      ? "green, blue"
      : binDay.includes("green") && binDay.includes("brown")
      ? "green, brown"
      : binDay.includes("green")
      ? "green"
      : binDay.includes("blue")
      ? "blue"
      : binDay.includes("brown")
      ? "brown"
      : binDay.includes("purple")
      ? "purple"
      : "UNKOWN";

  let startDate = formatBinDate(date);
  // let endDate = formatBinDate((date - 1));

  //   await sendCalendarInvite(startDate, startDate, binType, binType);

  binMap.push({ date, binType });
}

function formatBinDate(date) {
  const formattedBinDate = `${date}/${moment().format("MMM")}/${moment().format(
    "YYYY"
  )}`;

  console.log("formatted bin date", formattedBinDate);

  return formattedBinDate;
}

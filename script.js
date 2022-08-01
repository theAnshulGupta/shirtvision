// date
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var date = new Date();
console.log(date);
var day = days[date.getDay()];
var minute = date.getMinutes();
var hour = date.getHours();
$("#date").text(days[date.getDay()]);

function cleanText(text) {
  if (text == "t_shirt") {
    text = text.replace(/_/g, "-");
    text = text.replace(/s/g, "S");
  } else {
    text = text.replace(/_/g, " ");
  }
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " ") {
      text =
        text.slice(0, i + 1) +
        text.charAt(i + 1).toUpperCase() +
        text.slice(i + 2);
    }
  }
  text = text.charAt(0).toUpperCase() + text.slice(1);
  return text;
}

function updateTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var printHours = hours;
  if (hours > 12) {
    printHours = hours - 12;
  }
  var t_str = printHours + ":" + minutes + " ";
  if (hours > 11) {
    t_str += "PM";
  } else {
    t_str += "AM";
  }
  document.getElementById("time").innerHTML = t_str;
}
updateTime();
setInterval(updateTime, 1000);

var inventory = {
  cap: { amount: 1, wash: false, currentAmount: 1, colors: ["blue"] },
  t_shirt: {
    amount: 5,
    wash: true,
    wear: 1,
    currentAmount: 5,
    colors: ["blue", "black", "green"],
  },
  long_sleeves: {
    amount: 3,
    wash: true,
    wear: 1,
    currentAmount: 3,
    colors: ["blue", "black", "green"],
  },
  jacket: {
    amount: 1,
    wash: true,
    wear: 7,
    currentAmount: 7,
    colors: ["grey"],
  },
  sweater: {
    amount: 1,
    wash: true,
    wear: 7,
    currentAmount: 7,
    colors: ["dark grey"],
  },
  windbreaker: {
    amount: 1,
    wash: true,
    wear: 7,
    currentAmount: 7,
    colors: ["red"],
  },
  shorts: {
    amount: 4,
    wash: true,
    wear: 1,
    currentAmount: 4,
    colors: ["blue", "black"],
  },
  jeans: {
    amount: 4,
    wash: true,
    wear: 2,
    currentAmount: 8,
    colors: ["blue", "dark blue", "black"],
  },
  sweatpants: {
    amount: 3,
    wash: true,
    wear: 1,
    currentAmount: 3,
    colors: ["blue", "aqua", "black"],
  },
  pajamas: {
    amount: 3,
    wash: true,
    wear: 1,
    currentAmount: 3,
    colors: ["white", "grey", "red"],
  },
  underwear: {
    amount: 7,
    wash: true,
    wear: 1,
    currentAmount: 7,
    colors: ["black", "grey", "dark blue"],
  },
  socks: {
    amount: 7,
    wash: true,
    wear: 1,
    currentAmount: 7,
    colors: ["black", "white", "teal"],
  },
  shoes: {
    amount: 1,
    wash: false,
    currentAmount: 1,
    colors: ["light grey"],
  },
  slippers: {
    amount: 2,
    wash: false,
    currentAmount: 2,
    colors: ["white", "black"],
  },
};

// hash + generation
var weather = 70;
$("#weather").text(weather + "° F");

var reset =
  "Hat <br />Shirt <br />Second Layer<br />Undergarments <br /> Pants <br /> Shoes";
$("#clothes").html(reset);

var newList = "";

function clothes(item, last) {
  var c = inventory[item];
  console.log(item);
  console.log(c);
  console.log("colors  " + c.colors);
  var rawColor = c.colors[Math.floor(Math.random() * c.colors.length)];
  var color = cleanText(rawColor);
  var colorGen = rawColor.replace(/ /g, "");
  var altColor = "white";
  if (rawColor == "white") {
    altColor = "black";
    colorGen = "#fbf9ed";
  }
  let cleanItem = cleanText(item);
  if (c.wash) {
    c.currentAmount = c.currentAmount - 1;
  }
  if (c.currentAmount < 0) {
    c.currentAmount = c.currentAmount + 1;
    if (last) {
      newList += "Out of " + cleanItem + ". <br />";
    }
    return false;
  }
  let count = 1;
  if (c == "socks" || c == "shoes") {
    count = 2;
  }
  newList +=
    count +
    " " +
    `<span class="clothes-item" style='background-color:${colorGen}; color: ${altColor}'>` +
    color +
    "</span>" +
    " " +
    cleanItem +
    "<br />";
  inventoryTextUpdate();
  return true;
}
$(window).on("hashchange", function () {
  var hash = window.location.hash.substring(1);
  newList = "";
  if (weather >= 70) {
    if (hash == "home") {
      newList += "What to wear at home: <br>";
      if (!clothes("t_shirt", true))
        if (!clothes("long_sleeves")) clothes("pajamas", true);
      clothes("underwear", true);
      if (!clothes("shorts")) clothes("jeans", true);
      clothes("slippers", true);
    }
    if (hash == "school") {
      newList += "What to wear at school: <br>";
      if (!clothes("t_shirt")) if ((!clothes("long_sleeves"), true));
      clothes("underwear", true);
      if (!clothes("jeans")) clothes("sweatpants", true);
      clothes("socks", true);
      clothes("shoes", true);
    }
  }
  $("#clothes").html(newList);
  if (hash == "") {
    $("#clothes").html(reset);
  }
  console.log(hash);
});

function inventoryTextUpdate() {
  let inventoryText = "";
  for (let i = 0; i < Object.keys(inventory).length; i++) {
    let text = Object.keys(inventory)[i];
    text = cleanText(text);
    let total = Object.entries(inventory)[i][1].amount;
    let remaining = Object.entries(inventory)[i][1].currentAmount;
    inventoryText +=
      text +
      ": " +
      total +
      "<span class='remaining'> (remaining uses:  " +
      remaining +
      ")</span>" +
      "<br />";
    // console.log(i);
  }
  $("#modal-text").html(inventoryText);
}

inventoryTextUpdate();

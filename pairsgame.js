(function (root, factory) {
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function () {
      return factory();
    });
  } else {
    // Global Variables
    root.pairsGame = factory();
  }
})(this, function () {

    function initialize(id, names, timespan, language) {
    var ul;
    var images = [];
    var clickedImgArr = [];

    var op = {
        begin: new Date(),
        timespan: 1.5,
        clicks: 0,
        counter: 0,
        numberOfPlayers: 0,
        names: null,
        pairs: null,
        language: setLanguage(language)
    };

    if (names && Array.isArray(names) && names.length != 0) {
        op.numberOfPlayers = names.length;
        op.names = names;
    } else {
        op.numberOfPlayers = 1;
        op.names = [op.language.gamer];
    }
    if (checkTimeSpan(timespan)) {
        op.timespan = timespan;
    }
    var pairs = [];
    for (var i = 0; i < op.numberOfPlayers; i++) {
        pairs.push([]);
    }
    op.pairs = pairs;
    ul = document.getElementById(id);
    createDisplayElement(ul);
    beginGame(ul);

    //Return a number that represents a player
    function getGamer(){
      return op.clicks % op.numberOfPlayers;
    }

    //Return a number that represents the next player
    function getNextGamer(){
      var value = getGamer();
      value++;
      if(value < op.numberOfPlayers){
        return value;
      } else {
        return 0;
      }
    }

    //Create a message for running game
    function displayMessage(value) {
      var gamer = getGamer();
      var currentPairs = op.pairs[gamer];
      var name = op.names[gamer];

      var nextGamer = getNextGamer();
      var nextName = op.names[nextGamer];

      var messageContainer = document.getElementById("message");
      var message = "";
      if(images.length === 2 && value){
        message = "<span class='infoline'>" + op.language.isRight + "</span>";
      } else {
        message = value ?
        ("<span class='infoline'>" + op.language.isRight + "</span>" + "<span class='textline'>" + name + " " + op.language.next)
        : ("<span class='infoline'>" + op.language.isFalse + "</span><span class='textline'>" + nextName + " " + op.language.nextGamer + "</span>");
      }

      var elem = document.getElementById("messageContainer");
      elem.innerHTML = message;
      elem.style.backgroundColor = value ? "lightGreen" : "#ffb3b3";
      setTimeout(function() {
        elem.style.backgroundColor = "#fff";
        if (value) {
          formatText(name, op.pairs[gamer].length, name + " " + op.language.next);
        } else {
          formatText(nextName, op.pairs[nextGamer].length, nextName + " " + op.language.nextGamer);
        }
      }, (op.timespan * 1000));
    }

    //Create and show a formated text output
    function formatText(name, numberOfPairs, text) {
      if(images.length !== 0){
        var messageContainer = document.getElementById("messageContainer");
        messageContainer.style.textAlign = "center";
        var message = "<span class='infoline'>" + op.language.gamer + ": " + name + " / " + op.language.result + ": " + numberOfPairs + "</span>";
        message += "<span class='textline'>" + text + "</span>";
        messageContainer.innerHTML = message;
      } else {
        endGame();
      }
    }

    //Create container for text outputs
    function createDisplayElement(ul){
      var container = ul.parentNode;

      var waitImg = document.createElement("img");
      waitImg.id = "wait";
      waitImg.src = "wait.png";
      container.insertBefore(waitImg, ul);

      var div = document.createElement("div");
      div.id = "messageContainer";
      div.innerHTML = "<span class='infoline'>" + op.language.begin + "</span>"
      div.innerHTML += "<span class='textline'>" + op.names[0] + " " + op.language.do + "</span>";
      container.insertBefore(div, ul);
    }

    //Make the game running
    function beginGame(ul){
      addClickEvent(ul);
      createIdsforLiElements(ul);
      setClassesToImgTags(ul.children);
      var randomImages = createRandomizedImages(ul.children);
      replaceImages(randomImages, ul.children);
    }

    //End the game
    function endGame() {
      var messageContainer = document.getElementById("messageContainer");
      var message = "";
      for (var i = 0; i < op.names.length; i++) {
        var result = op.pairs[i].length;
        if (result === 0) {
          result = op.language.noPairs;
        } else if(result === 1){
          result = result + " " + op.language.pair;
        } else {
          result = result + " " + op.language.pairs;
        }
        message += "<span class='infoline'>" + op.names[i] + ": " + result + "</span>";
      }
      message += "<hr>"
      message += "<span class='infoline'>" + op.language.numberOfClicks + ": " + op.counter + "</span>";
      message += "<span class='infoline'>" + op.language.time + ": " + formatGameTime() + "<span>";
      messageContainer.innerHTML = message;
      messageContainer.style.height = "auto";
    }

    //Get output of time at the end of a game
    function formatGameTime(){
      var timespan = new Date().getTime() - op.begin.getTime();
      var seconds = timespan / 1000;
      var hours   = Math.floor(seconds / 3600);
      var minutes = Math.floor((seconds - (hours * 3600)) / 60);
      var seconds = Math.floor(seconds - (hours * 3600) - (minutes * 60));
      var result = "";
      if(hours !== 0) {
        result += hours === 1 ? (hours + " " + op.language.hour + ", ") : hours + " " + op.language.hours + ", ";
      }
      if(minutes !== 0) {
        result += minutes === 1 ? (minutes + " " + op.language.minute + ", ") : (minutes + " " + op.language.minutes + ", ");
      }
      if(seconds !== 0) {
        result += seconds === 1 ? (seconds + " " + op.language.second) : (seconds + " " + op.language.seconds);
      }
      return result;
    }

    //Set the click event on li-elements
    function addClickEvent (ulElem) {
      Array.prototype.forEach.call(ulElem.children, function(item) {
        item.addEventListener("click", liClicked);
      });
    }

    //Remove a click event from a li-element
    function deleteClickEvent(image1, image2){
      var elem1 = image1.parentNode
      elem1.removeEventListener("click", liClicked);
      elem1.style.cursor = "default";
      var elem2 = image2.parentNode;
      elem2.removeEventListener("click", liClicked);
      elem2.style.cursor = "default";
    }

    //Replace images collection by a randomizes collection
    function replaceImages(imageCollection, liCollection) {
      for (var i = 0; i < liCollection.length; i++) {
        var item = liCollection[i];
        var imageTag = item.children[0];
        item.replaceChild(imageCollection[i], imageTag);
      }
    }

    //Create a randomized array of IMG tags
    function createRandomizedImages(array) {
      array = [].slice.call(array)
      var randomImages = [];

      //Fisher–Yates Shuffle
      var temporaryValue, randomIndex;
      var currentIndex = array.length;

        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        //Create Deep-Copies of IMG-Tags
        array.map(function(item, index, items){
          randomImages.push(item.children[0].cloneNode(true));
        });
        return randomImages;
    }

    //Create id's for li elements.
    function createIdsforLiElements(ul){
      for (var i = 0; i < ul.children.length; i++) {
        ul.children[i].id = "l" + i;
      }
    }

    //Set classes to IMG tags.
    function setClassesToImgTags(liCollection){
      var arr = getImageClasses(liCollection.length);
      var tempCounter = 0;
      for (var i = 0; i < liCollection.length; i++) {
        var img = liCollection[i].children[0];
        var elemclass = arr[tempCounter];
        img.classList.add("i" + elemclass);
        images.push(img);
        tempCounter++;
      }
    }

    //Create classes for IMG tags.
    function getImageClasses(numberOfImages){
      var tempCounter = 0;
      var classes = [];
      for (var i = 0; i < numberOfImages; i++) {
        if (i % 2 === 0) {
          tempCounter++;
        }
        classes[i] = tempCounter;
      }
      return classes;
    }

    //Evaluate parameter timespan
    function checkTimeSpan(timespan){
      var value = Number(timespan) === timespan;
      return value && timespan % 1 === 0 || value && timespan % 1 !== 0;
    }

    //click event
    function liClicked(ev) {
      var liElem = ev.target;
      op.counter++;
      var img = liElem.children[0];
      img.style.visibility = "visible";
      clickedImgArr.push(img);

      if (clickedImgArr.length === 2) {
        if(clickedImgArr[0].className === clickedImgArr[1].className){
          var gamer = getGamer();
          var pairs = op.pairs[gamer].push(1);
          displayMessage(true);
          deleteClickEvent(clickedImgArr[0], clickedImgArr[1]);
          images.splice(images.indexOf(clickedImgArr[0]), 1);
          images.splice(images.indexOf(clickedImgArr[1]), 1);
          clickedImgArr = [];
        } else {
          var layer = document.getElementById("wait");
          layer.style.visibility = "visible";
          setTimeout(function() {
            clickedImgArr[0].style.visibility = "hidden";
            clickedImgArr[1].style.visibility = "hidden";
            clickedImgArr = [];
            layer.style.visibility = "hidden";
          }, (op.timespan * 1000));
          displayMessage(false);
          op.clicks++;
        }
      }
    }

    function setLanguage(language) {
      var de = {
        gamer: "Spieler",
        result: "Pärchen",
        isRight: "Die Auswahl war richtig!",
        isFalse: "Die Auswahl war leider falsch.",
        next: "du bist noch einmal dran...",
        nextGamer: "ist dran...",
        begin: "Das Spiel kann losgehen!",
        do: "fängt an und darf zwei Karten aufdecken...",
        noPair: "kein richtiges Kartenpärchen",
        pair: "richtiges Kartenpärchen",
        pairs: "richtige Kartenpärchen",
        numberOfClicks: "Anzahl der Klicks",
        time: "Gespielte Zeit",
        hour: "Stunde",
        hours: "Stunden",
        minute: "Minute",
        minutes: "Minuten",
        second: "Sekunde",
        seconds: "Sekunden"
      }

      var en = {
        gamer: "Gamer",
        result: "Pairs",
        isRight: "Right selection!",
        isFalse: "Sorry, you are wrong.",
        next: "choose another selection...",
        nextGamer: "are the next...",
        begin: "Please start the game!",
        do: "begins and have to select two cards...",
        noPair: "no right pairs",
        pair: "right pair",
        pairs: "right pairs",
        numberOfClicks: "Number of clicks",
        time: "Time played",
        hour: "hour",
        hours: "hours",
        minute: "minute",
        minutes: "minutes",
        second: "second",
        seconds: "seconds"
      }

      if (!language) {
        return en;
      }
      if (typeof(language) === "string") {
        var lan = language.toLowerCase();
        if (lan === "de") {
          return de;
        }
        else if(lan === "en") {
          return en;
        }
      }
      if (typeof(language) === "object") {
        return language;
      } else {
        console.log("An Error occured in language selection.");
      }
    }
  }
  
 return {
    initialize: initialize
  }
  
});
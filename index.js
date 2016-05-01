var numberOfPlayers = 1;
  var timespan = 3;
  var language = "en";
  var names = [];

  function createTextInputs(elem){
    numberOfPlayers = parseInt(elem.value);
    var span = document.getElementById("textfields");
    var diff = numberOfPlayers - span.children.length;
    if (diff > 0) {
      for (var i = 1; i <= diff; i++) {
        var input = document.createElement("INPUT");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", (i + 1) + ". <Name> ");
        input.id = "0" + i;
        span.appendChild(input);
      }
    } else {
      for (var i = Math.abs(diff); i > 0; i--) {
        var node = span.children[span.children.length - 1];
        span.removeChild(node);
      }
    }    
  }

  function setTimespan(elem){
    timespan = parseFloat(elem.value);
  }

  function setLanguage(elem){
    language = elem.value;
  }

  function onResetClick(){
    location.reload();
  }

  function onBeginClick(){
    var span = document.getElementById("textfields");
    for (var i = 0; i < span.children.length; i++) {
      names.push(span.children[i].value);
    }
     pairsGame.initialize("memory", names, timespan, language);
  }
![pairs game](default.png)
======

PairsGame is a js script to play the pairs game on large and small displays without external libraries.

#How to use?

####Required files
There are **two** required files: ```pairsgame.js and pairsgame.css```. 

#### The markup
The required markup is:
 
```html
<div class="container">
	<ul id="yourId">
	    <li>
			<img src="yourImageFile-1a.png" />
		</li>
	    <li>
			<img src="yourImageFile-1b.png" />
		</li>
	    <li>
			<img src="yourImageFile-2a.png" />
		</li>
	    <li>
			<img src="yourImageFile-2b.png" />
		</li>
		[...]
	</ul>
</div>
```

For succsessful playing you need an even number of imgage files (the otimized size is 156px * 156px). Every IMG tag must be in one LI tag of an UL with id="yourId". The images that belong together must be consecutive, i.e. IMG files 1a and 1b are one Pair, IMG file 2a and 2b another one and so on.

#### Game start

You start the game using the following line:

````js
PairsGame.initialize("yourId");
```` 

#### Available Options

As the second parameter, you can pass an array of players:
````js
PairsGame.initialize("yourId", ["Ulrich", "Andreas", "Verena"]);
```` 
If you want, the third parameter is a double, who determines the time until an incorrect card pair gets turned over again:
````js
PairsGame.initialize("yourId", ["Ulrich", "Andreas", "Verena"], 1.5);
```` 
The last possible option is a language selector. Currently available are "en" and "de":
````js
PairsGame.initialize("yourId", ["Ulrich", "Andreas", "Verena"], 1.5, "en");
````
Alternatively, you can pass a language object:
````js
var language = {
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

PairsGame.initialize("yourId", ["Ulrich", "Andreas", "Verena"], 1.5, language);
````
That's it. Now use the game and have fun...

## License

MIT

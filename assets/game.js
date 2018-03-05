// Define global variables
$(document).ready(function() {
  var count = 0;
  var time = 10;
  var isSelected = false;
  var timer;
  var correct = 0;
  var incorrect = 0;
  var unanswered = 0;

  // Questions and Answers Arrays
  var question = [
    "Rock climbing was initially a sub-sport of which other sport?",
    "Which of the following is NOT a common piece of bouldering equipment?",
    "Which of the following is a common grading scale for bouldering problems?",
    "What kind of knot is an alpine butterfly knot?",
    "What term is used to describe the process that typically uses a rope system to protect a climber in the event of a fall?",
    "In what decade was rock climbing first considered a sport?",
    "What style of climbing is performed on small, tricky formations without the use of ropes or a harness?",
    "What term is commonly used to describe bouldering routes?",
    "What style of climbing hold is usually no deeper than one inch and is held with the tips of the fingers?",
    "Which of the following terms is NOT a movement technique in climbing?"
  ];
  var answer = [
    "Mountaineering",
    "Gloves",
    "V scale",
    "Single loop knot",
    "Belaying",
    "1950s",
    "Bouldering",
    "Problem",
    "Crimp",
    "Grab"
  ];
  var firstChoice = [
    "Mountaineering",
    "Chalk",
    "V scale",
    "Double loop knot",
    "Spotting",
    "1920s",
    "Leading",
    "Problem",
    "Jug",
    "Mantle"
  ];
  var secondChoice = [
    "Ice Climbing",
    "Gloves",
    "Color scale",
    "Stopper knot",
    "Belaying",
    "1940s",
    "Bouldering",
    "Feature",
    "Pinch",
    "Smear"
  ];
  var thirdChoice = [
    "Hiking",
    "Crash Pad",
    "Number scale",
    "Hitch knot",
    "Flaking",
    "1950s",
    "Trad",
    "Path",
    "Sloper",
    "Flag"
  ];
  var fourthChoice = [
    "Skiing",
    "Brush",
    "Sliding scale",
    "Single loop knot",
    "Lowering",
    "1960s",
    "Scrambling",
    "Grade",
    "Crimp",
    "Grab"
  ];

  // Show & Hide Functions
  function showHolders() {
    $(".question").show();
    $(".firstAns").show();
    $(".secondAns").show();
    $(".thirdAns").show();
    $(".fourthAns").show();
  }
  function hideHolders() {
    $(".question").hide();
    $(".firstAns").hide();
    $(".secondAns").hide();
    $(".thirdAns").hide();
    $(".fourthAns").hide();
  }
  function hideResults() {
    $(".correct-holder").hide();
    $(".incorrect-holder").hide();
    $(".unanswered-holder").hide();
    $(".restart-holder").hide();
  }
  function displayQuestion() {
    hideResults();
    $(".answer-holder").hide();
    $(".image-holder").hide();
    $(".start").hide();
    $(".timer").show();
    $(".list-group").show();
    showHolders();
    $(".question").html("<div>" + question[count] + "</div>");
    $(".firstAns").html(firstChoice[count]);
    $(".secondAns").html(secondChoice[count]);
    $(".thirdAns").html(thirdChoice[count]);
    $(".fourthAns").html(fourthChoice[count]);
  }
  $(".firstAns").click(checkAnswer);
  $(".secondAns").click(checkAnswer);
  $(".thirdAns").click(checkAnswer);
  $(".fourthAns").click(checkAnswer);

  // Function that checks for a correct or incorrect answer selection
  function checkAnswer() {
    hideHolders();

    if ($(this).text() === answer[count]) {
      stopTime();
      isSelected = true;
      $(".list-group").hide();
      $(".answer-holder").show();
      $(".answer-holder").text("Correct!");
      $(".image-holder").show();
      $(".image-holder").html("<img src='assets/images/correct.gif'>");
      correct++;
      count++;
    } else {
      stopTime();
      isSelected = true;
      $(".list-group").hide();
      $(".answer-holder").show();
      $(".answer-holder").text("Wrong! The answer is, " + answer[count] + ".");
      $(".image-holder").show();
      $(".image-holder").html("<img src='assets/images/incorrect.gif'>");
      incorrect++;
      count++;
    }

    checkGameEnd();
  }

  // Function that checks if it is the end of the game
  function checkGameEnd() {
    if (count === question.length) {
      $(".timer").hide();
      showResults();
      count = 0;
      $(".start").show();
      $(".start").on("click", function() {
        resetResults();
        startGame();
      });
    }
  }

  //Time functions

  //Reset time to 10 seconds
  function resetTime() {
    time = 10;
  }

  //Display time on game screen, starting at 10 and counting down
  //If time reaches 0, show necessary answer-holder and image-holder
  function displayTime() {
    $(".timer").text("Time remaining: " + time + "");
    time--;

    if (time <= 0) {
      hideHolders();
      $(".list-group").hide();
      stopTime();
      $(".answer-holder").show();
      $(".answer-holder").text(
        "Time is up! The answer is, " + answer[count] + "."
      );
      $(".image-holder").show();
      $(".image-holder").html("<img src='assets/images/incorrect.gif'>");
      unanswered++;
      count++;
      checkGameEnd();
    }
  }

  //Function to start the time
  function startTime() {
    clearInterval(timer);
    timer = setInterval(displayTime, 1000);
  }

  //Function to end the time
  function stopTime() {
    clearInterval(timer);
    resetTime();
    if (count < question.length - 1) {
      setTimeout(startTime, 2000);
      setTimeout(displayQuestion, 3000);
    }
  }
  resetTime();

  // Show End-of-Game Results Function
  function showResults() {
    $(".correct-holder").show();
    $(".correct-holder").text("Correct: " + correct + "");
    $(".incorrect-holder").show();
    $(".incorrect-holder").text("Incorrect: " + incorrect + "");
    $(".unanswered-holder").show();
    $(".unanswered-holder").text("Unanswered: " + unanswered + "");
  }

  // Start Game Function
  function startGame() {
    $(".card").hide();
  }
  startGame();

  // Start Game On Click Function
  $(".start").on("click", function() {
    displayQuestion();
    displayTime();
    startTime();
    $(".card").show();
  });
});

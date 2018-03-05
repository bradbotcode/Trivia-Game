var qA = [
  {
    question: "Rock climbing was initially a sub sport of which other sport?",
    answers: ["Mountaineering", "Ice Climbing", "Hiking", "Skiing"],
    correctAnswer: 0
  },
  {
    question:
      "Which of the following is NOT a common piece of bouldering equipment?",
    answers: ["Chalk", "Gloves", "Carabiner", "Brush"],
    correctAnswer: 1
  },
  {
    question:
      "Which of the following is a common grading scale for bouldering problems?",
    answers: ["V scale", "Color scale", "Number scale", "Sliding scale"],
    correctAnswer: 0
  },
  {
    question: "What kind of knot is an alpine butterfly knot?",
    answers: [
      "Double loop knot",
      "Stopper knot",
      "Hitch knot",
      "Single loop knot"
    ],
    correctAnswer: 3
  },
  {
    question:
      "What term is used to describe the process that typically uses a rope system to protect a climber in the event of a fall?",
    answers: ["Spotting", "Belaying", "Flaking", "Lowering"],
    correctAnswer: 1
  },
  {
    question: "In what decade was rock climbing first considered a sport?",
    answers: ["1920s", "1940s", "1950s", "1960s"],
    correctAnswer: 2
  },
  {
    question:
      "What style of climbing is performed on small, tricky formations without the use of ropes or a harness?",
    answers: ["Leading", "Bouldering", "Trad", "Scrambling"],
    correctAnswer: 1
  },
  {
    question: "What is another commonly used term for bouldering routes?",
    answers: ["Problem", "Feature", "Path", "Grade"],
    correctAnswer: 0
  },
  {
    question:
      "What style of climbing hold is usually no deepr than one inch and is grabbed with the tips of the fingers?",
    answers: ["Jug", "Pinch", "Sloper", "Crimp"],
    correctAnswer: 3
  },
  {
    question:
      "Which of the following terms is NOT a movement technique in climbing?",
    answers: ["Mantle", "Smear", "Flag", "Grab"],
    correctAnswer: 3
  }
];

// Define variables
$(document).ready(function() {
  var count = 0;
  var time = 31;
  var isSelected = false;
  var ticker;
  var correct = 0;
  var incorrect = 0;
  var unanswered = 0;

  // Questions and Answer Arrays
  var question = [
    "Rock climbing was initially a sub sport of which other sport?",
    "Which of the following is NOT a common piece of bouldering equipment?",
    "Which of the following is a common grading scale for bouldering problems?",
    "What kind of knot is an alpine butterfly knot?",
    "What term is used to describe the process that typically uses a rope system to protect a climber in the event of a fall?",
    "In what decade was rock climbing first considered a sport?",
    "What style of climbing is performed on small, tricky formations without the use of ropes or a harness?",
    "What is another commonly used term for bouldering routes?",
    "What style of climbing hold is usually no deepr than one inch and is grabbed with the tips of the fingers?",
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
    "Carabiner",
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
    $(".timer").show();
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

  // Check Answer Function
  function checkAnswer() {
    hideHolders();

    if ($(this).text() === answer[count]) {
      stopTime();
      isSelected = true;
      $(".answer-holder").show();
      $(".answer-holder").html("<div>Correct!</div>");
      $(".image-holder").show();
      $(".image-holder").html(
        "<div><img src='assets/images/correct.gif'></div>"
      );
      correct++;
      count++;
    } else {
      stopTime();
      isSelected = true;
      $(".answer-holder").show();
      $(".answer-holder").html(
        "<div>Wrong! The answer is, " + answer[count] + "</div>"
      );
      $(".image-holder").show();
      $(".image-holder").html(
        "<div><img src='assets/images/incorrect.gif'></div>"
      );
      incorrect++;
      count++;
    }

    checkGameEnd();
  }

  // Chekc End Game Function
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

  function resetTime() {
    time = 10;
  }

  function displayTime() {
    time--;
    $(".timer").html("<div>Time remaining: " + time + "</div>");

    if (time <= 0) {
      hideHolders();
      stopTime();
      $(".answer-holder").show();
      $(".answer-holder").html(
        "<div>Time is up! The answer is, " + answer[count] + "</div>"
      );
      displayImage();
      unanswered++;
      count++;
      checkGameEnd();
    }
  }

  function startTime() {
    clearInterval(ticker);
    ticker = setInterval(displayTime, 1000);
  }
  function stopTime() {
    clearInterval(ticker);
    resetTime();
    if (count < question.length - 1) {
      setTimeout(startTime, 2000);
      setTimeout(displayQuestion, 3000);
    }
  }

  resetTime();

  // Display Images With Answer
  //  function displayImage() {
  //  $("#image-holder").html("<div><img src='assets/images/correct.gif'></div>");
  // }

  // Show Results Function
  function showResults() {
    $(".correct-holder").show();
    $(".correct-holder").html("<div>Correct: " + correct + "</div>");
    $(".incorrect-holder").show();
    $(".incorrect-holder").html("<div>Incorrect: " + incorrect + "</div>");
    $(".unanswered-holder").show();
    $(".unanswered-holder").html("<div>Unanswered: " + unanswered + "</div>");
    $(".restart-holder").show();
    $(".restart-holder").html("<div>Click Start above to play again!</div>");
  }

  // Reset Results Function
  function resetResults() {
    correct = 0;
    incorrect = 0;
    unanswered = 0;
  }

  // Start Game Function
  function startGame() {
    startTime();
    displayQuestion();
  }

  // Start Game On Click
  $(".start").on("click", function() {
    startGame();
  });
});

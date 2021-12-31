$('document').ready(function () {
  try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
  }
  catch(e) {
    console.error(e);
    $('.no-browser-support').show();
    $('.app').hide();
  }
  
  
  var noteTextarea = $('#transcript');
  var instructions = $('#recording-instructions');
  
  var noteContent = '';
  console.log("ready");
  
  recognition.continuous = true;
  
  recognition.onresult = function(event) {

    var current = event.resultIndex;
    var transcript = event.results[current][0].transcript;
    var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);
  
    if(!mobileRepeatBug) {
      noteContent += transcript;
      noteTextarea.val(noteContent);
    }
  };
  
  recognition.onstart = function() { 
    instructions.text('Voice recognition activated. Try speaking into the microphone.');
  }
  
  recognition.onspeechend = function() {
    instructions.text('Great. See what I\'ve heard.');
  }
  
  recognition.onerror = function(event) {
    if(event.error == 'no-speech') {
      instructions.text('No speech was detected. Try again.');  
    };
  }
  
  
  $('#start-button').on('click', function(e) {
    console.log("start button pressed");
    if (noteContent.length) {
      noteContent += ' ';
    }
    console.log("Staring recog service...")
    recognition.start();
  });
  
  noteTextarea.on('input', function() {
    noteContent = $(this).val();
  })
  
  $('#stop-button').on('click', function(e) {
    console.log("stop button pressed");
    recognition.stop();
    noteTextarea.val(noteContent);
    console.log(noteContent);
    if(!noteContent.length) {
      instructions.text('Could not search empty content. Please type or say something.');
    }
  })
  
});
  
var output = ["0"];
// get all buttons and add a click event listener
var buttons = document.getElementsByClassName( "calculator-btn" );

for ( var i = 0; i < buttons.length; i++ ) {
  buttons[i].addEventListener( "click", function() {
    var value = this.getAttribute( "data-value" );

    isNaN( value ) ? operators( value ) : numbers( value );
  })
}

function numbers( number ) {
  // if last item in output is a number, concat, otherwise push it and call controller
  if ( Number.isInteger( parseInt( output[output.length - 1] ) ) ) {
    output.push( output.splice(-1) + number );
  } else {
    output.push( number );
    controller();
  }
}

function operators( operator ) {
  switch( operator ) {
    case "clear":
      clear();
      updateOutput( 0 );
      break;
    case "percent":
      percentage();
      break;
  }
}

function clear() {
  output.length = 0;
  output.push("0");
}

function percentage() {
  updateOutput( output[output.length - 1] / 100 );
  clear();
}

function updateOutput( value ) {
  document.getElementById("calculator-output").innerText = value;
}

// function equals() {
//   for ( var i = 0; i < output.length; i++ ) {
//     parseInt( output[i] )
//   }
// }

function controller( value ) {
  output[output.length - 2];

  switch( value ) {
    case "*":
    case "/":
      updateOutput();
      break;
    case "=":
      equals();
      break;
    default:
      output.push( value );
  }
}

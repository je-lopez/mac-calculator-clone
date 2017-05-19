// TODO: I reverted back to not nesting everything to get it mostly working again. Am I too deep? tips?
var output = [];
// TODO: look into bubbling! (note to self)
var buttons = document.getElementsByClassName( "calculator-btn" );

for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener( "click", function() {
    var value = this.getAttribute( "data-value" );

    controller(value);
  })
}

function clear() {
  output.length = 0;
  document.querySelector("#clear").innerText = "AC";
  updateOutput(0);
}

function percentage() {
  return output.pop() / 100;
}

function posNeg() {
  return output.pop() * -1;
}

function dot() {
  return output.pop() + ".";
}

// TODO: refactor mult/div since only difference is (* vs /)
function multiply(position, value) {
  return position === -1 ? output[output.length - 2] * value : output[0] * output[2];
}

function divide(position, value) {
  return position === -1 ? output[output.length - 2] / value : output[0] / output[2];
}

function add() {
  return parseInt(output[0]) + parseInt(output[2]);
}

function subtract() {
  return parseInt(output[0]) - parseInt(output[0]);
}

function calculate(argument) {
  // body...
}

function updateOutput(val) {
  console.log(output);
  document.querySelector("#calculator-output").innerText = val;
}

function controller(value) {
  // TODO: add blink effect via fade in/fade out ?

  if (output.length === 0) {
    if (isNaN(value)) {
      return;
    } else {
      document.querySelector("#clear").innerText = "C";
    }
  }

// TODO: nest this switch in the 1000th if statement to remove duplication ? or better way to handle it?
// TODO: number with "." isn't calculated properly
  switch (value) {
    case "clear":
      clear();
      return;
    case "%":
      if (isNaN(output[output.length - 1])) return;
      var val = percentage();
      output.push(val);
      updateOutput(val);
      return;
    case "pos-neg":
      if (isNaN(output[output.length - 1])) return;
      var val = posNeg();
      output.push(val);
      updateOutput(val);
      return;
    case ".":
      if (isNaN(output[output.length - 1])) return;
      var val = dot();
      output.push(val);
      updateOutput(val);
      return;
    // default:
    //   calculate();
    //   return;
  }

  if (!isNaN(value) && !isNaN(output[output.length - 1])) {
    output.push(output.pop() + value);
    updateOutput(output[output.length - 1]);
    return;
  }

  if (output.length < 3) {
    output.push(value);
    if (!isNaN(value)) updateOutput(value);
    return;
  }

  if (output.length < 4) {
    var val;

    if (["*", "/"].includes(output[1])) {
      val = output[1] === "*" ? multiply(0) : divide(0);
      output = [val, value];
      updateOutput(val);
    } else if (!["*", "/"].includes(value)) {
      val = output[1] === "+" ? add() : subtract();
      output = [val, value];
      updateOutput(val);
    } else {
      output.push(value);
    }

    return;
  } else {
    var val;

    if (["*", "/"].includes(output[3])) {
      val = output[3] === "*" ? multiply(-1, value) : divide(-1, value);
      output = output.splice(0, 2);
      output.push(val);
    } else {
      val = output[1] === "+" ? add() : subtract();
      output = [val, value];
    }

    updateOutput(val);
  }
}

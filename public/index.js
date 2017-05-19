var Calculator = function() {
  var buttons = document.getElementsByClassName("calculator-btn");
  this.output = [];

  this.onClick = function (event) {
    var value = event.target.getAttribute("data-value");

    this.controller(value);
  }.bind(this);

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", this.onClick)
  }

  this.clear = function() {
    this.output.length = 0;
    document.querySelector("#clear").innerText = "AC";
    this.setView(0);
  }

  this.percentage = function() {
    return this.output.pop() / 100;
  }

  this.posNeg = function() {
    return this.output.pop() * -1;
  }

  this.dot = function() {
    return this.output.pop() + ".";
  }

  this.multiply = function(position, value) {
    return position === -1
           ?
           this.output[this.output.length - 2] * value : this.output[0] * this.output[2];
  }

  this.divide = function(position, value) {
    return position === -1
           ?
           this.output[this.output.length - 2] / value : this.output[0] / this.output[2];
  }

  this.add = function() {
    return parseInt(this.output[0]) + parseInt(this.output[2]);
  }

  this.subtract = function() {
    return parseInt(this.output[0]) - parseInt(this.output[2]);
  }

  this.calculate = function(operator) {
    var val;

    switch (operator) {
      case "*":
        val = this.multiply();
        break;
      case "/":
        val = this.divide();
        break;
      case "+":
        val = this.add();
        break;
      case "-":
        val = this.subtract();
        break;
      default:
        break;
    }

    return val;
  }

  this.calculateController = function() {
    var operators = ["*", "/", "+", "-"];

    if (this.output.length === 1) return this.output[0];

    var operator = operators.indexOf(this.output[1]);

    if (this.output.length === 2) this.output.push(this.output[0]);

    return this.calculate(operators[operator]);
    // does not yet account for 2 + 3 *
  }

  this.setView = function(val) {
    document.querySelector(".calculator-output").innerText = val;
  }

  // this.resize = function() {
  //   var element = document.querySelector(".calculator-output");
  //   var size = window.getComputedStyle(element, null).getPropertyValue("font-size");
  //   element.style.fontSize = parseFloat(size) + .08 + "em";
  //   element = element.style.fontSize - 1;
  // }

  this.controller = function(value) {
    if (this.output.length === 0) {
      if (isNaN(value)) {
        return;
      } else {
        document.querySelector("#clear").innerText = "C";
      }
    }

    if (document.querySelector(".calculator-output").innerText.length) this.resize();

    // TODO: nest this in if statement or should I let certain items fall through?
    switch (value) {
      case "clear":
        this.clear();
        return;
      case "%":
        if (isNaN(this.output[this.output.length - 1])) return;
        var val = this.percentage();
        this.output.push(val);
        this.setView(val);
        return;
      case "pos-neg":
        if (isNaN(this.output[this.output.length - 1])) return;
        var val = this.posNeg();
        this.output.push(val);
        this.setView(val);
        return;
      case ".":
        if (isNaN(this.output[this.output.length - 1])) return;
        var val = this.dot();
        this.output.push(val);
        this.setView(val);
        return;
      case "=":
        var val = this.calculateController();
        this.output = [val];
        this.setView(val);
        return;
      default:
        break;
    }

    if (!isNaN(value) && !isNaN(this.output[this.output.length - 1])) {
      this.output.push(this.output.pop() + value);
      this.setView(this.output[this.output.length - 1]);
      return;
    }

    if (this.output.length < 3) {
      this.output.push(value);
      if (!isNaN(value)) this.setView(value);
      return;
    }

    if (this.output.length < 4) {
      var val;

      if (["*", "/"].includes(this.output[1])) {
        val = this.output[1] === "*" ? this.multiply(0) : this.divide(0);
        this.output = [val, value];
        this.setView(val);
      } else if (!["*", "/"].includes(value)) {
        val = this.output[1] === "+" ? this.add() : this.subtract();
        this.output = [val, value];
        this.setView(val);
      } else {
        this.output.push(value);
        return;
      }
    } else {
      var val;

      if (["*", "/"].includes(this.output[3])) {
        val = this.output[3] === "*" ? this.multiply(-1, value) : this.divide(-1, value);
        this.output = this.output.splice(0, 2);
        this.output.push(val);
      } else {
        val = this.output[1] === "+" ? this.add() : this.subtract();
        this.output = [val, value];
      }

      this.setView(val);
    }
  }
};

var calculator1 = new Calculator();


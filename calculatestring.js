/*

 SOLUTION 

Assemble a string from all the digit and operand inputs and calculate it, when hitting the = button.
- calculation is a function calcResult(string) returning and executing new Function("return " + string)()
- the result of the calculation is a number -> needs to be converted back to string 


 EDGE CASES 
 
- 0/0 -> NaN -> 0
- 1/0 -> infinity -> 0
- unsanitized string for function constructor ()
- numbers larger than the display width ->  text-overflow: ellipsis
- backdelete from a single digit positive or negative

*/





var string = '0'  // the string that gets displayed and resolved arithmetically via calcResult()
var start, end;  // used to calculate the time difference between mousedown and mouseup
let longclick = 500 // [ms] end - start > longclick will reset display to '0'

// DOM strings
let display = document.querySelector('.display')
let keypanel = document.querySelector('.keypanel')
// start with calculator-display '0'
displayString(string)

// event bubbling
// assemble all button presses not as click, but as mousedown
// to be able to calculate the time between mousedown and mouseup later for the button '←/C'
keypanel.addEventListener('mousedown', buttonClick)

  
function buttonClick(e) {
  let target = e.target
  start = Date.now()

  switch (target.textContent) {
    case '1':
      string==0 ? string='1' : string+='1';
      displayString(string);
      break;
    case '2':
      string==0 ? string='2' : string+='2';
      displayString(string);
      break;
    case '3':
      string==0 ? string='3' : string+='3';
      displayString(string);
      break;
    case '4':
      string==0 ? string='4' : string+='4';
      displayString(string);
      break;
    case '5':
      string==0 ? string='5' : string+='5';
      displayString(string);
      break;
    case '6':
      string==0 ? string='6' : string+='6';
      displayString(string);
      break;
    case '7':
      string==0 ? string='7' : string+='7';
      displayString(string);
      break;
    case '8':
      string==0 ? string='8' : string+='8';
      displayString(string);
      break;
    case '9':
      string==0 ? string='9' : string+='9';
      displayString(string);
      break;
    case '0':
      string==0 ? string='0' : string+='0';
      displayString(string);
      break;
    case '-':
      string+='-';
      displayString(string);
      break;
    case '+':
      string+='+';
      displayString(string);
      break;
    case '/':
      string+='/';
      displayString(string);
      break;
    case 'x':
      string+='*';
      displayString(string);
      break;
    case '=':
      string==0 ? string='0' : string=calcResult(string)
      if (!isFinite(string)){string=0}  // if string Infinite or NaN -> 0
      string=''+string  // stringify result of calcResult
      displayString(string)
      break;
    case '←/C':
      string==0 ? string='0' : clearButton(target);
      break;
  
    default:
      break;
  }
}

      function displayString() {
        display.textContent=string
      }
      function calcResult() { // calculates arithmetically string to a number
        return new Function('return '+ string)(); // returns the result of an ad hoc written function
      }
      function clearButton(t) {
        var pressduration = 0;

        t.onmouseup = function () {
          end = Date.now()
          pressduration = end - start
          if (pressduration > longclick) { // longclick
            string = '0'
            displayString(string);
          } else {  // shortclick
            // if only a single digit || negative single digit -> '0' in display
            if (string.length==1 || (string[0]=='-' && string.length==2)) {
              string='0'
            } else {string = string.slice(0, -1)}
            displayString(string);
          }
        }
      }
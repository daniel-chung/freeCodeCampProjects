$(document).ready(function() {

  // Initial setting
  var inMemoryResult = 0;
  var inMemoryOperation = '';
  var inputLength = [0, 0];
  var result = 0;
  $('.result').html(result);

  // Function for the buttons
  $('.B_AC').click(function() {
    inMemoryResult = 0;
    inMemoryOperation = '';
    inputLength = [0, 0];
    result = 0;
    $('.result').html(result);
  });

  $('.B_CE').click(function() {
    inputLength = [0, 0];
    result = 0;
    $('.result').html(result);
  })

  // Operators
  $('.B_ADD').click(function() {
    if (inMemoryOperation === 'ADD')
      inMemoryResult += result;
    else if (inMemoryOperation === 'SUB')
      inMemoryResult -= result;
    else if (inMemoryOperation === 'MLT')
      inMemoryResult *= result;
    else if (inMemoryOperation === 'DIV')
      inMemoryResult /= result;
    else
      inMemoryResult = result;
    inputLength = [0, 0];
    result = 0;
    inMemoryOperation = 'ADD'
  })
  $('.B_SUB').click(function() {
    if (inMemoryOperation === 'ADD')
      inMemoryResult += result;
    else if (inMemoryOperation === 'SUB')
      inMemoryResult -= result;
    else if (inMemoryOperation === 'MLT')
      inMemoryResult *= result;
    else if (inMemoryOperation === 'DIV')
      inMemoryResult /= result;
    else
      inMemoryResult = result;
    inputLength = [0, 0];
    result = 0;
    inMemoryOperation = 'SUB'
  })
  $('.B_MLT').click(function() {
    if (inMemoryOperation === 'ADD')
      inMemoryResult += result;
    else if (inMemoryOperation === 'SUB')
      inMemoryResult -= result;
    else if (inMemoryOperation === 'MLT')
      inMemoryResult *= result;
    else if (inMemoryOperation === 'DIV')
      inMemoryResult /= result;
    else
      inMemoryResult = result;
    inputLength = [0, 0];
    result = 0;
    inMemoryOperation = 'MLT'
  })
  $('.B_DIV').click(function() {
    if (inMemoryOperation === 'ADD')
      inMemoryResult += result;
    else if (inMemoryOperation === 'SUB')
      inMemoryResult -= result;
    else if (inMemoryOperation === 'MLT')
      inMemoryResult *= result;
    else if (inMemoryOperation === 'DIV')
      inMemoryResult /= result;
    else
      inMemoryResult = result;
    inputLength = [0, 0];
    result = 0;
    inMemoryOperation = 'DIV'
  })

  $('.B_EQL').click(function() {
    if (inMemoryOperation === 'ADD')
      result += inMemoryResult;
    else if (inMemoryOperation === 'SUB')
      result = inMemoryResult - result;
    else if (inMemoryOperation === 'MLT')
      result *= inMemoryResult;
    else if (inMemoryOperation === 'DIV')
      result = inMemoryResult / result;
    $('.result').html(parseFloat(result.toFixed(10)));
    inMemoryResult = 0;
    inMemoryOperation = '';
    inputLength = [0, 0];
    result = 0;
  })

  // Numeric inputs  
  $('.B_DEC').click(function() {
    inputLength[1] += 1;
    $('.result').html(result + ".");
  })

  $('.B_0').click(function() {
    if (inputLength[1] === 0) {
      result = result * 10;
      if (inputLength[0] > 0) inputLength[0] += 1;
    } else inputLength[1] += 1;
    $('.result').html(
      result.toPrecision(
        Math.max(inputLength[0] + inputLength[1] - 1, 1)
      )
    );
  });
  $('.B_1').click(function() {
    if (inputLength[1] === 0) {
      result = result * 10 + 1;
      inputLength[0] += 1;
    } else {
      result = result + 1 * Math.pow(10, -1 * inputLength[1]);
      inputLength[1] += 1;
    }
    $('.result').html(result);
  });
  $('.B_2').click(function() {
    if (inputLength[1] === 0) {
      result = result * 10 + 2;
      inputLength[0] += 1;
    } else {
      result = result + 2 * Math.pow(10, -1 * inputLength[1]);
      inputLength[1] += 1;
    }
    $('.result').html(result);
  });
  $('.B_3').click(function() {
    if (inputLength[1] === 0) {
      result = result * 10 + 3;
      inputLength[0] += 1;
    } else {
      result = result + 3 * Math.pow(10, -1 * inputLength[1]);
      inputLength[1] += 1;
    }
    $('.result').html(result);
  });
  $('.B_4').click(function() {
    if (inputLength[1] === 0) {
      result = result * 10 + 4;
      inputLength[0] += 1;
    } else {
      result = result + 4 * Math.pow(10, -1 * inputLength[1]);
      inputLength[1] += 1;
    }
    $('.result').html(result);
  });
  $('.B_5').click(function() {
    if (inputLength[1] === 0) {
      result = result * 10 + 5;
      inputLength[0] += 1;
    } else {
      result = result + 5 * Math.pow(10, -1 * inputLength[1]);
      inputLength[1] += 1;
    }
    $('.result').html(result);
  });
  $('.B_6').click(function() {
    if (inputLength[1] === 0) {
      result = result * 10 + 6;
      inputLength[0] += 1;
    } else {
      result = result + 6 * Math.pow(10, -1 * inputLength[1]);
      inputLength[1] += 1;
    }
    $('.result').html(result);
  });
  $('.B_7').click(function() {
    if (inputLength[1] === 0) {
      result = result * 10 + 7;
      inputLength[0] += 1;
    } else {
      result = result + 7 * Math.pow(10, -1 * inputLength[1]);
      inputLength[1] += 1;
    }
    $('.result').html(result);
  });
  $('.B_8').click(function() {
    if (inputLength[1] === 0) {
      result = result * 10 + 8;
      inputLength[0] += 1;
    } else {
      result = result + 8 * Math.pow(10, -1 * inputLength[1]);
      inputLength[1] += 1;
    }
    $('.result').html(result);
  });
  $('.B_9').click(function() {
    if (inputLength[1] === 0) {
      result = result * 10 + 9;
      inputLength[0] += 1;
    } else {
      result = result + 9 * Math.pow(10, -1 * inputLength[1]);
      inputLength[1] += 1;
    }
    $('.result').html(result);
  });
});
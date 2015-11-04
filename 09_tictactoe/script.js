$('document').ready(function() {
  var userPiece = '';
  var compPiece = '';
  var classes = [
    ".r0", ".r1", ".r2",
    ".c0", ".c1", ".c2",
    ".d0", ".d1"
  ];
  var board = {
    score: 0,
    userMoves: []
  };

  // Hide winner bars to start
  for (var i = 0; i < classes.length; i++) {
    $(classes[i].replace('.', '.l-')).hide();
  };

  // Start animation
  $('.piece').hover(
    function() {
      $(this).addClass("button-hover");
    },
    function() {
      $(this).removeClass("button-hover");
    }
  );

  $('.piece-x').click(function() {
    $('.start').animate({
      marginTop: '-600px'
    }, 1050);
    userPiece = 'X';
    compPiece = 'O';
    //playMove();
    setTimeout(playMove, 600);
  })

  $('.piece-o').click(function() {
    $('.start').animate({
      marginTop: '-600px'
    }, 1050);
    userPiece = 'O';
    compPiece = 'X';
    setTimeout(playMove, 600);
  })

  // Function to check for winning
  function checkWinning(piece) {
    for (var i = 0; i < classes.length; i++) {
      var score = 0;
      $(classes[i]).each(function() {
        if ($(this).html() === piece)
          score += 1;
      });
      if (score === 3) {
        return [true, classes[i].replace('.', '.l-')];
      }
    };
    return [false, ''];
  };

  // Animation
  function blinker(elm, t) {
    while (t > 0) {
      elm.fadeOut(300);
      elm.fadeIn(350);
      t--;
    }
    elm.fadeOut(300);
  }

  // Clear board
  function clearBoard() {
    $('.cell').html('');
    board.score = 0;
    board.userMoves = [];

    // Restart game
    setTimeout(playMove, 500);
  };

  //Assert function
  function assertMove(cell, piece) {
    if ($(cell).html() === '') {
      $(cell).html(piece);
      $(cell).addClass("played");
      return true;
    } else {
      alert("Sorry that move is invalid!");
      return false;
    }
  };

  // Computer playing algo
  function playMove() {
    // First move
    if (board.score === 0) {
      assertMove(".r1c1", compPiece);
      // Remove the blocker
      $(".cell").removeClass("played");
      $(".r1c1").addClass("played");
    }

    // User's first move is side
    //West
    else if (board.userMoves[0] === 'r1c0') {
      if (board.score === 2) assertMove(".r2c0", compPiece);
      else if (board.score === 4) {
        if ($(".r0c2").html() === '') assertMove(".r0c2", compPiece);
        else assertMove(".r2c2", compPiece);
      } else if (board.score === 6) {
        if ($(".r0c0").html() === '') assertMove(".r0c0", compPiece);
        else assertMove(".r2c1", compPiece);
      }
    }
    //South
    else if (board.userMoves[0] === 'r2c1') {
      if (board.score === 2) assertMove(".r2c2", compPiece);
      else if (board.score === 4) {
        if ($(".r0c0").html() === '') assertMove(".r0c0", compPiece);
        else assertMove(".r0c2", compPiece);
      } else if (board.score === 6) {
        if ($(".r2c0").html() === '') assertMove(".r2c0", compPiece);
        else assertMove(".r1c2", compPiece);
      }
    }
    //East
    else if (board.userMoves[0] === 'r1c2') {
      if (board.score === 2) assertMove(".r0c2", compPiece);
      else if (board.score === 4) {
        if ($(".r2c0").html() === '') assertMove(".r2c0", compPiece);
        else assertMove(".r0c0", compPiece);
      } else if (board.score === 6) {
        if ($(".r2c2").html() === '') assertMove(".r2c2", compPiece);
        else assertMove(".r0c1", compPiece);
      }
    }
    //North
    else if (board.userMoves[0] === 'r0c1') {
      if (board.score === 2) assertMove(".r0c0", compPiece);
      else if (board.score === 4) {
        if ($(".r2c2").html() === '') assertMove(".r2c2", compPiece);
        else assertMove(".r2c0", compPiece);
      } else if (board.score === 6) {
        if ($(".r0c1").html() === '') assertMove(".r0c1", compPiece);
        else assertMove(".r1c0", compPiece);
      }
    }

    // User's first move is corner
    //NorthWest
    else if (board.userMoves[0] === 'r0c0') {
      if (board.score === 2) assertMove(".r2c2", compPiece);
      else if (board.userMoves[1] === 'r0c1' || board.userMoves[1] === 'r2c1') {
        if (board.score === 4) assertMove(".r0c2", compPiece);
        else if (board.score === 6) {
          if ($(".r2c0").html() === '') assertMove(".r2c0", compPiece);
          else assertMove(".r1c2", compPiece);
        }
      } else if (board.userMoves[1] === 'r1c0' || board.userMoves[1] === 'r1c2') {
        if (board.score === 4) assertMove(".r2c0", compPiece);
        else if (board.score === 6) {
          if ($(".r0c2").html() === '') assertMove(".r0c2", compPiece);
          else assertMove(".r2c1", compPiece);
        }
      }
      // Corners - NE
      else if (board.userMoves[1] === 'r0c2') {
        if (board.score === 4) assertMove(".r0c1", compPiece);
        if (board.score === 6) {
          if ($(".r2c1").html() === '') assertMove(".r2c1", compPiece); // catch user mistake
          else assertMove(".r1c2", compPiece);
        }
        if (board.score === 8) {
          if ($(".r1c0").html() === '') assertMove(".r1c0", compPiece);
          else assertMove(".r2c0", compPiece);
        }
      }
      // Corners - SW
      else if (board.userMoves[1] === 'r2c0') {
        if (board.score === 4) assertMove(".r1c0", compPiece);
        if (board.score === 6) {
          if ($(".r1c2").html() === '') assertMove(".r1c2", compPiece); // catch user mistake
          else assertMove(".r2c1", compPiece);
        }
        if (board.score === 8) {
          if ($(".r0c1").html() === '') assertMove(".r0c1", compPiece);
          else assertMove(".r0c2", compPiece);
        }
      }
    }
    //NorthEast
    else if (board.userMoves[0] === 'r0c2') {
      if (board.score === 2) assertMove(".r2c0", compPiece);
      else if (board.userMoves[1] === 'r0c1' || board.userMoves[1] === 'r2c1') {
        if (board.score === 4) assertMove(".r0c0", compPiece);
        else if (board.score === 6) {
          if ($(".r2c2").html() === '') assertMove(".r2c2", compPiece);
          else assertMove(".r1c2", compPiece);
        }
      } else if (board.userMoves[1] === 'r1c2' || board.userMoves[1] === 'r1c0') {
        if (board.score === 4) assertMove(".r2c2", compPiece);
        else if (board.score === 6) {
          if ($(".r0c0").html() === '') assertMove(".r0c0", compPiece);
          else assertMove(".r2c1", compPiece);
        }
      }
      // Corners - Nw
      else if (board.userMoves[1] === 'r0c0') {
        if (board.score === 4) assertMove(".r0c1", compPiece);
        if (board.score === 6) {
          if ($(".r2c1").html() === '') assertMove(".r2c1", compPiece); // catch user mistake
          else assertMove(".r1c0", compPiece);
        }
        if (board.score === 8) {
          if ($(".r1c2").html() === '') assertMove(".r1c2", compPiece);
          else assertMove(".r2c2", compPiece);
        }
      }
      // Corners - SE
      else if (board.userMoves[1] === 'r2c2') {
        if (board.score === 4) assertMove(".r1c2", compPiece);
        if (board.score === 6) {
          if ($(".r1c0").html() === '') assertMove(".r1c0", compPiece); // catch user mistake
          else assertMove(".r2c1", compPiece);
        }
        if (board.score === 8) {
          if ($(".r0c1").html() === '') assertMove(".r0c1", compPiece);
          else assertMove(".r0c0", comcompPiecePiece);
        }
      }

    }
    //SouthEast
    else if (board.userMoves[0] === 'r2c2') {
      if (board.score === 2) assertMove(".r0c0", compPiece);
      else if (board.userMoves[1] === 'r2c1' || board.userMoves[1] === 'r0c1') {
        if (board.score === 4) assertMove(".r2c0", compPiece);
        else if (board.score === 6) {
          if ($(".r0c2").html() === '') assertMove(".r0c2", compPiece);
          else assertMove(".r1c0", compPiece);
        }
      } else if (board.userMoves[1] === 'r1c2' || board.userMoves[1] === 'r1c0') {
        if (board.score === 4) assertMove(".r0c2", compPiece);
        else if (board.score === 6) {
          if ($(".r2c0").html() === '') assertMove(".r2c0", compPiece);
          else assertMove(".r0c1", compPiece);
        }
      }
      // Corners - NE
      else if (board.userMoves[1] === 'r0c2') {
        if (board.score === 4) assertMove(".r1c2", compPiece);
        if (board.score === 6) {
          if ($(".r1c0").html() === '') assertMove(".r1c0", compPiece); // catch user mistake
          else assertMove(".r0c1", compPiece);
        }
        if (board.score === 8) {
          if ($(".r2c1").html() === '') assertMove(".r2c1", compPiece);
          else assertMove(".r2c0", compPiece);
        }
      }
      // Corners - SW
      else if (board.userMoves[1] === 'r2c0') {
        if (board.score === 4) assertMove(".r2c1", compPiece);
        if (board.score === 6) {
          if ($(".r0c1").html() === '') assertMove(".r0c1", compPiece); // catch user mistake
          else assertMove(".r1c0", compPiece);
        }
        if (board.score === 8) {
          if ($(".r1c2").html() === '') assertMove(".r1c2", compPiece);
          else assertMove(".r0c2", compPiece);
        }
      }
    }
    //SouthWest
    else if (board.userMoves[0] === 'r2c0') {
      if (board.score === 2) assertMove(".r0c2", compPiece);
      else if (board.userMoves[1] === 'r2c1' || board.userMoves[1] === 'r0c1') {
        if (board.score === 4) assertMove(".r2c2", compPiece);
        else if (board.score === 6) {
          if ($(".r0c0").html() === '') assertMove(".r0c0", compPiece);
          else assertMove(".r1c2", compPiece);
        }
      } else if (board.userMoves[1] === 'r1c0' || board.userMoves[1] === 'r1c2') {
        if (board.score === 4) assertMove(".r0c0", compPiece);
        else if (board.score === 6) {
          if ($(".r2c2").html() === '') assertMove(".r2c2", compPiece);
          else assertMove(".r0c1", compPiece);
        }
      }
      // Corners - NW
      else if (board.userMoves[1] === 'r0c0') {
        if (board.score === 4) assertMove(".r1c0", compPiece);
        if (board.score === 6) {
          if ($(".r1c2").html() === '') assertMove(".r1c2", compPiece); // catch user mistake
          else assertMove(".r0c1", compPiece);
        }
        if (board.score === 8) {
          if ($(".r2c1").html() === '') assertMove(".r2c1", compPiece);
          else assertMove(".r2c2", compPiece);
        }
      }
      // Corners - SE
      else if (board.userMoves[1] === 'r2c2') {
        if (board.score === 4) assertMove(".r2c1", compPiece);
        if (board.score === 6) {
          if ($(".r0c1").html() === '') assertMove(".r0c1", compPiece); // catch user mistake
          else assertMove(".r1c2", compPiece);
        }
        if (board.score === 8) {
          if ($(".r1c0").html() === '') assertMove(".r1c0", compPiece);
          else assertMove(".r0c0", compPiece);
        }
      }
    }

    // Keep count of moves
    board.score++;

    // Check for winning
    var compCheckVal = checkWinning(compPiece);
    if (compCheckVal[0]) {
      $('.cell').addClass('played');
      $(compCheckVal[1]).show();
      blinker($(compCheckVal[1]), 2);
      setTimeout(clearBoard, 1800);
    }
  };

  // Main playing function
  $('.cell').click(function() {

    if (!$(this).hasClass("played")) {
      // Apply the user move & record the board sitch
      $(this).html(userPiece);
      board.score++;

      // Add the user's move to the board.userMoves property
      var cellClass = $(this).attr('class').split(' ');
      board.userMoves.push(cellClass[cellClass.length - 1]);

      var userCheckVal = checkWinning(userPiece);
      if (userCheckVal[0]) {
        $('.cell').addClass('played');
        $(userCheckVal[1]).show();
        blinker($(userCheckVal[1]), 3);
        setTimeout(clearBoard, 2700);
      }

      $(this).addClass("played");
      playMove();
    }
  });

});
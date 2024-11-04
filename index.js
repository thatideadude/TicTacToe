let hue, saturation;
let generalCount = 1;

function generatePalette() {
  hue = Math.floor(Math.random() * 359);
  saturation = Math.floor(Math.random() * 75);
  document.querySelector(':root').style.setProperty('--color1', `hsl(${hue}, ${saturation}%, 64%)`)
  document.querySelector(':root').style.setProperty('--color2', `hsl(${hue}, ${saturation}%, 24%)`)
  document.querySelector(':root').style.setProperty('--color3', `hsl(${hue}, ${saturation}%, 94%)`)
};

generatePalette();

function generateBoard() {
  document.querySelector('.container').remove();
  const container = document.createElement('div')
  container.setAttribute('class', 'container');
  container.style.opacity = "0";
  setTimeout(() => {
    document.querySelector('.container').style.opacity = 1;
  }, 10)
  document.body.append(container);
  let i = 1;
  for (let a = 1; a <= 3; a++) {
    const row = document.createElement('div');
    row.setAttribute('class', `row-${a} row`);
    for (let b = 1; b <= 3; b++) {
      const square1 = document.createElement('div');
      square1.setAttribute('class', `square1-${i} square1`);
      square1.setAttribute('onclick', `user.makeMove(${i})`);
      square1.setAttribute('onmouseover', `user.showMove(${i})`);
      square1.setAttribute('onmouseleave', `user.hideMove(${i})`);
      square1.style.opacity = '1';
      const square2 = document.createElement('div');
      square2.setAttribute('class', `square2-${i} square2`);
      square2.style.display = 'none';
      const cross = document.createElement('p');
      cross.innerText = 'x';
      cross.setAttribute('class', `cross-${i} cross`);
      cross.style.display = 'none';
      square1.appendChild(cross);
      const circle = document.createElement('p');
      circle.innerText = 'o';
      circle.setAttribute('class', `circle-${i} circle`);
      // circle.style.display = 'none';
      square2.appendChild(circle);
      row.appendChild(square1);
      row.appendChild(square2);
      document.querySelector('.container').appendChild(row);
      i++;
    }
  }
};

let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];



const user = {
  name: '',

  moves: [],

  result: [],


  showMove: (i) => {
    document.querySelector(`.cross-${i}`).style.display = 'flex'
  },

  hideMove: (i) => {
    document.querySelector(`.cross-${i}`).style.display = 'none';
  },

  makeMove: (i) => {
    generalCount++;

    if (checkForVictory(computer) !== "victory") {

      document.querySelector(`.cross-${i}`).style.display = 'flex';
      document.querySelector(`.square1-${i}`).removeAttribute('onclick');
      document.querySelector(`.square1-${i}`).style.cursor = 'default';
      document.querySelector(`.square1-${i}`).removeAttribute('onmouseover');
      document.querySelector(`.square1-${i}`).removeAttribute('onmouseleave');

      board.splice(board.indexOf(i), 1);
      user.moves.push(i);

      if (checkForVictory(user) === "victory") {
        document.querySelectorAll('.square1').forEach((square) => {
          square.removeAttribute('onclick');
          square.removeAttribute('onmouseover');
          user.celebrate()

        })
      } else {
        computer.generateMove();
      }
    } else { return }
  },

  celebrate: () => {
    document.querySelectorAll('.square1').forEach((element) => {
      element.style.opacity = 0;
    })
    document.querySelectorAll('.square2').forEach((element) => {
      element.style.opacity = 0;
    })
    document.querySelector(`.square1-${user.result[0]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square1-${user.result[0]}`).style.backgroundColor = 'var(--color1)';
    document.querySelector(`.cross-${user.result[0]}`).style.color = 'var(--color3)';
    document.querySelector(`.cross-${user.result[0]}`).innerText = 'w';
    document.querySelector(`.square1-${user.result[0]}`).style.boxShadow = 'none';
    document.querySelector(`.square1-${user.result[0]}`).style.opacity = 1;

    document.querySelector(`.square1-${user.result[0]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square1-${user.result[1]}`).style.backgroundColor = 'var(--color1)';
    document.querySelector(`.cross-${user.result[1]}`).style.color = 'var(--color3)';
    document.querySelector(`.cross-${user.result[1]}`).innerText = 'i';
    document.querySelector(`.square1-${user.result[1]}`).style.boxShadow = 'none';
    document.querySelector(`.square1-${user.result[1]}`).style.opacity = 1;

    document.querySelector(`.square1-${user.result[0]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square1-${user.result[2]}`).style.backgroundColor = 'var(--color1)';
    document.querySelector(`.cross-${user.result[2]}`).style.color = 'var(--color3)';
    document.querySelector(`.cross-${user.result[2]}`).innerText = 'n';
    document.querySelector(`.square1-${user.result[2]}`).style.boxShadow = 'none';
    document.querySelector(`.square1-${user.result[2]}`).style.opacity = 1;
  }

};

const computer = {
  moves: [],
  result: [],


  showMove: (squareNumber) => {
    const show = document.querySelector(`.square2-${squareNumber}`);
    const hide = document.querySelector(`.square1-${squareNumber}`);
    show.style.display = 'flex';
    hide.style.display = 'none';
  },

  play: (number) => {
    board.splice(board.indexOf(number), 1);
    computer.showMove(number);
    computer.moves.push(number);
    generalCount++;
  },

  generateMove: () => {
    if (generalCount === 1) {
      randomMove1 = Math.floor(Math.random() * 4);
      if (randomMove1 === 0) {
        computer.play(1);
      } else if (randomMove1 === 1) {
        computer.play(3)
      } else if (randomMove1 === 2) {
        computer.play(7)
      } else if (randomMove1 === 3) {
        computer.play(9)
      }
    } else if (generalCount === 3) {
      if (board.includes(1) && !computer.moves.includes(1)) {
        computer.play(1);
      } else if (board.includes(3) && !computer.moves.includes(3)) {
        computer.play(3);
      } else if (board.includes(7) && !computer.moves.includes(7)) {
        computer.play(7);
      } else if (board.includes(9) && !computer.moves.includes(9)) {
        computer.play(9);
      }
    } else if (generalCount === 5 || generalCount === 7 || generalCount === 9) {
      if (computer.moves.includes(1) && computer.moves.includes(3) && board.includes(2)) {
        computer.play(2);
      } else if (computer.moves.includes(1) && computer.moves.includes(7) && board.includes(4)) {
        computer.play(4);
      } else if (computer.moves.includes(1) && computer.moves.includes(9) && board.includes(5)) {
        computer.play(5);
      } else if (computer.moves.includes(3) && computer.moves.includes(9) && board.includes(6)) {
        computer.play(6);
      } else if (computer.moves.includes(3) && computer.moves.includes(7) && board.includes(5)) {
        computer.play(5);
      } else if (computer.moves.includes(7) && computer.moves.includes(9) && board.includes(8)) {
        computer.play(8);
      } else if (user.moves.includes(1) && user.moves.includes(2) && board.includes(3)) {
        computer.play(3);
      } else if (user.moves.includes(1) && user.moves.includes(4) && board.includes(7)) {
        computer.play(7);
      } else if (user.moves.includes(2) && user.moves.includes(3) && board.includes(1)) {
        computer.play(1);
      } else if (user.moves.includes(2) && user.moves.includes(5) && board.includes(8)) {
        computer.play(8);
      } else if (user.moves.includes(2) && user.moves.includes(8) && board.includes(5)) {
        computer.play(5);
      } else if (user.moves.includes(3) && user.moves.includes(5) && board.includes(7)) {
        computer.play(7);
      } else if (user.moves.includes(3) && user.moves.includes(6) && board.includes(9)) {
        computer.play(9);
      } else if (user.moves.includes(4) && user.moves.includes(5) && board.includes(6)) {
        computer.play(6);
      } else if (user.moves.includes(4) && user.moves.includes(7) && board.includes(1)) {
        computer.play(1);
      } else if (user.moves.includes(5) && user.moves.includes(6) && board.includes(4)) {
        computer.play(4);
      } else if (user.moves.includes(5) && user.moves.includes(8) && board.includes(2)) {
        computer.play(2);
      } else if (user.moves.includes(7) && user.moves.includes(8) && board.includes(9)) {
        computer.play(9);
      } else if (user.moves.includes(8) && user.moves.includes(9) && board.includes(7)) {
        computer.play(7);
      } else if (computer.moves.includes(1) && computer.moves.includes(3) && board.includes(7)) {
        computer.play(7);
      } else if (computer.moves.includes(1) && computer.moves.includes(3) && board.includes(9)) {
        computer.play(9);
      } else if (computer.moves.includes(1) && computer.moves.includes(7) && board.includes(9)) {
        computer.play(9);
      } else if (computer.moves.includes(1) && computer.moves.includes(9) && board.includes(3)) {
        computer.play(3);
      } else if (computer.moves.includes(1) && computer.moves.includes(9) && board.includes(7)) {
        computer.play(7);
      } else if (computer.moves.includes(3) && computer.moves.includes(7) && board.includes(9)) {
        computer.play(9);
      } else if (computer.moves.includes(3) && computer.moves.includes(9) && board.includes(7)) {
        computer.play(7);
      } else if (computer.moves.includes(1) && computer.moves.includes(9) && board.includes(3)) {
        computer.play(3);
      } else if (computer.moves.includes(1) && computer.moves.includes(7) && board.includes(3)) {
        computer.play(3);
      } else {
        let randomMove = Math.floor(Math.random() * board.length)
        computer.play(board.indexOf(randomMove));
      }



    }

    if (checkForVictory(computer) === "victory") {
      computer.celebrate();
    } checkForDraw();
  },

  celebrate: () => {
    checkForVictory(computer);
    document.querySelectorAll('.square1').forEach((element) => {
      element.style.opacity = 0;
    })
    document.querySelectorAll('.square2').forEach((element) => {
      element.style.opacity = 0;
    })
    document.querySelector(`.square2-${computer.result[0]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square2-${computer.result[0]}`).style.backgroundColor = 'var(--color2)';
    document.querySelector(`.circle-${computer.result[0]}`).style.color = 'var(--color3)';
    document.querySelector(`.circle-${computer.result[0]}`).innerText = 's';
    document.querySelector(`.square2-${computer.result[0]}`).style.boxShadow = 'none';
    document.querySelector(`.square2-${computer.result[0]}`).style.opacity = 1;

    document.querySelector(`.square2-${computer.result[1]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square2-${computer.result[1]}`).style.backgroundColor = 'var(--color2)';
    document.querySelector(`.circle-${computer.result[1]}`).style.color = 'var(--color3)';
    document.querySelector(`.circle-${computer.result[1]}`).innerText = 'o';
    document.querySelector(`.square2-${computer.result[1]}`).style.boxShadow = 'none';
    document.querySelector(`.square2-${computer.result[1]}`).style.opacity = 1;

    document.querySelector(`.square2-${computer.result[2]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square2-${computer.result[2]}`).style.backgroundColor = 'var(--color2)';
    document.querySelector(`.circle-${computer.result[2]}`).style.color = 'var(--color3)';
    document.querySelector(`.circle-${computer.result[2]}`).innerText = 'z';
    document.querySelector(`.square2-${computer.result[2]}`).style.boxShadow = 'none';
    document.querySelector(`.square2-${computer.result[2]}`).style.opacity = 1;

    let timer1;
    timer1 = setTimeout(() => {
      document.querySelectorAll('.square1').forEach((element) => {
        element.style.display = 'none';
      })

      document.querySelectorAll('.square2').forEach((element) => {
        element.style.opacity = 0;
        document.querySelectorAll('.square2').forEach((element) => {
          element.style.display = 'flex';
        })
      })
    }, 1500)

    let timer2;
    timer2 = setTimeout(() => {
      document.querySelectorAll('.circle').forEach((element) => {
        element.style.opacity = 0;
        element.style.color = 'var(--color3)'
      })

      document.querySelector(`.circle-${1}`).innerText = 't';
      document.querySelector(`.circle-${2}`).innerText = 'r';
      document.querySelector(`.circle-${3}`).innerText = 'y';
      document.querySelector(`.circle-${4}`).innerText = '';
      document.querySelector(`.circle-${5}`).innerText = 'a';
      document.querySelector(`.circle-${6}`).innerText = 'g';
      document.querySelector(`.circle-${7}`).innerText = 'a';
      document.querySelector(`.circle-${8}`).innerText = 'i';
      document.querySelector(`.circle-${9}`).innerText = 'n';

      document.querySelector('.scoreboard').style.opacity = 0;
      for (let i = 1; i < 10; i++) {
        let newTimer;
        newTimer = setTimeout(() => {
          document.querySelector(`.square2-${i}`).style.backgroundColor = 'var(--color1)';
          document.querySelector(`.square2-${i}`).style.boxShadow = 'none';
          document.querySelector(`.square2-${i}`).style.border = 'none';
          document.querySelector(`.square2-${i}`).style.opacity = 1;
          document.querySelector(`.circle-${i}`).style.opacity = 1
          document.querySelector(`.circle-${i}`).style.color = 'var(--color2)'

          let newTimer2;
          newTimer2 = setTimeout(() => {
            document.querySelector('.container').style.opacity = 0;


          }, 1000)
        })
      }
    }, 1500)
    let newTimer3;
    newTimer3 = setTimeout(() => {
      location.reload();
    }, 3500)
  }
};

let userWins = 20;
let computerWins = 20;

if (localStorage.getItem('username') === null) {
  generateInitialDialog()
} else {
  user.name = localStorage.getItem('username');
  computer.name = localStorage.getItem('computername')
  generateBoard();
  setTimeout(() => {
    document.querySelector('.username').innerText = `${user.name}`
    document.querySelector('.machinename').innerText = `${computer.name}`

  }, 100);
  computer.generateMove();
}

function checkFormula(player, a, b, c) {
  if (player.moves.includes(a) &&
    player.moves.includes(b) &&
    player.moves.includes(c)) {
    player.result = [a, b, c];
    return "victory";
  }
};

function checkForVictory(player) {

  if (checkFormula(player, 1, 2, 3) ||
    checkFormula(player, 1, 4, 7) === "victory" ||
    checkFormula(player, 1, 5, 9) === "victory" ||
    checkFormula(player, 2, 5, 8) === "victory" ||
    checkFormula(player, 3, 5, 7) === "victory" ||
    checkFormula(player, 3, 6, 9) === "victory" ||
    checkFormula(player, 4, 5, 6) === "victory" ||
    checkFormula(player, 7, 8, 9) === "victory") {
    return "victory"
  }
};


function generateScoreBoard() {
  const scoreboard = document.createElement('div');
  scoreboard.setAttribute('class', 'scoreboard');
  scoreboard.setAttribute('onclick', 'generatePalette()');
  scoreboard.style.opacity = 0;
  const user = document.createElement('div');
  user.setAttribute('class', 'user');
  const username = document.createElement('h1');
  username.setAttribute('class', 'username')
  username.innerText = "Player One";
  user.appendChild(username);
  const score = document.createElement('div');
  score.setAttribute('class', 'result');
  const userScore = document.createElement('div');
  userScore.setAttribute('class', 'userScoreDiv')
  score.appendChild(userScore);

  const userScoreText = document.createElement('h2');
  userScoreText.setAttribute('class', 'userScoreText')
  userScoreText.innerText = `${userWins}`;
  score.appendChild(userScoreText);

  const machineScore = document.createElement('div');
  machineScore.setAttribute('class', 'machineScoreDiv')
  score.appendChild(machineScore);

  const machineScoreText = document.createElement('h2');
  machineScoreText.setAttribute('class', 'machineScoreText')
  machineScoreText.innerText = `${computerWins}`;
  score.appendChild(machineScoreText);

  const machine = document.createElement('div');
  machine.setAttribute('class', 'machine');
  scoreboard.appendChild(user);
  scoreboard.appendChild(score);
  scoreboard.appendChild(machine);
  const machinename = document.createElement('h1');
  machinename.innerText = 'Computer';
  machinename.setAttribute('class', 'machinename')
  machine.appendChild(machinename);
  document.body.appendChild(scoreboard);
  setTimeout(() => {
    document.querySelector('.scoreboard').style.opacity = 1;
  }, 1)
};

generateScoreBoard();

function generateInitialDialog() {
  const dialog = document.createElement('dialog');
  dialog.setAttribute('class', 'dialog');
  dialog.setAttribute('open', 'no');
  dialog.style.opacity = 0;

  const input = document.createElement('input');
  input.setAttribute('class', 'input');
  input.setAttribute('placeholder', 'Set a name for player one ');
  dialog.appendChild(input);

  const submitButton = document.createElement('button');
  submitButton.setAttribute('class', 'submit-button');
  submitButton.innerText = 'Submit';
  submitButton.setAttribute('onclick', 'submitUserName()')
  dialog.appendChild(submitButton);


  document.body.appendChild(dialog);
  setTimeout(() => {
    document.querySelector('.dialog').setAttribute('open', 'yes');
    document.querySelector('.dialog').style.opacity = 1;
    document.querySelector('.input').focus();
  }, 10)
};



function submitUserName() {
  if (!document.querySelector('.input').value) {
    user.name = 'Player One'
    document.querySelector('.username').innerText = `${user.name}`;
  } else {
    user.name = document.querySelector('.input').value.toString();
    document.querySelector('.username').innerText = `${user.name}`;
    localStorage.setItem('username', user.name);
  }
  document.querySelector('.submit-button').setAttribute('onclick', 'submitComputerName()');
  document.querySelector('.input').value = '';
  document.querySelector('.input').setAttribute('placeholder', 'Set a name for the computer');
  document.querySelector('.username').classList.add('animate');
  document.querySelector('.scoreboard').classList.add('flashScoreboard');
  setTimeout(() => {
    document.querySelector('.username').classList.remove('animate');
    document.querySelector('.scoreboard').classList.remove('flashScoreboard');

  }, 700)

};

function submitComputerName() {
  if (!document.querySelector('.input').value) {
    computer.name = 'Computer'
    document.querySelector('.machinename').innerText = `${computer.name}`;
  } else {
    computer.name = document.querySelector('.input').value.toString();
    document.querySelector('.machinename').innerText = `${computer.name}`;
    localStorage.setItem('computername', computer.name);
  }
  document.querySelector('.machinename').classList.add('animate');
  document.querySelector('.dialog').remove();

  document.querySelector('.scoreboard').classList.add('flashScoreboard');
  setTimeout(() => {
    document.querySelector('.username').classList.remove('animate');
    document.querySelector('.scoreboard').classList.remove('flashScoreboard')
  }, 700)

  generateBoard();
  computer.generateMove();
};

function checkForDraw() {
  if (board.length === 0) {
    setTimeout(() => {endInDraw();
    }, 300)}
};

function endInDraw() {
  if (user.moves.length = 4) {
    document.querySelectorAll('.square1').forEach((element) => {
      element.style.opacity = 0;
      element.style.border = 'none';
    })
    document.querySelectorAll('.square2').forEach((element) => {
      element.style.opacity = 0;
    })

    user.moves.sort();

    document.querySelector(`.square1-${user.moves[0]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square1-${user.moves[0]}`).style.backgroundColor = 'var(--color2)';
    document.querySelector(`.cross-${user.moves[0]}`).style.color = 'var(--color3)';
    document.querySelector(`.cross-${user.moves[0]}`).innerText = 'd';
    document.querySelector(`.square1-${user.moves[0]}`).style.boxShadow = 'none';
    document.querySelector(`.square1-${user.moves[0]}`).style.opacity = 1;

    document.querySelector(`.square1-${user.moves[1]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square1-${user.moves[1]}`).style.backgroundColor = 'var(--color2)';
    document.querySelector(`.cross-${user.moves[1]}`).style.color = 'var(--color3)';
    document.querySelector(`.cross-${user.moves[1]}`).innerText = 'r';
    document.querySelector(`.square1-${user.moves[1]}`).style.boxShadow = 'none';
    document.querySelector(`.square1-${user.moves[1]}`).style.opacity = 1;

    document.querySelector(`.square1-${user.moves[2]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square1-${user.moves[2]}`).style.backgroundColor = 'var(--color2)';
    document.querySelector(`.cross-${user.moves[2]}`).style.color = 'var(--color3)';
    document.querySelector(`.cross-${user.moves[2]}`).innerText = 'a';
    document.querySelector(`.square1-${user.moves[2]}`).style.boxShadow = 'none';
    document.querySelector(`.square1-${user.moves[2]}`).style.opacity = 1;

    document.querySelector(`.square1-${user.moves[3]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square1-${user.moves[3]}`).style.backgroundColor = 'var(--color2)';
    document.querySelector(`.cross-${user.moves[3]}`).style.color = 'var(--color3)';
    document.querySelector(`.cross-${user.moves[3]}`).innerText = 'w';
    document.querySelector(`.square1-${user.moves[3]}`).style.boxShadow = 'none';
    document.querySelector(`.square1-${user.moves[3]}`).style.opacity = 1;

    let timer1;
    timer1 = setTimeout(() => {
      document.querySelectorAll('.square1').forEach((element) => {
        element.style.display = 'none';
      })

      document.querySelectorAll('.square2').forEach((element) => {
        element.style.opacity = 1;
        document.querySelectorAll('.square2').forEach((element) => {
          element.style.display = 'flex';
        })
      })
    }, 1500)

    let timer2;
    timer2 = setTimeout(() => {
      document.querySelectorAll('.circle').forEach((element) => {
        element.style.opacity = 1;
        element.style.color = 'var(--color3)'
      })

      document.querySelector(`.circle-${1}`).innerText = 't';
      document.querySelector(`.circle-${2}`).innerText = 'r';
      document.querySelector(`.circle-${3}`).innerText = 'y';
      document.querySelector(`.circle-${4}`).innerText = '';
      document.querySelector(`.circle-${5}`).innerText = 'a';
      document.querySelector(`.circle-${6}`).innerText = 'g';
      document.querySelector(`.circle-${7}`).innerText = 'a';
      document.querySelector(`.circle-${8}`).innerText = 'i';
      document.querySelector(`.circle-${9}`).innerText = 'n';

      document.querySelector('.scoreboard').style.opacity = 0;
      for (let i = 1; i < 10; i++) {
        let newTimer;
        newTimer = setTimeout(() => {
          document.querySelector(`.square2-${i}`).style.backgroundColor = 'var(--color1)';
          document.querySelector(`.square2-${i}`).style.boxShadow = 'none';
          document.querySelector(`.square2-${i}`).style.border = 'none';
          document.querySelector(`.square2-${i}`).style.opacity = 1;
          document.querySelector(`.circle-${i}`).style.opacity = 1
          document.querySelector(`.circle-${i}`).style.color = 'var(--color2)'

          let newTimer2;
          newTimer2 = setTimeout(() => {
            document.querySelector('.container').style.opacity = 0;


          }, 1000)
        })
      }
    }, 1500)
    let newTimer3;
    newTimer3 = setTimeout(() => {
      location.reload();
    }, 3500)
  
  }
}

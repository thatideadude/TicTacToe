let hue, saturation, turnToPlay, userName, computerName, isFirstTime, userWins, computerWins, message, hasGameStarted;
let generalCount = 1;

function generatePalette() {
  hue = Math.floor(Math.random() * 359);
  saturation = Math.floor(Math.random() * 75);
  document.querySelector(':root').style.setProperty('--color1', `hsl(${hue}, ${saturation}%, 64%)`);
  document.querySelector(':root').style.setProperty('--color2', `hsl(${hue}, ${saturation}%, 24%)`);
  document.querySelector(':root').style.setProperty('--color3', `hsl(${hue}, ${saturation}%, 94%)`);
};

document.querySelector('.coin-heads').addEventListener('click', () => {
  flipHeads();
})
document.querySelector('.coin-tails').addEventListener('click', () => {
  flipTails();
})

if (localStorage.getItem('hasgamestarted' === null)) {
  hasGameStarted = 'no';
} else {
  setTimeout(() => {
    hasGameStarted = 'yes';
    localStorage.setItem('hasgamestarted', hasGameStarted)
  }, 3000)
}

function generateBoard() {
  if (localStorage.getItem('isfirsttime') !== 'no') {
    isFirstTime = 'no';
    localStorage.setItem('isfirsttime', isFirstTime)
  } else {
    generatePalette();
  }
  document.querySelector('.coin-heads').removeEventListener('click', flipHeads);
  document.querySelector('.coin-tails').removeEventListener('click', flipTails);
  document.querySelector('.btns-container').remove();
  document.querySelector('.envelope').remove();
  document.querySelector('body').style.opacity = 0;
  timer = setTimeout(() => { document.querySelector('body').style.opacity = 1 }, 100);

  const container = document.createElement('div')
  container.setAttribute('class', 'container');
  container.style.opacity = "0";
  document.body.append(container);
  document.querySelector('.container').style.opacity = 1;



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
      square2.appendChild(circle);
      row.appendChild(square1);
      row.appendChild(square2);
      row.style.opacity = 0;
      document.querySelector('.container').appendChild(row);

      setTimeout(() => {

        document.querySelectorAll('.row').forEach((element) => {
          element.style.opacity = 1;
        }, 50)
      })
      i++;
    }
    setTimeout(() => {
      hasGameStarted = 'yes';
      localStorage.setItem('hasGameStarted', hasGameStarted)
    }, 400)

  } if (localStorage.getItem('turntoplay') === 'computer') {
    computer.generateMove();
  } else { generalCount++ }

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

        })
      } else {
        computer.generateMove();
      }
    }
  },

  celebrate: () => {
    userScoreUpdate();
    turnToPlay = 'user'
    localStorage.setItem('turntoplay', turnToPlay)

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
    document.querySelectorAll('.square1').forEach((element) => {
      element.style.transition = '700ms';
    })

    setTimeout(() => {
      document.querySelectorAll('.square2').forEach((element) => {
        element.style.display = 'none';


        document.querySelectorAll('.square1').forEach((element) => {
          element.style.transition = "opacity 1s"
          element.style.opacity = 1;
          element.style.display = 'flex';
          element.style.backgroundColor = 'var(--color1)'
          document.querySelectorAll('.cross').forEach((element) => {
            element.style.display = 'flex';
            element.style.opacity = 1;
            element.style.color = 'var(--color3)'

            document.querySelector(`.cross-${1}`).innerText = 't';
            document.querySelector(`.cross-${2}`).innerText = 'o';
            document.querySelector(`.cross-${3}`).innerText = 'p';
            document.querySelector(`.cross-${4}`).innerText = '-';
            document.querySelector(`.cross-${5}`).innerText = 'n';
            document.querySelector(`.cross-${6}`).innerText = 'o';
            document.querySelector(`.cross-${7}`).innerText = 't';
            document.querySelector(`.cross-${8}`).innerText = 'c';
            document.querySelector(`.cross-${9}`).innerText = 'h';
          })
        })
      }, 150)





      document.querySelector('.scoreboard').style.opacity = 0;
      for (let i = 1; i < 10; i++) {
        let newTimer;
        newTimer = setTimeout(() => {
          document.querySelector(`.square1-${i}`).style.backgroundColor = 'var(--color1)';
          document.querySelector(`.square1-${i}`).style.boxShadow = 'none';
          document.querySelector(`.square1-${i}`).style.border = 'none';
          document.querySelector(`.square1-${i}`).style.opacity = 1;
          document.querySelector(`.cross-${i}`).style.opacity = 1
          document.querySelector(`.cross-${i}`).style.color = 'var(--color2)'

          let newTimer2;
          newTimer2 = setTimeout(() => {
            document.querySelector('.container').style.opacity = 0;


          }, 1000)
        }, 10)
      }
    }, 1500)
    let newTimer3;
    newTimer3 = setTimeout(() => {
      location.reload();
    }, 3500)

  }
};

const computer = {
  moves: [],
  result: [],


  showMove: (squareNumber) => {
    if (checkForVictory(user) !== "victory"
      && checkForVictory(computer) !== "victory"
      && board.length > 0) {
      const show = document.querySelector(`.square2-${squareNumber}`);
      const hide = document.querySelector(`.square1-${squareNumber}`);
      show.style.display = 'flex';
      hide.style.display = 'none';
    }
  },

  play: (number) => {
    computer.showMove(number);
    setTimeout(() => {
      computer.moves.push(number);
      board.splice(board.indexOf(number), 1);
      generalCount++;
      checkForVictory(user);
      checkForVictory(computer);
      checkForDraw();
    }, 10)
  },

  generateMove: () => {
    if (checkForVictory(user) !== "victory") {
      setTimeout(() => {
        if (generalCount === 1 || generalCount === 2) {
          randomMove1 = Math.floor(Math.random() * 4);
          if (randomMove1 === 0) {
            computer.play(1);
          } else if (randomMove1 === 1) {
            computer.play(3)
          } else if (randomMove1 === 2) {
            computer.play(7)
          } else if (randomMove1 === 3) {
            computer.play(9)
          } else {

            let randomMove = Math.floor(Math.random() * board.length)
            computer.play(board[randomMove]);
          }

        }

        else if (generalCount === 3 || generalCount === 4) {
          if (board.includes(1) && !computer.moves.includes(1)) {
            computer.play(1);
          } else if (board.includes(3) && !computer.moves.includes(3)) {
            computer.play(3);
          } else if (board.includes(7) && !computer.moves.includes(7)) {
            computer.play(7);
          } else if (board.includes(9) && !computer.moves.includes(9)) {
            computer.play(9);
          } else {

            let randomMove = Math.floor(Math.random() * board.length)
            computer.play(board[randomMove]);
          }

        } else if (generalCount === 5 || generalCount === 6 || generalCount === 7
          || generalCount === 8 || generalCount === 9 || generalCount === 10
          || generalCount === 11 || generalCount === 12) {
          if (computer.moves.includes(1) && computer.moves.includes(2) && board.includes(3)) {
            computer.play(3);
          } else if (computer.moves.includes(1) && computer.moves.includes(3) && board.includes(2)) {
            computer.play(2);
          } else if (computer.moves.includes(1) && computer.moves.includes(4) && board.includes(7)) {
            computer.play(7);
          } else if (computer.moves.includes(1) && computer.moves.includes(5) && board.includes(9)) {
            computer.play(9);
          } else if (computer.moves.includes(1) && computer.moves.includes(7) && board.includes(4)) {
            computer.play(4);
          } else if (computer.moves.includes(1) && computer.moves.includes(9) && board.includes(5)) {
            computer.play(5);

          } else if (computer.moves.includes(3) && computer.moves.includes(1) && board.includes(2)) {
            computer.play(2);
          } else if (computer.moves.includes(3) && computer.moves.includes(2) && board.includes(1)) {
            computer.play(1);
          } else if (computer.moves.includes(3) && computer.moves.includes(5) && board.includes(7)) {
            computer.play(7);
          } else if (computer.moves.includes(3) && computer.moves.includes(6) && board.includes(9)) {
            computer.play(9);
          } else if (computer.moves.includes(3) && computer.moves.includes(7) && board.includes(5)) {
            computer.play(5);
          } else if (computer.moves.includes(3) && computer.moves.includes(9) && board.includes(6)) {
            computer.play(6);

          } else if (computer.moves.includes(7) && computer.moves.includes(9) && board.includes(8)) {
            computer.play(8);



          } else if (user.moves.includes(1) && user.moves.includes(2) && board.includes(3)) {
            computer.play(3);
          } else if (user.moves.includes(1) && user.moves.includes(3) && board.includes(2)) {
            computer.play(2);
          } else if (user.moves.includes(1) && user.moves.includes(4) && board.includes(7)) {
            computer.play(7);
          } else if (user.moves.includes(1) && user.moves.includes(7) && board.includes(4)) {
            computer.play(4);
          } else if (user.moves.includes(1) && user.moves.includes(5) && board.includes(9)) {
            computer.play(9);
          } else if (user.moves.includes(1) && user.moves.includes(9) && board.includes(5)) {
            computer.play(5);


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
          } else if (user.moves.includes(3) && user.moves.includes(7) && board.includes(5)) {
            computer.play(5);
          } else if (user.moves.includes(3) && user.moves.includes(9) && board.includes(6)) {
            computer.play(6);

          } else if (user.moves.includes(4) && user.moves.includes(5) && board.includes(6)) {
            computer.play(6);
          } else if (user.moves.includes(4) && user.moves.includes(6) && board.includes(5)) {
            computer.play(5);
          } else if (user.moves.includes(4) && user.moves.includes(7) && board.includes(1)) {
            computer.play(1);

          } else if (user.moves.includes(5) && user.moves.includes(6) && board.includes(4)) {
            computer.play(4);
          } else if (user.moves.includes(5) && user.moves.includes(7) && board.includes(3)) {
            computer.play(3);
          } else if (user.moves.includes(5) && user.moves.includes(8) && board.includes(2)) {
            computer.play(2);

          } else if (user.moves.includes(6) && user.moves.includes(9) && board.includes(3)) {
            computer.play(3);

          } else if (user.moves.includes(7) && user.moves.includes(8) && board.includes(9)) {
            computer.play(9);
          } else if (user.moves.includes(7) && user.moves.includes(9) && board.includes(8)) {
            computer.play(8);

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
            //   //   computer.play(3);
          } else if (computer.moves.includes(1) && computer.moves.includes(7) && board.includes(3)) {
            computer.play(3);
          } else if (board.includes(1)) {
            computer.play(1);
          } else if (board.includes(2)) {
            computer.play(2);
          } else if (board.includes(3)) {
            computer.play(3);
          } else if (board.includes(4)) {
            computer.play(4);
          } else if (board.includes(5)) {
            computer.play(5);
          } else if (board.includes(6)) {
            computer.play(6);
          } else if (board.includes(7)) {
            computer.play(7);
          } else if (board.includes(8)) {
            computer.play(8);
          } else if (board.includes(9)) {
            computer.play(9);
          } else {

            let randomMove = Math.floor(Math.random() * board.length)
            computer.play(board[randomMove]);
          }
        }
        else { computer.play(3); }

        if (checkForVictory(computer) !== "victory") {
          checkForDraw();
        }
      }, 150)
    }
    setTimeout(() => {
      checkForDraw()
      checkForVictory(computer);
    }, 100)
    },

      celebrate: () => {
        if (isCelabrating === 'no') {
          isCelabrating = 'yes';
          turnToPlay = 'computer';
          localStorage.setItem('turntoplay', turnToPlay)
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
          document.querySelectorAll('.square1').forEach((element) => {
            element.style.transition = '1s';
          })
          computerScoreUpdate();
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
          }, 1000)

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
          }, 1200)
          let newTimer3;
          newTimer3 = setTimeout(() => {
            location.reload();
          }, 2500)

        }
      }
};
  let isCelabrating = "no";

  if(localStorage.getItem('userwins') === null) {
    userWins = 0
  } else {
    userWins = JSON.parse(localStorage.getItem('userwins'));
};

if (localStorage.getItem('computerwins') === null) {
  computerWins = 0;
} else {
  computerWins = JSON.parse(localStorage.getItem('computerwins'))
}

if (localStorage.getItem('computername') === null) {
  startTheFilp();
} else {
  userName = localStorage.getItem('username');
  computerName = localStorage.getItem('computername')
  generateBoard();
  generateScoreBoard();
  setTimeout(() => {
    document.querySelector('.username').innerText = `${userName}`
    document.querySelector('.machinename').innerText = `${computerName}`
  }, 100);
  // computer.generateMove();
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

    if (player === computer) {
      computer.celebrate();
    } else {
      user.celebrate();
    }
    return "victory"
  }
};

function generateScoreBoard() {

  const scoreboard = document.createElement('div');
  scoreboard.setAttribute('class', 'scoreboard');
  // scoreboard.setAttribute('onclick', 'generatePalette()');
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
  userScore.setAttribute('class', 'userScoreDiv');
  score.appendChild(userScore);

  const userScoreText = document.createElement('h2');
  userScoreText.setAttribute('class', 'user-score-text');
  userScoreText.innerText = `${userWins}`;
  score.appendChild(userScoreText);

  const machineScore = document.createElement('div');
  machineScore.setAttribute('class', 'machineScoreDiv');
  score.appendChild(machineScore);

  const machineScoreText = document.createElement('h2');
  machineScoreText.setAttribute('class', 'machine-score-text');
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

  const usernameEdit = document.createElement('input');
  usernameEdit.setAttribute('class', 'edit-username-input');
  usernameEdit.setAttribute('value', `${userName}`)
  document.querySelector('.user').appendChild(usernameEdit);

  const machinenameEdit = document.createElement('input');
  machinenameEdit.setAttribute('class', 'edit-machinename-input');
  machinenameEdit.setAttribute('value', `${computerName}`)
  document.querySelector('.machine').appendChild(machinenameEdit);

  if (localStorage.getItem('isfirsttime') !== 'no') {
    document.querySelector('.scoreboard').style.height = '0px';
  }

  document.querySelector('.scoreboard').style.opacity = 1;

  setTimeout(() => {
    if (localStorage.getItem('isfirsttime') !== 'no') {
      document.querySelector('.scoreboard').style.height = '15vh';
    }
    document.querySelector('.machine-score-text').innerText = `${computerWins}`
  }, 500)
};

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
    setTimeout(() => { document.querySelector('.dialog').style.opacity = 1; }, 100)
    document.querySelector('.input').focus();
    document.querySelector('.input').setAttribute('onKeyDown', 'keydownUserSubmit()');
  }, 10)
};

function keydownUserSubmit() {
  if (event.key === 'Enter') {
    submitUserName();
  }
}

function submitUserName() {
  if (!document.querySelector('.input').value) {
    userName = 'Player One'
    document.querySelector('.username').innerText = `${userName}`;
    localStorage.setItem('username', userName);
  } else {
    userName = document.querySelector('.input').value.toString();
    document.querySelector('.username').innerText = `${userName}`;
    localStorage.setItem('username', userName);
  }
  document.querySelector('.input').removeAttribute('onKeyDown');
  document.querySelector('.input').setAttribute('onKeyDown', 'keydownComputerSubmit()');
  document.querySelector('.submit-button').setAttribute('onclick', 'submitComputerName()');
  document.querySelector('.input').value = '';
  document.querySelector('.input').setAttribute('placeholder', 'Set a name for the computer');
  document.querySelector('.username').classList.add('animate');

  setTimeout(() => {
    document.querySelector('.username').classList.remove('animate');

    document.querySelector('.input').focus();

  }, 700)

};


function keydownComputerSubmit() {
  if (event.key === 'Enter') {
    submitComputerName();
  }
}

function submitComputerName() {
  document.querySelector('dialog').style.opacity = 0;
  if (!document.querySelector('.input').value) {
    computerName = 'Computer'
    document.querySelector('.machinename').innerText = `${computerName}`;
    localStorage.setItem('computername', computerName);
  } else {
    computerName = document.querySelector('.input').value.toString();
    document.querySelector('.machinename').innerText = `${computerName}`;
    localStorage.setItem('computername', computerName);
  }
  document.querySelector('.machinename').classList.add('animate2');
  document.querySelector('.dialog').remove();



  setTimeout(() => {
    document.querySelector('.username').classList.remove('animate2');


    generateBoard();
  }, 1200)

};

function checkForDraw() {

  if (board.length === 0 && checkForVictory(user) !== "victory" && checkForVictory(computer) !== "victory") {
    setTimeout(() => {
      endInDraw();
    }, 150)
  }
};

function endInDraw() {
  timeoutId = setTimeout(() => {
    if (user.moves.length === 4 && isCelabrating === 'no') {
      isCelabrating = 'yes';
      document.querySelectorAll('.square1').forEach((element) => {
        element.style.opacity = 0;
        element.style.border = 'none';
      })
      document.querySelectorAll('.square2').forEach((element) => {
        element.style.opacity = 0;
        element.style.border = 'none';
      })

      user.moves.sort();

      document.querySelector('.scoreboard').style.height = '0vh'
      document.querySelector('.scoreboard').style.opacity = "0";

      document.querySelector(`.square1-${user.moves[0]}`).style.transition = 'background-color 1s';
      document.querySelector(`.square1-${user.moves[0]}`).style.backgroundColor = 'var(--color2)';
      document.querySelector(`.cross-${user.moves[0]}`).style.color = 'var(--color3)';
      document.querySelector(`.cross-${user.moves[0]}`).innerText = 'd';

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
      document.querySelector(`.square1-${user.moves[2]}`).style.opacity = 1;

      document.querySelector(`.square1-${user.moves[3]}`).style.transition = 'background-color 1s';
      document.querySelector(`.square1-${user.moves[3]}`).style.backgroundColor = 'var(--color2)';
      document.querySelector(`.cross-${user.moves[3]}`).style.color = 'var(--color3)';
      document.querySelector(`.cross-${user.moves[3]}`).innerText = 'w';
      document.querySelector(`.square1-${user.moves[3]}`).style.opacity = 1;

      document.querySelectorAll('.circle').forEach((element) => {
        element.style.color = 'var(--color1)';
      })
      let timer1;
      timer1 = setTimeout(() => {
        document.querySelectorAll('.square1').forEach((element) => {
          element.style.display = 'none';
        })


        document.querySelectorAll('.square2').forEach((element) => {
          element.style.opacity = 1;
          element.style.border = 'none';
          document.querySelectorAll('.square2').forEach((element) => {
            element.style.display = 'flex';
          })
        })
      }, 1500)

      let timer2;
      timer2 = setTimeout(() => {
        document.querySelectorAll('.circle').forEach((element) => {
          element.style.opacity = 1;
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

    } else if (user.moves.length === 5 && isCelabrating === 'no') {
      isCelabrating = 'yes';

      document.querySelectorAll('.square1').forEach((element) => {
        element.style.opacity = 0;
        element.style.border = 'none';
      })
      document.querySelectorAll('.square2').forEach((element) => {
        element.style.opacity = 0;
        element.style.border = 'none'
      })

      computer.moves.sort();

      document.querySelector('.scoreboard').style.height = '0vh'
      document.querySelector('.scoreboard').style.opacity = "0";

      document.querySelector(`.square2-${computer.moves[0]}`).style.transition = 'background-color 1s';
      document.querySelector(`.square2-${computer.moves[0]}`).style.backgroundColor = 'var(--color1)';
      document.querySelector(`.circle-${computer.moves[0]}`).style.color = 'var(--color3)';
      document.querySelector(`.circle-${computer.moves[0]}`).innerText = 'd';
      document.querySelector(`.square2-${computer.moves[0]}`).style.opacity = 1;

      document.querySelector(`.square2-${computer.moves[1]}`).style.transition = 'background-color 1s';
      document.querySelector(`.square2-${computer.moves[1]}`).style.backgroundColor = 'var(--color1)';
      document.querySelector(`.circle-${computer.moves[1]}`).style.color = 'var(--color3)';
      document.querySelector(`.circle-${computer.moves[1]}`).innerText = 'r';
      document.querySelector(`.square2-${computer.moves[1]}`).style.opacity = 1;

      document.querySelector(`.square2-${computer.moves[2]}`).style.transition = 'background-color 1s';
      document.querySelector(`.square2-${computer.moves[2]}`).style.backgroundColor = 'var(--color1)';
      document.querySelector(`.circle-${computer.moves[2]}`).style.color = 'var(--color3)';
      document.querySelector(`.circle-${computer.moves[2]}`).innerText = 'a';
      document.querySelector(`.square2-${computer.moves[2]}`).style.opacity = 1;

      document.querySelector(`.square2-${computer.moves[3]}`).style.transition = 'background-color 1s';
      document.querySelector(`.square2-${computer.moves[3]}`).style.backgroundColor = 'var(--color1)';
      document.querySelector(`.circle-${computer.moves[3]}`).style.color = 'var(--color3)';
      document.querySelector(`.circle-${computer.moves[3]}`).innerText = 'w';
      document.querySelector(`.square2-${computer.moves[3]}`).style.opacity = 1;

      document.querySelectorAll('.square2').forEach((element) => {
        element.style.transition = '1s';
      })
      document.querySelectorAll('.circle').forEach((element) => {
        element.style.transition = '1s';
      })

      let timer1;
      timer1 = setTimeout(() => {
        document.querySelectorAll('.square1').forEach((element) => {
          element.style.display = 'none';
        })

        document.querySelectorAll('.square2').forEach((element) => {
          element.style.opacity = 1;
          element.style.backgroundColor = 'var(--color1';
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

        for (let i = 1; i < 10; i++) {
          let newTimer;
          newTimer = setTimeout(() => {
            document.querySelector(`.square2-${i}`).style.backgroundColor = 'var(--color1)';
            document.querySelector(`.square2-${i}`).style.boxShadow = 'none';
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
  }, 10)
}

function flipHeads() {

  document.querySelector('.scene').classList.remove('flip5');
  document.getElementById('main-div').classList.remove('flip4');
  document.querySelector('.btns-container').style.transition = '400ms';
  document.querySelector('.btns-container').style.opacity = 0;
  document.querySelector('.paragraph').style.transition = '200ms';
  document.querySelector('.paragraph').style.opacity = 0;

  if (Math.random() > 0.5) {
    document.getElementById('main-div').classList.add('flip1');
    document.querySelector('.scene').classList.add('flip2');
    setTimeout(() => { generateP2('Tails') }, 300)
    turnToPlay = "user";

  } else {
    document.getElementById('main-div').classList.add('flip1');
    document.querySelector('.scene').classList.add('flip3');
    setTimeout(() => { generateP2('Heads') }, 300)
    turnToPlay = "computer";
  }
  localStorage.setItem('turntoplay', turnToPlay)

}

function flipTails() {

  document.querySelector('.scene').classList.remove('flip5');
  document.getElementById('main-div').classList.remove('flip4');
  document.querySelector('.btns-container').style.transition = '400ms';
  document.querySelector('.btns-container').style.opacity = 0;
  document.querySelector('.paragraph').style.transition = '200ms';
  document.querySelector('.paragraph').style.opacity = 0;

  if (Math.random() > 0.5) {
    document.getElementById('main-div').classList.add('flip1');
    document.querySelector('.scene').classList.add('flip2');
    setTimeout(() => { generateP2('Heads') }, 300)
    turnToPlay = "computer";
  } else {

    document.getElementById('main-div').classList.add('flip1');
    document.querySelector('.scene').classList.add('flip3');
    setTimeout(() => { generateP2('Tails') }, 300);
    turnToPlay = "user"
  }
  localStorage.setItem('turntoplay', turnToPlay)
}

function startTheFilp() {
  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'paragraph');
  paragraph.innerHTML = `Let's flip a coin to decide who plays first.`
  document.querySelector('.envelope').appendChild(paragraph);

  setTimeout(() => {

    document.querySelector('.paragraph').style.opacity = 1;
    document.getElementById('main-div').style.opacity = 1;
    document.querySelector('.btns-container').style.opacity = 1;
  }, 1000)
}

function generateP2(result) {
  if (result === 'Heads') {
    message = "Computer will play first."
  } else {
    message = "Congrats, you'll play first!"
  }

  document.getElementById('main-div').classList.add('flip1');
  document.querySelector('.scene').classList.add('flip2');

  document.querySelector('.paragraph').innerText = `${message}`;
  document.querySelector('.paragraph').style.transition = '1000ms'
  setTimeout(() => {
    document.querySelector('.paragraph').style.opacity = 1;
    document.getElementById('main-div').style.transition = '1s';
    setTimeout(() => {
      document.getElementById('main-div').style.opacity = '0';
      document.querySelector('.paragraph').style.opacity = '0';
      setTimeout(() => {
        generateInitialDialog();
        generateScoreBoard();
      }, 500)
    }, 1200)

  }, 3000)
}

function userScoreUpdate() {

  userWins++;
  localStorage.setItem('userwins', JSON.stringify(userWins));
  document.querySelector('.user-score-text').classList.add('refresh-score')
  document.querySelector('.user-score-text').innerText = `${userWins}`

}

function computerScoreUpdate() {
  computerWins++;
  localStorage.setItem('computerwins', JSON.stringify(computerWins));
  document.querySelector('.machine-score-text').classList.add('refresh-score')
  document.querySelector('.machine-score-text').innerText = `${computerWins}`

}

if (localStorage.getItem('hasgamestarted') === 'yes') {

  document.querySelector('.scoreboard').addEventListener('click', (e) => {
    if (e.target !== document.querySelector('.username')
      && e.target !== document.querySelector('.machinename')
      && e.target !== document.querySelector('.edit-username-input')
      && e.target !== document.querySelector('.edit-machinename-input')
      && e.target !== document.querySelector('.user-score-text')
      && e.target !== document.querySelector('.machine-score-text')) {
      generatePalette();
    }
  }, { capture: true })

  document.querySelector('.username').addEventListener('click', () => {
    document.querySelector('.username').style.display = 'none';
    document.querySelector('.edit-username-input').style.display = 'initial';
    document.querySelector('.edit-username-input').focus();
    document.querySelector('.edit-username-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        userName = document.querySelector('.edit-username-input').value;
        document.querySelector('.edit-username-input').style.display = 'none';
        document.querySelector('.username').innerText = userName;
        localStorage.setItem('username', userName);
        document.querySelector('.username').style.display = 'initial';
      }
      if (e.key === 'Escape') {
        document.querySelector('.edit-username-input').value = userName;
        document.querySelector('.edit-username-input').style.display = 'none';
        document.querySelector('.username').style.display = 'initial';
      }
    })
  })

  document.querySelector('.machinename').addEventListener('click', () => {
    document.querySelector('.machinename').style.display = 'none';
    document.querySelector('.edit-machinename-input').style.display = 'initial';
    document.querySelector('.edit-machinename-input').focus();
    document.querySelector('.edit-machinename-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        machineName = document.querySelector('.edit-machinename-input').value;
        document.querySelector('.edit-machinename-input').style.display = 'none';
        document.querySelector('.machinename').innerText = machineName;
        localStorage.setItem('machinename', machineName);
        document.querySelector('.machinename').style.display = 'initial';
      }
      if (e.key === 'Escape') {
        document.querySelector('.edit-machinename-input').style.display = 'none';
        document.querySelector('.machinename').style.display = 'initial';
      }
    })
  });

  document.querySelector('.user-score-text').addEventListener('click', () => {
    generateAlertForScoreReset();
  })

  document.querySelector('.machine-score-text').addEventListener('click', () => {
    generateAlertForScoreReset();
  })

}

function resetTheScore() {
  userWins = 0;
  computerWins = 0;
  document.querySelector('.machine-score-text').innerText = `${computerWins}`;
  document.querySelector('.user-score-text').innerText = `${userWins}`;
  closeResetDialog();
}

function generateAlertForScoreReset() {
  const dialog = document.createElement('dialog');
  dialog.setAttribute('open', 'yes')
  dialog.setAttribute('class', 'dialog-reset')
  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'reset-paragraph')
  paragraph.innerText = 'Fancy a new beginning?'
  dialog.appendChild(paragraph);
  const btnsDiv = document.createElement('div');
  btnsDiv.setAttribute('class', 'reset-btns-container');
  const no = document.createElement('button');
  no.setAttribute('class', 'reset-no-button');
  no.setAttribute('onclick', 'resetTheScore()');
  no.innerText = 'Reset  the score';
  btnsDiv.appendChild(no);
  const yes = document.createElement('button');
  yes.setAttribute('class', 'reset-yes-button');
  yes.setAttribute('onclick', 'restartTheGame()');
  yes.innerText = 'Restart the game';
  btnsDiv.appendChild(yes);
  dialog.appendChild(btnsDiv);
  document.querySelector('.container').style.opacity = 0;
  const closeTag = document.createElement('div');
  closeTag.setAttribute('class', 'close-tag');
  const closeTagX = document.createElement('p');
  closeTagX.setAttribute('class', 'close-tag-x');
  closeTagX.setAttribute('onclick', 'closeResetDialog()')
  closeTagX.innerText = 'x';
  closeTag.appendChild(closeTagX);
  dialog.appendChild(closeTag);
  document.body.append(dialog);
  setTimeout(() => {
    document.querySelector('.dialog-reset').style.height = '25vh';
    setTimeout(() => {
      document.querySelector('.reset-paragraph').style.opacity = 1;
      document.querySelector('.reset-no-button').style.opacity = 1;
      document.querySelector('.reset-yes-button').style.opacity = 1;
    }, 180)
  }, 10)

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeResetDialog();
    }
  }, { once: true })
}


function closeResetDialog() {
  document.querySelector('.close-tag').style.opacity = 0;
  document.querySelector('.reset-paragraph').style.opacity = 0;
  document.querySelector('.reset-no-button').style.opacity = 0;
  document.querySelector('.reset-yes-button').style.opacity = 0;
  setTimeout(() => {
    document.querySelector('.dialog-reset').style.height = '0vh';
    document.querySelector('.container').style.opacity = 1;
  }, 400)
  setTimeout(() => {
    document.querySelector('.dialog-reset').remove()
  }, 1500)
}

function restartTheGame() {
  document.querySelector('.close-tag').style.opacity = 0;
  document.querySelector('.reset-paragraph').style.opacity = 0;
  document.querySelector('.reset-no-button').style.opacity = 0;
  document.querySelector('.reset-yes-button').style.opacity = 0;

  setTimeout(() => {
    document.querySelector('.dialog-reset').style.height = '0vh';
    document.querySelector('.scoreboard').style.height = '0vh';
  }, 400)
  setTimeout(() => {
    document.querySelector('.dialog-reset').remove()
    localStorage.clear();
    location.reload();
  }, 1500)
}
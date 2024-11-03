let hue, saturation;
let generalCount = 1;

function generatePalette() {
  hue = Math.floor(Math.random() * 359);
  saturation = Math.floor(Math.random() * 75);
  document.querySelector(':root').style.setProperty('--color1', `hsl(${hue}, ${saturation}%, 64%)`)
  document.querySelector(':root').style.setProperty('--color2', `hsl(${hue}, ${saturation}%, 24%)`)
  document.querySelector(':root').style.setProperty('--color3', `hsl(${hue}, ${saturation}%, 94%)`)
}



function generateBoard() {
  document.querySelector('.container').remove();
  generatePalette();
  const container = document.createElement('div')
  container.setAttribute('class', 'container');
  container.style.opacity = "0";
  setTimeout(() => {
    document.querySelector('.container').style.opacity = 1;
  }, 500)
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
}

let board = [1, 2, 3, 4, 5, 6, 7, 8, 9];



const user = {
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

}

const computer = {
  moves: [],
  result: [],
  moveCount: 1,

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
      console.log('one');
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
    }

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

    document.querySelector(`.square2-${computer.result[0]}`).style.transition = 'background-color 1s';
    document.querySelector(`.square2-${computer.result[1]}`).style.backgroundColor = 'var(--color2)';
    document.querySelector(`.circle-${computer.result[1]}`).style.color = 'var(--color3)';
    document.querySelector(`.circle-${computer.result[1]}`).innerText = 'o';
    document.querySelector(`.square2-${computer.result[1]}`).style.boxShadow = 'none';
    document.querySelector(`.square2-${computer.result[1]}`).style.opacity = 1;

    document.querySelector(`.square2-${computer.result[0]}`).style.transition = 'background-color 1s';
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
      document.querySelector(`.circle-${2}`).innerText = '';
      document.querySelector(`.circle-${3}`).innerText = 'a';
      document.querySelector(`.circle-${4}`).innerText = 'r';
      document.querySelector(`.circle-${5}`).innerText = 'a';
      document.querySelector(`.circle-${6}`).innerText = 'i';
      document.querySelector(`.circle-${7}`).innerText = 'y';
      document.querySelector(`.circle-${8}`).innerText = 'g';
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
  }
};

function checkFormula(player, a, b, c) {
  if (player.moves.includes(a) &&
    player.moves.includes(b) &&
    player.moves.includes(c)) {
    player.result = [a, b, c];
    return "victory";
  }
}

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
}

generateBoard();
computer.generateMove();
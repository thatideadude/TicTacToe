document.querySelector('.coin-heads').addEventListener('click', () => {
  flipHeads();
})

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

  } else {

    document.getElementById('main-div').classList.add('flip1');
    document.querySelector('.scene').classList.add('flip3');
    setTimeout(() => { generateP2('Heads') }, 300)
  }
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

  } else {

    document.getElementById('main-div').classList.add('flip1');
    document.querySelector('.scene').classList.add('flip3');
    setTimeout(() => { generateP2('Tails') }, 300)
  }
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
  }, 400)
}

let message;
function generateP2(result) {
  if (result === 'Heads') {
    message = "Computer will play first.";
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
        // generateInitialDialog();
      }, 500)
    }, 1200)

  }, 3000)
}

startTheFilp();
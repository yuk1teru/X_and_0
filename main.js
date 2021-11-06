// Реалізувати гру "Хрестики нолики".

// - Створити поле <div data-role="area"></div>, яке має містити дочірні елементи <div data-role="cell"><div data-role="value"></div></div> в якості клітинок.
// - Поле поки має бути розмірністю 3х3 (пізніше врахувати можливість збільшення величини поля).

// - При кліку на клітинку встановлюється текст "х" або "0" (по черзі) в елемент <div data-role="value"></div>.
// - Логіка поведінки стандартна, гра завершується тоді, коли встановилась полоса одноіменних знаків (ххх або 000).
// - Написати функцію обрахунку переможця і виводити відповідне повідоблення в <div data-role="message"></div>.
// - Передбачити можливість нічиї і вивести відповідне повідомлення.

const area = document.querySelector('[data-role="area"]');
const message = document.querySelector('[data-role="message"]');
let step = 0;
const cellsInLine = 3;
const cells = document.querySelectorAll('[data-role="cell"]');

area.addEventListener('click', game);

function game(event) {
  if (event.target.dataset.role === 'cell') {
    if (event.target.textContent !== '') {
      alert('Там уже занято, выбери другую клетку!');
    } else {
      if (step % 2) {
        event.target.innerHTML = '0';
      } else {
        event.target.innerHTML = 'X';
      }
      step += 1;

      setTimeout(() => {
        check();
      }, 0);
    }
  }
}

function verification(i, sign) {
  const arrayWin = createWinOptions(cellsInLine);
  let result;
  for (let j = 0; j < cellsInLine; j += 1) {
    if (cells[arrayWin[i][j]].innerHTML === sign) {
      result = true;
    } else {
      result = false;
      break;
    }
  }
  return result;
}

function check() {
  const arrayWin = createWinOptions(cellsInLine);

  for (let i = 0; i < arrayWin.length; i += 1) {
    if (verification(i, 'X')) {
      message.innerHTML = 'X - win';
      area.removeEventListener('click', game);
    } else if (verification(i, '0')) {
      message.innerHTML = '0 - win';
      area.removeEventListener('click', game);
    } else {
      draw();
    }
  }
}
// function check() {
//   const arrayWin = createWinOptions(cellsInLine);
//   for (let i = 0; i < arrayWin.length; i += 1) {
//     if (cells[arrayWin[i][0]].innerHTML === 'X' &&
//       cells[arrayWin[i][1]].innerHTML === 'X' &&
//       cells[arrayWin[i][2]].innerHTML === 'X') {
//       message.innerHTML = 'X - win';
//       area.removeEventListener('click', game);
//     } else if (
//       cells[arrayWin[i][0]].innerHTML === '0' &&
//       cells[arrayWin[i][1]].innerHTML === '0' &&
//       cells[arrayWin[i][2]].innerHTML === '0'
//     ) {
//       message.innerHTML = '0 - win';
//       area.removeEventListener('click', game);
//     } else {
//       draw();
//     }
//   }
// }

function draw() {
  if (step === cellsInLine * cellsInLine && message.innerHTML === '') {
    message.innerHTML = 'ничья';
    area.removeEventListener('click', game);
  }
}

function createWinOptions(cellsInLine) {
  const result = [];
  let arr = [];
  const r = cellsInLine;

  //создал горизонтальные победы
  for (let i = 1; i < r * r + 1; i += 1) {
    arr.push(i - 1);
    if (i % r === 0) {
      result.push(arr);
      arr = [];
    }
  }
  //создал диагональную победу
  let diagonal = [];
  for (let i = 0; i < r; i += 1) {
    diagonal.push(result[i][i]);
  }
  let antiDiagonal = [];
  let j = 0;
  //создал антидиагональную победу
  for (let i = r - 1; i >= 0; i -= 1) {
    antiDiagonal.push(result[i][j]);
    j += 1;
  }
  let vertical = [];
  //создал вертикальную победу
  for (let i = 1; i < r + 1; i += 1) {
    for (let k = 1; k < r + 1; k += 1) {
      vertical.push(result[k - 1][i - 1]);
      if (k % r === 0) {
        result.push(vertical);
        vertical = [];
      }
    }
  }
  return [...result, diagonal, antiDiagonal];
}

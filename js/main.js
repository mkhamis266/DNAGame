let DNAImagesSrc = [
  'images/correct.png',
  'images/dna-2.png',
  'images/dna-3.png',
  'images/dna-4.png',
  'images/dna-5.png',
  'images/dna-6.png',
  'images/dna-7.png',
  'images/dna-8.png',
  'images/dna-9.png',
  'images/dna-10.png',
  'images/dna-11.png',
  'images/dna-12.png',
];

$('#startGameButton').on('click', startGame);
startGame();
function startGame() {
  DNAImagesSrc = shuffleArray(DNAImagesSrc);
  for (let i = 0; i < DNAImagesSrc.length; i++) {
    const element = document.createElement('div');
    element.src = DNAImagesSrc[i];
    element.innerHTML = `
    <img src="${DNAImagesSrc[i]}" class="img-fluid">
    `;

    element.classList = 'col-6 draggable p-2';
    if (DNAImagesSrc[i].includes('correct')) {
      element.classList.add('correct');
    }

    if (i < DNAImagesSrc.length / 2) {
      $('#DNAContainerLeft').append(element);
    } else {
      $('#DNAContainerRight').append(element);
    }
  }
  $('#startPage').hide();
  $('#gamePage').show();
}

function showFinalPage() {
  $('#gamePage').hide();
  $('#finalPage').show();
}

function restartGame() {
  $('#finalPage').hide();
  $('#startPage').show();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let targetElement;
$(() => {
  dragula(
    [$('#target')[0], $('#DNAContainerLeft')[0], $('#DNAContainerRight')[0]],
    {
      accepts: function (el, target, source, sibling) {
        targetElement = target;
        if (el.classList.contains('draggable') && target == $('#target')[0]) {
          return true;
        } else {
          return false;
        }
      },
      moves: function (el, source, handle, sibling) {
        return el.classList.contains('draggable') ? true : false;
      },
      copy: true,
    }
  ).on('drop', function (el) {
    if (el.classList.contains('correct') && targetElement == $('#target')[0]) {
      Swal.fire({
        icon: 'success',
        title: 'Correct',
        // text: '',
      });
      el.classList = '';
      $('#target').html(el);
    } else if (
      el.classList.contains('draggable') &&
      targetElement == $('#target')[0]
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Wrong',
        text: 'Try again',
      });
      $(el).remove();
    }
  });
});

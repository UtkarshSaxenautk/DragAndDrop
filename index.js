document.addEventListener('DOMContentLoaded', function() {
  const firstContainer = document.getElementById('firstContainer');
  const secondContainer = document.getElementById('secondContainer');
  const resetButton = document.getElementById('resetButton');
  const messagePopup = document.getElementById('messagePopup');
  const snackbar = document.getElementById('snackbar');
  const placeholders = document.querySelectorAll('.placeholder');
  let draggedItem = null;
  let currentState = [];
  let finalState = [];

  function moveItem(item, targetList) {
      targetList.appendChild(item);
      return true;
  }

  function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', '');
    draggedItem.classList.add('dragging');
    snackbar.classList.remove('show');
  }

  function handleDragOver(e) {
    e.preventDefault();
    const target = e.target.closest('ul');
    if (target === firstContainer || target === secondContainer) {
      e.dataTransfer.dropEffect = 'move';
      const placeholder = target.querySelector('.placeholder');
      if (placeholder) {
        placeholder.style.display = 'block';
      }
    }
  }

  function handleDragLeave(e) {
    const target = e.target.closest('ul');
    if (target === firstContainer || target === secondContainer) {
      const placeholder = target.querySelector('.placeholder');
      if (placeholder) {
        placeholder.style.display = 'none';
      }
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    const target = e.target.closest('ul');
    const placeholder = target.querySelector('.placeholder');
    if (placeholder) {
      placeholder.style.display = 'none';
    }
    if (draggedItem) {
      const source = draggedItem.closest('ul');
      const isMoveSuccessful = moveItem(draggedItem, target);
      draggedItem.classList.remove('dragging');
      draggedItem = null;

        if (isMoveSuccessful) {
            if (target === firstContainer) {
              snackbar.textContent = 'Item moved from list 2 to list 1'
            } else {
                snackbar.textContent = 'Item moved from list 1 to list 2' 
          }
        //snackbar.textContent = 'Item moved successfully!';
        snackbar.classList.add('show');

        setTimeout(function() {
          snackbar.classList.remove('show');
        }, 2000);
      } else {
        // Restore the dragged item to its initial position
        source.appendChild(draggedItem);
      }
    }
  }

  function handleReset() {
    secondContainer.innerHTML = ''; // Clear secondContainer (list2)
    firstContainer.innerHTML = '';
    finalState.forEach(function(containerItem) {
      firstContainer.appendChild(containerItem.cloneNode(true));
    });
  }

  function handleDragEnd() {
    if (draggedItem) {
      draggedItem.classList.remove('dragging');
      draggedItem = null;
      snackbar.textContent = 'Item returned to its default position.';
      snackbar.classList.add('show');

      setTimeout(function() {
        snackbar.classList.remove('show');
      }, 2000);
    }
  }

  firstContainer.addEventListener('dragstart', handleDragStart);
  secondContainer.addEventListener('dragstart', handleDragStart);

  firstContainer.addEventListener('dragover', handleDragOver);
  secondContainer.addEventListener('dragover', handleDragOver);

  firstContainer.addEventListener('dragleave', handleDragLeave);
  secondContainer.addEventListener('dragleave', handleDragLeave);

  firstContainer.addEventListener('drop', handleDrop);
  secondContainer.addEventListener('drop', handleDrop);

  placeholders.forEach(function(placeholder) {
    placeholder.addEventListener('dragover', handleDragOver);
    placeholder.addEventListener('dragleave', handleDragLeave);
    placeholder.addEventListener('drop', handleDrop);
  });

  firstContainer.addEventListener('dragend', handleDragEnd);
  secondContainer.addEventListener('dragend', handleDragEnd);

  // Generate random images and text for list items
  const randomImages = [
    'https://cdn-icons-png.flaticon.com/128/226/226777.png',
    'https://cdn-icons-png.flaticon.com/128/1199/1199124.png',
    'https://cdn-icons-png.flaticon.com/128/919/919841.png',
    'https://cdn-icons-png.flaticon.com/128/5968/5968267.png',
    'https://cdn-icons-png.flaticon.com/128/5968/5968242.png',
  ];

  const randomTexts = ['Java', 'Javascript', 'C++', 'Html', 'Css'];

  // Generate list items for both list1 and list2
  for (let i = 0; i < 5; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('containerItem');
    listItem.draggable = true;

    const image = document.createElement('img');
    image.src = randomImages[i];
    listItem.appendChild(image);

    const text = document.createElement('p');
    text.textContent = randomTexts[i];
    listItem.appendChild(text);

    firstContainer.appendChild(listItem); // Add to list1
    finalState.push(listItem.cloneNode(true));
    currentState.push(listItem.cloneNode(true)); // Store the initial state of list1
  }

  const list2Item = document.createElement('li');
  list2Item.classList.add('containerItem');
  list2Item.draggable = true;

  const image = document.createElement('img');
  image.src = 'https://cdn-icons-png.flaticon.com/128/919/919851.png';
  list2Item.appendChild(image);

  const text = document.createElement('p');
  text.textContent = 'React';
  list2Item.appendChild(text);
  secondContainer.appendChild(list2Item);

  resetButton.addEventListener('click', handleReset);
});

import { useState } from 'react';

export function useDraggableElement(
  parentElement?: HTMLElement | any,
  onClick?: any
) {
  const [isDraggable, setIsDraggable] = useState(false);
  const [element, setElement] = useState<any>();

  if (!element) {
    return {
      isDraggable,
      setElement,
    };
  }

  let parentElem = parentElement || document.body;
  element.style.cursor = 'pointer';
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  // Set the event to start dragging
  // if (document.getElementById(element.id + 'header')) {
  //   //@ts-ignore
  //   document.getElementById(element.id + 'header').onmousedown = dragMouseDown;
  // } else {
  element.onmousedown = dragMouseDown;
  // }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    setIsDraggable(true);
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Calculate new position
    let newTop = element.offsetTop - pos2;
    let newLeft = element.offsetLeft - pos1;

    // Get parent boundaries
    const parentRect = parentElem.getBoundingClientRect();
    const elemRect = element.getBoundingClientRect();

    // Constrain movement within parent bounds
    if (newTop < 0) newTop = 0; // Prevent moving above the parent
    if (newLeft < 0) newLeft = 0; // Prevent moving left of the parent
    if (newTop + elemRect.height > parentRect.height) {
      newTop = parentRect.height - elemRect.height; // Prevent moving below the parent
    }
    if (newLeft + elemRect.width > parentRect.width) {
      newLeft = parentRect.width - elemRect.width; // Prevent moving right of the parent
    }

    // Set the element's new position:
    if (newTop <= window.screen.availHeight - 1 && newTop > 1) {
      element.style.top = newTop + 'px';
    }
    chrome.storage.local.set({ last_top_position: newTop });
    // element.style.left = newLeft + 'px';
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    setTimeout(() => {
      setIsDraggable(false);
    }, 500);
    document.onmouseup = null;
    document.onmousemove = null;
  }

  onClick &&
    element.addEventListener('click', (e) => {
      if (!isDraggable) {
        onClick();
      }
    });

  return {
    isDraggable,
    setElement,
  };
}

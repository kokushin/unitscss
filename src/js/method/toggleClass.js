/**
 * toggleClass.js
 *
 * @example toggleClass('button', 'is-active');
 */

const toggleClass = (element, className) => {
  if (element.classList) {
    element.classList.toggle(className);
  } else {
    const classes = element.className.split(' ');
    const existingIndex = classes.indexOf(className);

    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
    }

    element.className = classes.join(' ');
  }
};

export default toggleClass;

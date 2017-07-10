/**
 * querySelector.js
 *
 * @example $('button', 'click', this.callback, false);
 */

const $ = (element, eventType = false, callback = null, options = false) => {
  const nodeList = document.querySelectorAll(element);

  if (eventType) {
    for (let i = nodeList.length; i--;) {
      nodeList[i].addEventListener(eventType, callback, options);
    }
  } else {
    return nodeList;
  }
};

export default $;

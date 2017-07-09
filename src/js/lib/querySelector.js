const $ = (element, event = false, callback = null, options = false) => {
  const nodeList = document.querySelectorAll(element);

  if (!event) {
    return nodeList;
  } else {
    for (let i = nodeList.length; i--;) {
      nodeList[i].addEventListener(event, callback, options);
    }
  }
};

export default $;

import $ from '../lib/querySelector';

class Menu {
  constructor() {
    this.options = {
      btnClassName:       'uc-menu-btn',
      activeClassName:    '_active',
      openTargetDataName: 'data-open-target',
    };

    this._init();
  }

  _init() {
    $(`.${this.options.btnClassName}`, 'click', this.openMenu.bind(this));
  }

  openMenu(e) {
    e.preventDefault();

    const btn = e.currentTarget;
    const menu = $(btn.getAttribute(this.options.openTargetDataName))[0];

    this.toggleClass(menu, this.options.activeClassName);
    this.toggleClass(btn, this.options.activeClassName);
  }

  toggleClass(element, className) {
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
  }
}

export default Menu;

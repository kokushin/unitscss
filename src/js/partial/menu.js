import $ from '../method/querySelector';
import toggleClass from '../method/toggleClass';

class Menu {
  constructor() {
    this.options = {
      btnClassName:   'uc-menu-btn',
      stateClassName: '_is-active',
      targetDataName: 'data-open-target',
    };

    this._init();
  }

  _init() {
    $(`.${this.options.btnClassName}`, 'click', this.openMenu.bind(this));
  }

  openMenu(e) {
    e.preventDefault();

    const btn = e.currentTarget;
    const menu = $(btn.getAttribute(this.options.targetDataName))[0];

    toggleClass(menu, this.options.stateClassName);
    toggleClass(btn, this.options.stateClassName);
  }
}

export default Menu;

import $ from '../method/querySelector';
import toggleClass from '../method/toggleClass';

class Menu {
  constructor() {
    this.options = {
      btnClassName:       'uc-menu-btn',
      activeClassName:    '_is-active',
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

    toggleClass(menu, this.options.activeClassName);
    toggleClass(btn, this.options.activeClassName);
  }
}

export default Menu;

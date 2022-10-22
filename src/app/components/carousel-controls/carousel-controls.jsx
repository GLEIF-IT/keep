import m from 'mithril';
import IconButton from '../icon-button/icon-button';
import './carousel-controls.scss';

class CarouselControls {
  constructor() {}

  back(vnode) {
    if (vnode.attrs.active === 0) {
      vnode.attrs.setActive(vnode.attrs.numItems - 1);
      return;
    }
    vnode.attrs.setActive(vnode.attrs.active - 1);
  }

  next(vnode) {
    if (vnode.attrs.active === vnode.attrs.numItems - 1) {
      vnode.attrs.setActive(0);
      return;
    }
    vnode.attrs.setActive(vnode.attrs.active + 1);
  }

  view(vnode) {
    const numItemsArray = new Array(vnode.attrs.numItems).fill(0);
    return (
      <>
        <div class="carousel-controls">
          <IconButton
            icon="chevron_left"
            onclick={() => {
              this.back(vnode);
            }}
          />
          <div class="carousel-controls-list">
            {numItemsArray.map((v, idx) => {
              return (
                <div
                  class={`carousel-controls-item ${vnode.attrs.active === idx ? 'carousel-controls-item--active' : ''}`}
                  onclick={() => {
                    vnode.attrs.setActive(idx);
                  }}
                >
                  <div class="carousel-controls-item-circle"></div>
                </div>
              );
            })}
          </div>
          <IconButton
            icon="chevron_right"
            onclick={() => {
              this.next(vnode);
            }}
          />
        </div>
      </>
    );
  }
}

module.exports = CarouselControls;

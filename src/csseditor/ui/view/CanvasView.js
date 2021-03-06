import UIElement from "../../../util/UIElement";

import { PREVENT, WHEEL, ALT, THROTTLE,  } from "../../../util/Event";

import ElementView from "./ElementView";
import PageTools from "../view-items/PageTools";
import PageSubEditor from "../view-items/PageSubEditor";

export default class CanvasView extends UIElement {

  components() {
    return {
      PageTools,
      ElementView,
      PageSubEditor,
    }
  }

  afterRender() {
    this.emit('load.json');
  }
  template() {
    return/*html*/`
      <div class='page-container' tabIndex="-1">
        <div class='page-view'>
          <div class='page-lock scrollbar' ref='$lock'>
            <ElementView ref='$elementView' />
          </div>
        </div>
        <!--<PageSubEditor /> -->
        <PageTools />
      </div>
    `;
  }

  [WHEEL('$lock') + ALT + PREVENT + THROTTLE(10)] (e) {

    var dt = e.deltaY < 0 ? 1.1 : 0.9;
    this.emit('changeScaleValue', this.$editor.scale * dt);
  }

}

import generateContainer from "./Container";
import checkbox from "./Checkbox";

const { default: items } = require("./Constants")

class Control {
  constructor() {
    this.items = items;
  }

  getItems() {
    const div = generateContainer(this.items);
    document.getElementById('content').append(div);
    checkbox()
  }
  
}

export default Control;

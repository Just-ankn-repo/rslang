import generateContainer from "./Container";
import checkbox from "./Checkbox";

export default function getItems(items) {
    const div = generateContainer(items);
    document.getElementById('content').innerHTML = '';
    document.getElementById('content').append(div);
    checkbox()
  }

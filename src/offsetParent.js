/**
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * @returns {{x: number, y: number}}
 */
export default function offsetParent(parent, child) {
  var p = parent.getBoundingClientRect();
  var c = child.getBoundingClientRect();

  return {
    x: -(p.left - c.left - c.width / 2),
    y: -(p.top - c.top - c.height / 2)
  };
}

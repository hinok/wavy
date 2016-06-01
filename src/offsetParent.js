/**
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * @returns {{x: number, y: number}}
 */
function offsetParent(parent, child) {
    var pRect = parent.getBoundingClientRect();
    var cRect = child.getBoundingClientRect();

    return {
        x: -(pRect.left - cRect.left - cRect.width / 2),
        y: -(pRect.top - cRect.top - cRect.height / 2)
    };
}


export default offsetParent;
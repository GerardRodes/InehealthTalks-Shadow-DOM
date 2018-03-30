/* eslint-disable no-undef */
export default class Component extends HTMLElement {
  constructor () {
    super()

    this.shadow = this.attachShadow({mode: 'open'})
    this._mount(this.render())
  }

  _mount (vNode) {
    const vElement = document.createElement(vNode.tag)
    vElement.data = {}
    vElement.methods = {}

    for (let key in vNode.data) {
      vElement.data[key] = vNode.data[key]
    }

    for (let key in vNode.methods) {
      vElement.methods[key] = vNode.methods[key]
    }

    for (let key in vNode.attributes) {
      if (key.startsWith('on')) {
        vElement.addEventListener(key.slice(2), vNode.attributes[key])
        continue
      }

      if (vElement.hasAttribute(key)) {
        vElement.setAttribute(key, vNode.attributes[key])
        continue
      }

      vElement[key] = vNode.attributes[key]
    }

    this.shadow.appendChild(vElement)
  }
}

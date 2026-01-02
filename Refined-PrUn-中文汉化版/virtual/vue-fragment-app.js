import { createApp } from './runtime-dom.esm-bundler.js';
import onNodeDisconnected from './on-node-disconnected.js';
import { h } from './runtime-core.esm-bundler.js';
let scope = void 0;
class FragmentApp {
  fragment;
  app;
  constructor(rootComponent, rootProps) {
    this.fragment = document.createDocumentFragment();
    this.app = createApp({ render: () => h(rootComponent, rootProps) });
    this.addToScope(scope);
  }
  use(plugin, ...options) {
    this.app.use(plugin, ...options);
    return this;
  }
  provide(key, value) {
    this.app.provide(key, value);
    return this;
  }
  mount() {
    return this.app.mount(this.fragment);
  }
  unmount() {
    this.app.unmount();
  }
  appendTo(parent) {
    const instance = this.mount();
    onNodeDisconnected(parent, () => this.app.unmount());
    parent.appendChild(this.fragment);
    return instance;
  }
  prependTo(parent) {
    const instance = this.mount();
    onNodeDisconnected(parent, () => this.app.unmount());
    parent.insertBefore(this.fragment, parent.firstChild);
    return instance;
  }
  before(sibling) {
    const instance = this.mount();
    onNodeDisconnected(sibling.parentElement, () => this.app.unmount());
    sibling.parentElement.insertBefore(this.fragment, sibling);
    return instance;
  }
  after(sibling) {
    const instance = this.mount();
    onNodeDisconnected(sibling.parentElement, () => this.app.unmount());
    sibling.parentElement.insertBefore(this.fragment, sibling.nextSibling);
    return instance;
  }
  addToScope(scope2) {
    scope2?.add(this);
    return this;
  }
}
class FragmentAppScope {
  apps = /* @__PURE__ */ new Set();
  add(app) {
    this.apps.add(app);
  }
  begin() {
    this.unmount();
    scope = this;
  }
  end() {
    scope = void 0;
  }
  unmount() {
    for (const app of this.apps) {
      app.unmount();
    }
    this.apps.clear();
  }
}
function createFragmentApp(rootComponent, rootProps) {
  return new FragmentApp(rootComponent, rootProps);
}
export { FragmentApp, FragmentAppScope, createFragmentApp };

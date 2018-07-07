import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';
import './add-item';
import './list-items';

class MyApp extends LitElement {

  static get properties() {
    return {
      todoList: Object
    }
  }

  constructor() {
    super();

    this.todoList = {
      list: JSON.parse(window.localStorage.getItem('todo-list')) === null ? '' : JSON.parse(window.localStorage.getItem('todo-list')),
    }
  }

  _firstRendered() {
    this.addEventListener('todoListChanged', (e) => {
      this.todoList.list = e.detail.todoList;
      this.requestRender();
    });
    this.addEventListener('todoListRemove', (e) => {
      let index = this.todoList.list.map(function (item) { return item.id }).indexOf(e.detail.item);
      this.todoList.list.splice(index, 1);
      this.todoList.list = _.clone(this.todoList.list);
      this.requestRender();
      window.localStorage.setItem('todo-list', JSON.stringify(this.todoList.list));
    });
  }

  _render({ todoList }) {
    return html`
      <h1>To Do App</h1>
      <add-item></add-item><br><br>
      <list-items todoList="${this.todoList.list}"></list-items>
    `;
  }

}

customElements.define('my-app', MyApp);
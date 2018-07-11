import { LitElement, html } from '@polymer/lit-element';
import './add-item';
import './list-items';

class TodoApp extends LitElement {

  static get properties() {
    return {
      todoList: Object,
      time: Number
    }
  }

  constructor() {
    super();
    this.todoList = {
      list: JSON.parse(window.localStorage.getItem('todo-list')) === null ? '' : JSON.parse(window.localStorage.getItem('todo-list')),
    }
    this.time = 1;
  }

  _firstRendered() { 
    this.addEventListener('todoListTimeChanged', (e) => {
      this.time = this.time === 1 ? 3 : 4;
      this.requestRender();
      setTimeout(() => {
        this.time = e.detail.time;
        this.requestRender();
      },200);
    });
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

  _render({ todoList, time }) {
    return html`
      <add-item></add-item>
      <list-items todoList="${this.todoList.list}" time="${this.time}"></list-items>
    `;
  }
}

customElements.define('todo-app', TodoApp);
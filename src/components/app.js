import { LitElement, html } from '@polymer/lit-element';
import './add-item';
import './list-items';

class TodoApp extends LitElement {

  static get properties() {
    return {
      todoList: Array,
      time: Number
    }
  }

  constructor() {
    super();
    this.todoList = JSON.parse(window.localStorage.getItem('todo-list')) === null ? '' : JSON.parse(window.localStorage.getItem('todo-list'));
    this.time = 1;
  }

  _firstRendered() {
    this.addEventListener('todoListTimeChanged', (e) => {
      this.time = this.time === 1 ? 3 : 4;
      this.requestRender();
      setTimeout(() => {
        this.time = e.detail.time;
        this.requestRender();
      }, 75);
    });
    this.addEventListener('addItem', (e) => {
      this.todoList = e.detail.todoList;
      this.requestRender();
    });
    this.addEventListener('todoItemDoneChange', (e) => {
      console.log('todoItemDoneChange');
      let index = this.todoList.map(function (item) { return item.id }).indexOf(e.detail.item);
      let list = this.todoList.slice();
      let item = Object.assign({}, list[index]);
      item.done = !item.done;
      list[index] = item;
      this.todoList = list;
      //this.todoList = _.sortBy(this.todoList, ['done', 'id']);
      window.localStorage.setItem('todo-list', JSON.stringify(this.todoList));
    });
    this.addEventListener('removeItem', (e) => {
      console.log('todoListRemove');
      let index = this.todoList.map(function (item) { return item.id }).indexOf(e.detail.item);
      this.todoList.splice(index, 1);
      this.todoList = _.clone(this.todoList);
      this.requestRender();
      window.localStorage.setItem('todo-list', JSON.stringify(this.todoList));
    });
  }

  _render({ todoList, time }) {
    return html`
      <add-item></add-item>
      <list-items todoList="${this.todoList}" time="${this.time}"></list-items>
    `;
  }
}

customElements.define('todo-app', TodoApp);
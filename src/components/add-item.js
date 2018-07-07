import { LitElement, html } from '@polymer/lit-element';
import './todo-item';

class AddItem extends LitElement {

  static get properties() {
    return {
      todoList: Array,
      _todoItemToday: String,
      _todoItemTomorrow: String
    }
  }

  _inputKeypress(e, time) {
    if (time === 1) this._todoItemToday = e.target.value;
    else if (time === 2) this._todoItemTomorrow = e.target.value;

    if (e.keyCode == 13) { // enter key
      this._onAddItem(time);
      e.preventDefault();
    }
  }

  _clearInput(time) {
    if (time === 1) this._todoItemToday = '';
    else if (time === 2) this._todoItemTomorrow = '';
  }

  _getTime(time) {
    if (time === 1) return this._todoItemToday;
    else if (time === 2) return this._todoItemTomorrow;
  }

  _onAddItem(time) {
    let storedTodoList = JSON.parse(window.localStorage.getItem('todo-list'));
    if (storedTodoList !== null) {
      storedTodoList.push({
        id: new Date().valueOf(),
        item: this._getTime(time),
        done: false,
        time: time // 1 -> today, 2 -> later
      });
      this.dispatchEvent(new CustomEvent('todoListChanged', { bubbles: true, composed: true, detail: { todoList: storedTodoList } }));
      this._clearInput(time);
    } else {
      storedTodoList = [
        {
          id: new Date().valueOf(),
          item: this._getTime(time),
          done: false,
          time: time
        }
      ];
      this.dispatchEvent(new CustomEvent('todoListChanged', { bubbles: true, composed: true, detail: { todoList: storedTodoList } }));
      this._clearInput(time);
    }
    window.localStorage.setItem('todo-list', JSON.stringify(storedTodoList));
  }

  _render(props) {
    return html`
    <h4>Add Item for Today</h4>  
    <input value=${props._todoItemToday} on-keyup="${(e) => this._inputKeypress(e, 1)}">
    <button on-click="${() => this._onAddItem(1)}">Add</button>
    <hr>
    <h4>Add Item for Tomorrow</h4>  
    <input value=${props._todoItemTomorrow} on-keyup="${(e) => this._inputKeypress(e, 2)}">
    <button on-click="${() => this._onAddItem(2)}">Add</button>
    `;
  }
}

window.customElements.define('add-item', AddItem);
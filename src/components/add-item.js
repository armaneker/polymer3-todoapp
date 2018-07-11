import { LitElement, html } from '@polymer/lit-element';
import { genericStyle } from '../genericStyle.js';

class AddItem extends LitElement {

  static get properties() {
    return {
      todoList: Array, //todoList
      todoItem: String,
      time: Number // 1 -> today, 2 -> later
    }
  }

  constructor() {
    super();
    this.time = 1;
  }

  _inputKeypress(e, time) {
    if (e.keyCode == 13) { // enter key
      this._onAddItem();
      e.preventDefault();
    } else {
      this.todoItem = e.target.value;
    }
  }

  _clearInput() {
    this.todoItem = '';
  }

  _onAddItem() {
    let storedTodoList = JSON.parse(window.localStorage.getItem('todo-list'));
    if (storedTodoList !== null) {
      storedTodoList.push({
        id: new Date().valueOf(),
        item: this.todoItem,
        done: false,
        time: this.time 
      });
      this.dispatchEvent(new CustomEvent('todoListChanged', { bubbles: true, composed: true, detail: { todoList: storedTodoList } }));
      this._clearInput();
    } else {
      storedTodoList = [
        {
          id: new Date().valueOf(),
          item: this.todoItem,
          done: false,
          time: this.time
        }
      ];
      this.dispatchEvent(new CustomEvent('todoListChanged', { bubbles: true, composed: true, detail: { todoList: storedTodoList } }));
      this._clearInput();
    }
    window.localStorage.setItem('todo-list', JSON.stringify(storedTodoList));
  }

  _render(props) {
    return html`
    ${genericStyle}
    <div class="container">
			<div class="add">
				<div class="header">
					<h1>The Doday 🎯</h1>
				</div>
				<div class="d-flex">
					<button class$="btn-tab ${this.time === 1 ? 'active':''}" on-click="${() => { 
            this.time = 1 
            this.dispatchEvent(new CustomEvent('todoListTimeChanged', { bubbles: true, composed: true, detail: { time: this.time } }));
            }}">Today</button>
					<button class$="btn-tab ${this.time === 2 ? 'active':''}" on-click="${() => { 
            this.time = 2
            this.dispatchEvent(new CustomEvent('todoListTimeChanged', { bubbles: true, composed: true, detail: { time: this.time } }));
           }}">Later</button>
				</div>
				<div class="input-container">
          <textarea name="" 
            value=${props.todoItem} 
            on-keyup="${(e) => this._inputKeypress(e)}"
            rows="2" placeholder="📝 Write a task">
          </textarea>
					<button on-click="${() => this._onAddItem()}" class="btn-enter">Press Enter</button>
					<div class="text-counter">0/300</div>
				</div>
				<div class="error">😢 <small>Please write anything</small></div>
				<div class="footer">
					Made with ♥ and <a class="link" href="#">polymer</a>
					<br>by
					<a href="#">@arman_eker</a>
					and <a href="#">@firatgursu</a> in ist.
				</div>
			</div>
		</div>
    `;
  }
}

window.customElements.define('add-item', AddItem);
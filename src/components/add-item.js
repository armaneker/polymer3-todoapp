import { LitElement, html } from '@polymer/lit-element';
import { sharedStyle } from '../genericStyle.js';

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
      this.dispatchEvent(new CustomEvent('addItem', { bubbles: true, composed: true, detail: { todoList: storedTodoList } }));
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
      this.dispatchEvent(new CustomEvent('addItem', { bubbles: true, composed: true, detail: { todoList: storedTodoList } }));
      this._clearInput();
    }
    window.localStorage.setItem('todo-list', JSON.stringify(storedTodoList));
  }

  _render(props) {
    return html`
    ${sharedStyle}
    <style>
      .add {
          position: fixed;
          left: 2rem;
          top: 2rem;
          bottom: 2rem;
          background: #0064FF;
          width:350px;
          padding:1.5rem;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          border-radius:1rem;
      }
      .add textarea {
          border:none;
          border-radius:4px;
          margin:0;
          padding:1rem 1rem 2rem 1rem;
          font-size:1rem;
          width:100%;
          display:block;
          background:#fff;
          resize: none;
          box-sizing: border-box;
          overflow-y: auto;
      }
      .add textarea:focus {
          outline:none;
          box-shadow: 0 0 0 3px #0064FF, 0 0 0 6px rgba(255,255,255,0.5);
      }
      .add textarea:focus ~ .btn-enter {
          display:block;
      }
      .add .btn-enter {
          display:none;
          position: absolute;
          font-size:0.75rem;
          text-transform: uppercase;
          background:#fff;
          padding:0.375rem;
          line-height: 1;
          right:0.25rem;
          bottom:0.25rem;
          border:none;
          border-radius:0.25rem;
          color:#0064FF;
          font-weight: 700;
          cursor:pointer;
          letter-spacing: 0.5px
      }
      .add .btn-enter:hover {
          background:#0064FF;
          color:#fff;
      }
      .add .text-counter {
          font-size:0.75rem;
          color:#bbb;
          font-weight: 700;
          left:0.25rem;
          bottom:0.25rem;
          position: absolute;
          display: block;
          padding:0.375rem 0.375rem 0.375rem 0.875rem;
          line-height: 1;
      }
      .input-container {
          position: relative;
          background:#c9ffc7;
          border-radius:5rem;
          display:flex;
          align-items:center;
      }
      .input-container .right-icon {
        border-radius:0.4rem;
        width:100%;
        max-width:2rem;
        height:2rem;
        background:#fff;
        color:rgba(106,101,99,0.75);
        line-height: 2;
        text-align: center;
        display:block;
        position: absolute;
        right:0.25rem;
        cursor:pointer;
      }
      .input-container .right-icon:hover {
        color:rgba(106,101,99,1);
        background:rgba(106,101,99,0.1);;
      }
      .add .error {
        color:rgba(255,255,255,0.8);
        text-transform: uppercase;
        margin-top:0.5rem;
        text-align: center;
        display: none
      }
      .add.focused .error {
        display: block;
      }
      .header {
        text-align: center;
        color:#fff;
        padding:2rem 0;
      }
      .header h1 {
        padding:0;
        margin:0;
        line-height: 1;
        letter-spacing:3px;
        text-transform:uppercase;
      }
      .btn-tab {
        display:block;
        background:rgba(255,255,255,0.5);
        color:#0064FF;
        border:none;
        font-weight: 700;
        padding:0.625rem;
        font-size:1rem;
        -ms-flex-preferred-size: 0;
        flex-basis: 0;
        -ms-flex-positive: 1;
        flex-grow: 1;
        max-width: 100%;
        margin-bottom:0.5rem;
        cursor:pointer;
        line-height: 1.5;
      }
      .btn-tab:first-child {
        border-radius:4px 0 0 4px;
      }
      .btn-tab:last-child {
        border-radius:0 4px 4px 0;
      }
      .btn-tab:hover {
        background:#fff;
        outline:none;
      }
      .btn-tab:focus {
        outline:none;
      }
      .btn-tab.active {
        background:#fff;
        color:#0064ff
      }
      @media (max-width: 576px) and (orientation:portrait) {
        .add {
          position: relative;
          width:auto;
          left:auto;
          right:auto;
          top:auto;
          bottom: auto;
          border-radius:0;
        }
        .add .header {
          padding:0 1rem 0.5rem 1rem;
        }
        .add .header h1 {
          font-size:1.5rem;
        }
      }

      @media (max-width: 992px) and (orientation:landscape) {
        .add {
          border-radius:0;
          left:0;
          bottom:0;
          top:0;
        }
      }
    </style>
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
            rows="2" placeholder="📝 Write a task"></textarea>
					<button on-click="${() => this._onAddItem()}" class="btn-enter">Press Enter</button>
					<div class="text-counter">0/300</div>
				</div>
				<div class="error">😢 <small>Please write anything</small></div>
			</div>
		</div>
    `;
  }
}

window.customElements.define('add-item', AddItem);
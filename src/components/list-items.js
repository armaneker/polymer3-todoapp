import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';

class ListItems extends LitElement {

    static get properties() {
        return {
            todoList: {
                type: Array
            }
        }
    }

    _render({ todoList }) {
        return html`
    <h4>List</h4>  
    <div>
        ${repeat(this.todoList, (item) => html`
        <todo-item todoItem=${item}></todo-item>
        `)}
      </div>`;
    }
}

customElements.define('list-items', ListItems);
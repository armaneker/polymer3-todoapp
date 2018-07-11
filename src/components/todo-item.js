import { LitElement, html } from '@polymer/lit-element';
import { genericStyle } from '../genericStyle.js';

class TodoItem extends LitElement {

    static get properties() {
        return {
            todoItem: {
                type: Object
            }
        }
    }

    _onRemove(id) {
        this.dispatchEvent(new CustomEvent('todoListRemove', { bubbles: true, composed: true, detail: { item: id } }));
    }

    _render({ todoItem }) {
        return html`
        ${genericStyle}
        <div class="list-item">
            <div class="check"><i class="far fa-square"></i></div>
            <div class="item">${todoItem !== undefined ? todoItem.item : ''}</div>
            <div class="delete"><i class="fas fa-times"></i></div>
        </div>
        <button on-click="${() => this._onRemove(todoItem.id)}}">x</button>
    `;
    }
}

customElements.define('todo-item', TodoItem);
import { LitElement, html } from '@polymer/lit-element';
import { genericStyle } from '../genericStyle.js';

class TodoItem extends LitElement {

    static get properties() {
        return {
            todoItem: Object
        }
    }

    _onRemove(id) {
        this.dispatchEvent(new CustomEvent('removeItem', { bubbles: true, composed: true, detail: { item: id } }));
    }

    _onDone(id) {
        this.dispatchEvent(new CustomEvent('todoItemDoneChange', { bubbles: true, composed: true, detail: { item: id } }));
    }

    _render({ todoItem }) {
        return html`
        ${genericStyle}
        <div class$="list-item ${todoItem.done ? 'done' : ''}" on-click="${() => this._onDone(todoItem.id)}}">
            <div class="check"><i class$="far ${todoItem.done ? 'fa-check-square' : 'fa-square'}"></i></div>
            <div class="item">${todoItem !== undefined ? todoItem.item : ''}</div>
            <button class="delete" on-click="${() => this._onRemove(todoItem.id)}}"><i class="fas fa-times"></i></button>
        </div>
    `;
    }
}

customElements.define('todo-item', TodoItem);
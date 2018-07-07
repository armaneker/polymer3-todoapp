import { LitElement, html } from '@polymer/lit-element';

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
    <li>
        ${todoItem !== undefined ? todoItem.item : ''}
        <button on-click="${() => this._onRemove(todoItem.id)}}">x</button>
      </li>
    `;
    }
}

customElements.define('todo-item', TodoItem);
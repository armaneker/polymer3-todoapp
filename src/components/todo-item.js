import { LitElement, html } from '@polymer/lit-element';
import { sharedStyle } from '../genericStyle.js';

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
        ${sharedStyle}
        <style>
            .list-item {
                display:flex;
                flex-direction:column;
                background:#fff;
                border-radius:4px;
                margin-bottom:0.5rem;
                line-height: 1.5;
                transition: all 200ms linear;
                position: relative;
                overflow:hidden;
            }
            .list-item.done {
                background: rgba(255,255,255,0.5);
                color:#004BC8;
            }
            .list-item:after {
                position: absolute;
                content:"";
                top: -50%;
                right: -50%;
                bottom: -50%;
                left: -50%;
                background: linear-gradient(to bottom, rgba(229,172,142,0), rgba(255,255,255,0.75) 50%, rgba(229,172,142,0));
                transform: rotateZ(45deg) translate(-20em, 22em);
            }
            .list-item.done:after {
                animation: sheen 1s forwards;
            }
            .list-item .item {
                margin-right:auto;
                padding:0.625rem 1rem;
            }
            .list-item .check {
                margin-right:1rem;
                padding-left:1rem;
                padding-top:0.625rem;
                border-radius:0.5rem 0 0 0.5rem;
            }
            .list-item .check-action {
                display:flex;
                width:100%;
                position: relative;
                z-index:20;
                cursor:pointer;
            }
            .list-item .delete {
                padding:0.625rem 1rem;
                border-radius:0 0.5rem 0.5rem 0;
                color:rgba(0,0,0,0.25);
                transition: 100ms all linear;
                border:none;
                background:transparent;
                cursor:pointer;
                -webkit-appearance:button;
                margin-left:auto;
                opacity:0;
                pointer-events: none;
            }
            .list-item:hover .delete {
                opacity:1;
                pointer-events: auto;
            }
            .list-item .delete:hover {
                color:red;
            }
            .list-item .delete:focus {
                outline:none;
            }
            .other-actions {
                display:flex;
                flex-direction: row;
                border-top:1px solid rgba(0,0,0,0.05);
                align-items:center;
                margin:0 1rem;
                position: relative;
                z-index:15;
            }
            .other-actions .switch-board {
                font-size:0.75rem;
                color:rgba(0,0,0,0.25);
                padding:0.5rem 0;
                font-weight: 700;
                text-transform: uppercase;
                cursor:pointer;
            }
            .list-item.done .check-action {
                text-decoration: line-through;
            }
            .list-item.done .other-actions {
                text-decoration: none;
            }
            .other-actions .switch-board:hover {
                color:rgba(0,0,0,0.5);
            }
            .list-item .other-actions .delete {
                opacity:1;
                padding:0.5rem 0 0.5rem 1rem;
                cursor:pointer;
            }
            @keyframes sheen {
              100% {
                transform: rotateZ(60deg) translate(1em, -22em);
              }
            }
            @media (max-width: 576px) and (orientation:portrait) {
                .list-item .delete {
                    opacity:1;
                    pointer-events: auto;
                }
            }
            @media (max-width: 992px) and (orientation:landscape) {
                .list-item .delete {
                    opacity:1;
                    pointer-events: auto;
                }
            }
        </style>
        <div class$="list-item ${todoItem !== undefined && todoItem.done ? 'done' : ''}">
            <div class="check-action" on-click="${() => this._onDone(todoItem.id)}}">
                <div class="check"><i class$="far ${todoItem !== undefined && todoItem.done ? 'fa-check-square' : 'fa-square'}"></i></div>
                <div class="item">${todoItem !== undefined ? todoItem.item : ''}</div>
            </div>
            <div class="other-actions">
                <div class="switch-board"> <i class="fas fa-long-arrow-alt-right fa-lg"></i> Add to Later</div>
                 <button class="delete" on-click="${() => this._onRemove(todoItem.id)}}"><i class="far fa-trash-alt"></i></button>
            </div>
        </div>
    `;
    }
}

customElements.define('todo-item', TodoItem);
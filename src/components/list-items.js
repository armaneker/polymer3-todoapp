import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';
import './todo-item';
import { genericStyle } from '../genericStyle.js';

class ListItems extends LitElement {

    static get properties() {
        return {
            todoList: {
                type: Array
            },
            time: Number
        }
    }

    checkToday() {
        console.log('Today: ' + this.time);
        if(this.time === 1) {
            return 'active';
        } else if (this.time === 3) {
            return 'active hide';
        } else if (this.time === 4) {
            return '';
        } else if (this.time !== 1) {
            return 'hide';
        }
    }

    checkLater() {
        console.log('Later: ' + this.time);
        if(this.time === 2) {
            return 'active';
        } else if (this.time === 4) {
            return 'active hide';
        } else if (this.time === 3) {
            return '';
        } else if (this.time !== 2) {
            return 'hide';
        }
    }

    _render({ todoList, time, checkToday, checkLater }) {
        return html`
        ${genericStyle}
        <div class="lists">
			<div class$="today list ${this.checkToday()}">
				<h2 class="title">Today's List</h2>
                <div class="list-wrapper">
                ${repeat(this.todoList, (item) => item.time === 1 ? html`
					<todo-item todoItem=${item}></todo-item>
                    `:'')}
				</div>
			</div>
			<div class$="next list ${this.checkLater()}">
				<h2 class="title">Later List</h2>
                <div class="list-wrapper">
                ${repeat(this.todoList, (item) => item.time === 2 ? html`
                    <todo-item todoItem=${item}></todo-item>
                    `:'')}
				</div>
			</div>
		</div>`;
    }
}

customElements.define('list-items', ListItems);
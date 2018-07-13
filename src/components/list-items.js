import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';
import './todo-item';
import { sharedStyle } from '../genericStyle.js';

class ListItems extends LitElement {

    static get properties() {
        return {
            todoList: Array,
            time: Number
        }
    }

    checkToday() {
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
        ${sharedStyle}
        <style>
            .lists {
                padding-left:350px;
                margin:0 auto;
                max-width:500px;
            }
            .list {
                opacity:0;
                transform-origin:center bottom;
                transition:200ms all linear;
                pointer-events: none;
            }
            .hide { display:none; }
            .list.next {
                transform: rotate(5deg) translate3d(70px,0,0);
            }
            .list.today {
                transform: rotate(-5deg) translate3d(-70px,0,0);
            }
            .list.today.active {
                transform:rotate(0deg) translateX(0);
            }
            .list.next.active {
                transform:rotate(0deg) translateX(0);
            }
            .list.active {
                opacity:1;
                pointer-events: auto
            }
            .list .title {
                color:#B8D4FF;
                font-size:1.5rem;
                letter-spacing:5px;
                text-transform: uppercase;
                text-align: center;
                margin:3.5rem 0 3.5rem 0;
                line-height: 1;
            }
            .list .list-wrapper  {
                list-style: none;
                margin:0 0.5rem;
                padding:0;
            }
            @media (max-width: 576px) and (orientation:portrait) {
                .lists {
                    padding:0 1rem;
                    margin-bottom:5rem;
                }
                .list .title {
                    margin:1.5rem 1rem;
                    font-size:1.5rem;
                }
            }
        </style>
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
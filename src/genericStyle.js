import { html } from '@polymer/lit-element';

export const genericStyle = html`

<style>
@import url("https://use.fontawesome.com/releases/v5.1.0/css/all.css");
html {
    position: relative;
    background: #004BC8;
    height:100%;
    font-size:15px;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    letter-spacing: -0.02px;
}
body {
    margin:0;
    padding:0;
    /*text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;*/
}
* {
    transition: 120ms all ease-in-out;
}
.container {
}
.footer {
    text-align: center;
    margin-top:auto;
    color:rgba(255,255,255,0.5);
    font-weight: 700;
    font-size: 0.875rem;
    text-transform: uppercase;
    position:fixed;
    width:350px;
    left:2rem;
    bottom:2rem;
    padding:1rem;
}
.footer a {
    color:rgba(255,255,255,0.5);
    text-decoration: none;
}
.footer a:hover {
    color:#fff;
}
.add {
    position: fixed;
    left: 2 rem;
    top: 2 rem;
    bottom: 2 rem;
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
.d-flex {
    display:flex;
    align-items: center;
    margin-top:1rem;
}
.add-btn {
    user-select: none;
    font-size:1rem;
    padding:0.5rem 0.75rem;
    line-height: 1;
    background:rgba(255,255,255,0.2);
    border-radius:4px;
    text-decoration: none;
    color:rgba(255,255,255,0.8);
    font-weight: 700;
    box-shadow:1px 1px 0 rgba(255,255,255,0.15) inset;
}
.add-btn:hover {
    background:rgba(255,255,255,0.25);
    color:#fff;
}
@keyframes nextSelected {
0% { transform:rotate(0deg); }
50% { transform:rotate(15deg);  }
100% { transform:rotate(0deg); }
}
@keyframes todaySelected {
0% { transform:rotate(0deg); }
50% { transform:rotate(-15deg);  }
100% { transform:rotate(0deg); }
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
.list-item {
    cursor:pointer;
    display:flex;
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
    text-decoration: line-through;
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
.list-item .delete {
    padding:0.625rem 1rem;
    border-radius:0 0.5rem 0.5rem 0;
    color:rgba(0,0,0,0.25);
    transition: 100ms all linear;
    border:none;
    background:transparent;
    cursor:pointer;
    -webkit-appearance:button
}
.list-item .delete:hover {
    color:red;
}
.list-item .delete:focus {
    outline:none;
}
.lists {
    padding-left:350px;
    margin:0 auto;
    max-width:500px;
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
@keyframes sheen {
  100% {
    transform: rotateZ(60deg) translate(1em, -22em);
  }
}
/** Portrait Mobile **/

@media (max-width: 576px) and (orientation:portrait) {
    html {
        font-size: 14px;
    }
    .footer {
        width: auto;
        right: 0;
        left: 0;
        bottom: 0;
        background: #004BC8;
        padding: 1rem;
    }
    .add {
        position: relative;
        width: auto;
        left: auto;
        right: auto;
        top: auto;
        bottom: auto;
        border-radius: 0;
    }
    .add .header {
        padding: 0 1rem 0.5rem 1rem;
    }
    .add .header h1 {
        font-size: 1.5rem;
    }
    .lists {
        padding: 0 1rem;
        margin-bottom: 5rem;
    }
    .list .title {
        margin: 1.5rem 1rem;
        font-size: 1.5rem;
    }
}


/** Landscape view mobile & tablets **/

@media (max-width: 992px) and (orientation:landscape) {
    .add {
        border-radius: 0;
        left: 0;
        bottom: 0;
        top: 0;
    }
    .footer {
        left: 0;
        bottom: 0;
    }
}
</style>
`;
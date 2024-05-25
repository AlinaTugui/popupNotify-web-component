const template = document.createElement('template');
template.innerHTML = `
<style>
    .tooltip-container {
    display: inline-block;
    position: relative;
    z-index: 2; 
    }
    
    .cancel {
    display: none;
    }
    
    svg {
    width : 1em;
    cursor: pointer;
    }
    
    .notify-container{
    position: absolute;
    bottom: 125%;
    z-index: 9;
    width: 300px;
    background: white;
    box-shadow: 5px 5px 10px rgba(0,0,0,.1);
    font-size: .8em;
    border-radius: .5em;
    padding: 1em;
    transform: scale(0);
    transform-origin: bottom left;
    transition: transform .5s cubic-bezier(0.86, 0.000, 0.070, 1);
    }
</style>
<div class="tooltip-container">
    <svg viewBox="0 0 20 20" class="alert" width="20" height="20">
        <g id="alert" transform="translate(-835 -445)">
            <circle id="Ellipse_1" data-name="Ellipse 1" cx="10" cy="10" r="10" transform="translate(835 445)" fill="#0000ff"></circle>
            <path id="Path_1" data-name="Path 1" d="M0,0H2.912l-1,7.533H1Z" transform="translate(843.544 452)" fill="#ffffff"></path>
            <circle id="Ellipse_2" data-name="Ellipse 2" cx="1" cy="1" r="1" transform="translate(844 460)" fill="#ffffff"></circle>
        </g>
    </svg>
    <svg viewBox="0 0 20 20" class="cancel">
        <g id="exit" transform="translate(-835 -417)"> 
            <circle id="Ellipse_4" data-name="Ellipse 4" cx="10" cy="10" r="10" transform="translate(835 445)"></circle>
            <rect id="Rectangle_1" data-name="Rectangle 1" width="65" height="9.902" transform="translate(843.544 455)"></rect>
            <rect id="Rectangle_2" data-name="Rectangle 2" width="65" height="9.902" transform="translate(844 455)"></rect>
        </g>
    </svg>
    <div class="notify-container">
    <slot name="message" />
    </div>
</div>
`;

class PopupNotify extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    tooltip(expandState) {
        const tooltip = this.shadowRoot.querySelector('.notify-container');
        const alert = this.shadowRoot.querySelector('.alert');
        const cancel = this.shadowRoot.querySelector('.cancel');

        if(expandState == true) {
            tooltip.style.transform = 'scale(1)';
            alert.style.display = 'none';
            cancel.style.display = 'block';
            expandState = false;
        }
        else {
            tooltip.style.transform = 'scale(0)';
            cancel.style.display = 'none';
            alert.style.display = 'block';
        }
    }
    connectedCallback() {
        this.shadowRoot.querySelector('.alert').addEventListener('click', () => {
            this.tooltip(true)
        })
        this.shadowRoot.querySelector('.cancel').addEventListener('click', () => {
            this.tooltip(false)
        })

        if(this.getAttribute('tip_background')) {
            this.shadowRoot.querySelector('.notify-container').style.background = this.getAttribute('tip_background');
        }

        if(this.getAttribute('tip_color')) {
            this.shadowRoot.querySelector('.notify-container').style.color = this.getAttribute('tip_color');
        }
    }
}
window.customElements.define('popup-notify', PopupNotify);
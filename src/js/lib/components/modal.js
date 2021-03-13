import $ from '../core';

$.prototype.modal = function(animTime, created) {
    for (let i = 0; i < this.length; i++) {
        const target = this[i].getAttribute('data-target');
        let scroll = calcScroll();
        $(this[i]).click((e) => {
            e.preventDefault();
            $(target).fadeIn(animTime);
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`; //add false scroll
        });

        const closeElements = document.querySelectorAll(`${target} [data-close]`); //close only that modal which we want
        closeElements.forEach(elem => {
            $(elem).click(() => {
                hideModaladdScroll(target);
            });
        });
    
        $(target).click(e => {
            if (e.target.classList.contains('modal')) {
                hideModaladdScroll(target);
            }
        });
    }

    function hideModaladdScroll(modal) {
        setTimeout(() => {
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`; //remove false scroll
            if (created) {
                document.querySelector(modal).remove();
            }
        }, animTime);
        $(modal).fadeOut(animTime);
    }

    function calcScroll() { //function to calculate width od scrollLine
        let div = document.createElement('div');

        div.style.width = '60px';
        div.style.height = '60px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }
};

$.prototype.createModal = function({animTime, text, btns} = {}) {
    for (let i = 0; i < this.length; i++) {
        let modal = document.createElement('div');
        modal.classList.add('modal');
        modal.setAttribute('id', this[i].getAttribute('data-target').slice(1)); //the string without first symbol

        // btns = {animTime: time, count: num, settings: [[text, classNames=[], close, cb]]}
        const buttons = [];
        for (let j = 0; j < btns.count; j++) {
            let btn = document.createElement('button');
            btn.classList.add('btn', ...btns.settings[j][1]);
            btn.textContent = btns.settings[j][0];
            if (btns.settings[j][2]) {
                btn.setAttribute('data-close', 'true');
            }
            if (btns.settings[j][3] && typeof(btns.settings[j][3]) === 'function') {
                btn.addEventListener('click', btns.settings[j][3]);
            }

            buttons.push(btn);
        }

        modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <button class="close" data-close>
                    <span>&times;</span>
                </button>
                <div class="modal-header">
                    <div class="modal-title">
                        ${text.title}
                    </div>
                </div>
                <div class="modal-body">
                    ${text.body}
                </div>
                <div class="modal-footer"></div>
            </div>
        </div>
        `;

        modal.querySelector('.modal-footer').append(...buttons); //insert buttons in the modal
        document.body.append(modal); //insert the modal
        $(this[i].getAttribute('data-target')).fadeIn(animTime); //fadeIn the modal after creating
        $(this[i]).modal(animTime, true); //making the modal interactive
    }
};
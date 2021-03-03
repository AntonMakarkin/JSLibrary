import $ from '../core';

$.prototype.animateOverTime = function(dur, cb, fin) { //dur - duration, cb - callback, fin - function in the end
    let timeStart;

    function _animateOverTime(time) { //tech function
        if (!timeStart) {
            timeStart = time;
        }

        let timeElapsed = time - timeStart, //to check the progress
            complection = Math.min(timeElapsed / dur, 1);

        cb(complection);

        if (timeElapsed < dur) {
            requestAnimationFrame(_animateOverTime);
        } else {
            if (typeof fin === 'function') {
                fin();
            }
        }
    }

    return _animateOverTime;
};

$.prototype.fadeIn = function(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        this[i].style.display = display || 'block'; //if display is null - return 'block' (old version)

        const _fadeIn = (complection) => { //changing opacity from 0 to 1
            this[i].style.opacity = complection;
        };

        const anim = this.animateOverTime(dur, _fadeIn, fin);
        requestAnimationFrame(anim);
    }

    return this;
};

$.prototype.fadeOut = function(dur, fin) {
    for (let i = 0; i < this.length; i++) {

        const _fadeOut = (complection) => {
            this[i].style.opacity = 1 - complection; //more transparent with every step
            if (complection === 1) {
                this[i].style.display = 'none'; //if the animation is complete and opacity = 0
            }
        };

        const anim = this.animateOverTime(dur, _fadeOut, fin);
        requestAnimationFrame(anim);
    }

    return this;
};

$.prototype.fadeToggle = function(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === 'none') {
            this[i].style.display = display || 'block'; //if display is null - return 'block' (old version)

            const _fadeIn = (complection) => { //changing opacity from 0 to 1
                this[i].style.opacity = complection;
            };

            const anim = this.animateOverTime(dur, _fadeIn, fin);
            requestAnimationFrame(anim);
        } else {
            const _fadeOut = (complection) => {
                this[i].style.opacity = 1 - complection; //more transparent with every step
                if (complection === 1) {
                    this[i].style.display = 'none'; //if the animation is complete and opacity = 0
                }
            };
    
            const anim = this.animateOverTime(dur, _fadeOut, fin);
            requestAnimationFrame(anim);          
        }
    }

    return this;
};
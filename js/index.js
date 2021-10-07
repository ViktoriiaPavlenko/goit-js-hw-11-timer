class CountdownTimer {
    constructor({ selector, targetDate}) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.refs = {
            daysRef: document.querySelector(`${this.selector} span[data-value="days"]`),
            hoursRef: document.querySelector(`${this.selector} span[data-value="hours"]`),
            minsRef: document.querySelector(`${this.selector} span[data-value="mins"]`),
            secsRef: document.querySelector(`${this.selector} span[data-value="secs"]`),
        };
    }

    start() {
        setInterval(() => {
            const deltaTime = this.targetDate - Date.now();
            const time = this.getTimeComponents(deltaTime);
            
            this.updateClockface(time)
        }, 1000);
    }

    pad(value) {
    return String(value).padStart(2, '0');
    }

    getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        
    return { days, hours, mins, secs };
    }

    updateClockface({ days, hours, mins, secs }) {
    this.refs.daysRef.textContent = `${days}`
    this.refs.hoursRef.textContent = `${hours}`
    this.refs.minsRef.textContent = `${mins}`
    this.refs.secsRef.textContent = `${secs}`
    }
}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jan 1, 2022'),
})
timer.start()
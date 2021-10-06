const refs = {
    daysRef: document.querySelector('[data-value="days"]'),
    hoursRef: document.querySelector('[data-value="hours"]'),
    minsRef: document.querySelector('[data-value="mins"]'),
    secsRef: document.querySelector('[data-value="secs"]'),
}

class CountdownTimer {
    constructor({ onTick, targetDate }) {
        this.onTick = onTick
        this.targetDate = targetDate
    }

    start() {
        setInterval(() => {
            const deltaTime = this.targetDate - Date.now();
            const time = this.getTimeComponents(deltaTime);
            
            this.onTick(time)
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

    return { days, hours, mins, secs }
    }
}

const timer = new CountdownTimer({
    onTick: updateClockface,
    selector: '#timer-1',
    targetDate: new Date('Jan 1, 2022'),
})
timer.start()

function updateClockface({ days, hours, mins, secs }) {
    refs.daysRef.textContent = `${days}`
    refs.hoursRef.textContent = `${hours}`
    refs.minsRef.textContent = `${mins}`
    refs.secsRef.textContent = `${secs}`
}
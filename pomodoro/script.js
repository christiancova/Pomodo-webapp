let startTitle = document.getElementById('start');
let breakTitle = document.getElementById('break');

let startTime = 25;
let breakTime = 5;
let seconds = "00"
let breakCount = 0;
let intervalId;

window.onload = () =>{

    if (localStorage.getItem("pomodoroTime")) {
        startTime = parseInt(localStorage.getItem("pomodoroTime"));
    }

    document.getElementById('minutes').innerHTML = startTime;
    document.getElementById('seconds').innerHTML = seconds;

    startTitle.classList.add('active');
}

// Open Modal
document.getElementById("settings-btn").addEventListener("click", function() {
    document.getElementById("settings-modal").style.display = "block";
});

// Close Modal
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("settings-modal").style.display = "none";
});

// Switch Tabs
const tabs = document.querySelectorAll(".tab-link");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", function() {
        tabs.forEach(t => t.classList.remove("active"));
        contents.forEach(c => c.classList.remove("active"));

        this.classList.add("active");
        document.getElementById(this.dataset.tab).classList.add("active");
    });
});

// Save Settings
document.getElementById("save-settings").addEventListener("click", function() {
    const selectedTheme = document.getElementById("theme-selector").value;
    localStorage.setItem("theme", selectedTheme);

    applyTheme(selectedTheme);

    const pomodoroTime = document.getElementById("pomodoro-time").value;
    localStorage.setItem("pomodoroTime", pomodoroTime);

    const enableSound = document.getElementById("enable-sound").checked;
    localStorage.setItem("enableSound", enableSound);

    alert("Settings saved!");
});

// Load Saved Settings
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("theme")) {
        document.getElementById("theme-selector").value = localStorage.getItem("theme");
        applyTheme(localStorage.getItem("theme"));
    }

    if (localStorage.getItem("pomodoroTime")) {
        document.getElementById("pomodoro-time").value = localStorage.getItem("pomodoroTime");
    }

    if (localStorage.getItem("enableSound")) {
        document.getElementById("enable-sound").checked = JSON.parse(localStorage.getItem("enableSound"));
    }
});

// Theme Switching
function applyTheme(theme) {
    document.body.className = theme;
}

document.getElementById("theme-selector").addEventListener("change", function() {
    applyTheme(this.value);
});

// When clicking "Start" manually
startTitle.addEventListener('click', function() {
    clearInterval(intervalId); // Stop any existing timers

    startTitle.classList.add('active');
    breakTitle.classList.remove('active');

    breakCount = 0;

    seconds = 0;
    if (localStorage.getItem("pomodoroTime")) {
        startTime = parseInt(localStorage.getItem("pomodoroTime"));
    }
    let minutes = startTime;

    function workTimer() {
        document.getElementById('minutes').innerHTML = minutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(intervalId);
                // After work ends, you might auto-switch to break if you want
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
    }

    intervalId = setInterval(workTimer, 1000);
});

// When clicking "Break" manually
breakTitle.addEventListener('click', function() {
    clearInterval(intervalId); // Stop any existing timers

    breakTitle.classList.add('active');
    startTitle.classList.remove('active');

    breakCount = 1;

    seconds = 0;
    let minutes = breakTime;

    function breakTimer() {
        document.getElementById('minutes').innerHTML = minutes;
        document.getElementById('seconds').innerHTML = seconds < 10 ? "0" + seconds : seconds;

        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(intervalId);
                // After break ends, you might auto-switch to work if you want
            }
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
    }

    intervalId = setInterval(breakTimer, 1000);
});



// start timer

function start() {
    clearInterval(intervalId); // Stop any existing timers
    //change button
    document.getElementById('play').style.display = "none";
    document.getElementById('reset').style.display = "block";

    if (localStorage.getItem("pomodoroTime")) {
        startTime = parseInt(localStorage.getItem("pomodoroTime"));
    }

    //change the time
    seconds = 59;

    let startMinutes = startTime -1;
    let breakMinutes = breakTime -1;



    //countdown
    let timerFunction = () => {
        //change display
        document.getElementById('minutes').innerHTML = startMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        //start
        seconds = seconds - 1

        if(seconds === 0) {
            seconds = 59
            startMinutes = startMinutes - 1;
            if (startMinutes === -1){
                if(breakCount % 2 === 0) {
                    //start break
                    startMinutes = breakMinutes;
                    breakCount++

                    //change the panel
                    startTitle.classList.remove('active');
                    breakTitle.classList.add('active');
                }else{
                    startMinutes = startTime;
                    breakCount++

                    breakTitle.classList.remove('active');
                    startTitle.classList.add('active');
                }

            }
        }

    }

    

    setInterval(timerFunction, 1000); //1000 = 1s


}

document.getElementById('reset').addEventListener('click', function () {
    clearInterval(intervalId);
    document.getElementById('play').style.display = "block";
    document.getElementById('reset').style.display = "none";

    // Reset the timer display
    if (localStorage.getItem("pomodoroTime")) {
        startTime = parseInt(localStorage.getItem("pomodoroTime"));
    }

    document.getElementById('minutes').innerHTML = startTime;
    document.getElementById('seconds').innerHTML = "00";

    // Reset titles
    startTitle.classList.add('active');
    breakTitle.classList.remove('active');
});

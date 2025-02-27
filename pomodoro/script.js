let startTitle = document.getElementById('start');
let breakTitle = document.getElementById('break');

let startTime = 25;
let breakTime = 5;

let seconds = "00"

window.onload = () =>{
    document.getElementById('minutes').innerHTML = startTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.add('active');
}

// start timer

function start() {
    //change button
    document.getElementById('play').style.display = "none";
    document.getElementById('reset').style.display = "block";

    //change the time
    seconds = 59;

    let startMinutes = startTime -1;
    let breakMinutes = breakTime -1;

    breakCount = 0;

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
                    workTitle.classList.remove('active');
                    breakTitle.classList.add('active');
                }else{
                    startMinutes = startTime;
                    breakCount++

                    breakTitle.classList.remove('active');
                    workTitle.classList.add('active');
                }

            }
        }

    }

    setInterval(timerFunction, 1000); //1000 = 1s


}

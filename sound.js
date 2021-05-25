function sequencer(){
    const clap = new Tone.Player("./sounds/clap.wav").toDestination();
    const snare = new Tone.Player("./sounds/snare.wav").toDestination();
    const tom = new Tone.Player("./sounds/tom.wav").toDestination();

    let checkbox = 0;

    Tone.Transport.scheduleRepeat(repeat, "16n")
    Tone.Transport.start(); 

    function repeat(){
        let step = checkbox % 16;
        let selectedSound1 = document.querySelector(`.top input:nth-child(${step + 1})`);
        let selectedSound2 = document.querySelector(`.middle  input:nth-child(${step + 1})`);
        let selectedSound3 = document.querySelector(`.bottom  input:nth-child(${step + 1})`);

        if (selectedSound1.checked){
            clap.start();  
        }
        if (selectedSound2.checked){
            snare.start();  
        }
        if (selectedSound3.checked){
            tom.start();  
        }
        checkbox ++
    }
}

sequencer();

document.getElementById("play").addEventListener("click", () => {
    Tone.start();
})

function piano(){
    // Tone sampler laver et instrument ud fra disse samples
    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();
    
    Tone.loaded().then(() => {

        const notes = document.querySelectorAll('.note')

        notes.forEach(note => {
            note.addEventListener("click", () => play(note, sampler))
        })
    })
}

piano();


function play(note, sampler){
    // console.log(note.id);
    sampler.triggerAttackRelease([note.id], 1);
}





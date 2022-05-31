const canvas1 = document.getElementById('canvas1');
const canvas1Ctx = canvas1.getContext('2d');
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;
const startButton = document.querySelector('.start');
const startPage = document.querySelector('.start-page');
const mainPage = document.querySelector('.main-page');
const particlesArray = [];
let hue = 0;

window.addEventListener('resize', function(){
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
});


const mouse = {
    x: undefined,
    y: undefined,
}

function colorPalette() {
    hue()
}

startButton.addEventListener('mouseover', function(){
    startButton.textContent = 'Comenzar';
    startButton.style.backgroundColor = 'white';
    startButton.style.color = 'black';
})

canvas1.addEventListener('mouseover', function(){
    startButton.textContent = 'Sinestesia';
    startButton.style.backgroundColor = 'black';
    startButton.style.color = 'white';
    startButton.style.border = '3px solid white';
})


canvas1.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++){
        particlesArray.push(new Particle());
    }
})

canvas1.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++){
        particlesArray.push(new Particle());
    }
})

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3  - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1
    }
    draw() {
        canvas1Ctx.fillStyle = this.color;
        canvas1Ctx.beginPath();
        canvas1Ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        canvas1Ctx.fill();
    }
}

function handleParticles(){
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <100){
                canvas1Ctx.beginPath();
                canvas1Ctx.strokeStyle = particlesArray[i].color;
                canvas1Ctx.lineWidth = 0.2;
                canvas1Ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                canvas1Ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                canvas1Ctx.stroke();
                canvas1Ctx.closePath();
            }
        }
        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            console.log(particlesArray.length);
            i--;
        }
    }
}

function animate(){
    canvas1Ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    //canvas1Ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    //canvas1Ctx.fillRect(0, 0, canvas1.width, canvas1.height);
    handleParticles();
    hue+= 2;
    requestAnimationFrame(animate);
}
animate();

startButton.addEventListener('click', function(){
    startPage.style.display = 'none';
    })



 
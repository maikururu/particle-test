/* Declaring variables*/
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray;

// getting the mouse position

let mouse = {
    x = null,
    y = null,
    radius: (canvas.height / 80) * (canvas.width / 80)
}

//Eventlistener

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

//creating the particle class

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // method to draw the individual particles
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#8c5523'; //can be changed
        ctx.fill();
    }
    /*checking the particle position, 
    checking the mouse position,
    moving the particle,
    drawing the particle
    */
    update() {
        //checking if the particle is still within the canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.directionY > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        /*
        checking the collision detection - mouse position 
        and particle position
        */
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        //moves the particles
        this.x += this.directionX;
        this.y += this.directionY;
        //draws the particles
        this.draw();

    }

}

//creating the particle array
function init() {
    particleArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8c5523';

        particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

//animation loop for the particles
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particleArray.lenght; i++) {
        particleArray[i].update();
    }
}

// checking if the particles are clouse enoiug to draw a line between them
function connect() {
    for (let a = 0; a < particleArray.lenght; a++) {
        let distance = ((particleArray[a].x - particleArray[b].x) * (particleArray[a]))
    }
}

init();
animate();
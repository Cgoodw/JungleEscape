"use strict";
const app = new PIXI.Application(500,340);
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;	

//images
PIXI.loader.add("wall", "Images/newTiles.json");
PIXI.loader.load(setup);

let tiles=[];


app.stage.interactive=true;
//scenes
let stage;
let startScene;
let gameScene;
let endScene;


//collision
let b;

//score
let hiscore;
let alive;
let time;
let timer;
let score;
let now;
let oldNow;
let dTime;
let deathReason;

//movement
let jump;
let Xvel;
let Yvel;


//sound
let jumpSound;
let die;
let music;

//images
let menuTexture = PIXI.Texture.fromImage("Images/bg-menu.png");
let menuBG = new PIXI.extras.TilingSprite(menuTexture, 512, 256);

let endTexture = PIXI.Texture.fromImage("Images/bg-end.png");
let endBG = new PIXI.extras.TilingSprite(endTexture, 512, 256);

let backgroundTexture = PIXI.Texture.fromImage("Images/plx-1.png");
let paraBG = new PIXI.extras.TilingSprite(backgroundTexture, 512, 256);

let playerTexture = PIXI.Texture.fromImage("Images/spr_ram.png");
let player = new PIXI.Sprite(playerTexture);

let spikesTexture = PIXI.Texture.fromImage("Images/spike.png");
let spikes = new PIXI.Sprite(spikesTexture);


stage=app.stage;


//scroll
let scrollSpeed = 3;

let MIN_SCROLL_SPEED = 5;
let MAX_SCROLL_SPEED = 15;
let SCROLL_ACCELERATION = 0.002;

//startup
function setup() {

    b=new Bump();
    //start Menu
    startScene=new PIXI.Container();
    startScene.addChild(menuBG);
    stage.addChild(startScene);
    
    //Game
    gameScene=new PIXI.Container();
    
    gameScene.addChild(paraBG);
    stage.addChild(gameScene);
    
    
    endScene= new PIXI.Container();
    endScene.addChild(endBG);
    
    
    createButtonsandText();
    
    
    jumpSound = new Howl({src:['Sounds/jump.wav']});
    die = new Howl({src:['Sounds/dead.mp3']});
    music = new Howl({src:['Sounds/loop.mp3']});
    
    music.play();
    music.loop=true;
    startScene.visible=true;
    gameScene.visible=false;  
    endScene.visible=false;
    app.ticker.add(update);
}

function createButtonsandText(){
    let buttonStyle=new PIXI.TextStyle({
        fill:0x55ff55,
        fontSize:48,
        fontFamily:'Futura'
    });
    
    let textStyle=new PIXI.TextStyle({
        fill: 0xaa522d,
        fontSize:48,
        fontFamily:'Futura'
    });
    
    let timerStyle=new PIXI.TextStyle({
        fill: 0xdddddd,
        fontSize:20,
        fontFamily:'Futura'
    });
    
    let title = new PIXI.Text("Jungle Escape");
    title.style=textStyle;
    title.x=120;
    title.y=30;
    startScene.addChild(title);
    
    time = new PIXI.Text("Score: ");
    time.style=timerStyle;
    time.x=20;
    time.y=10;
    gameScene.addChild(time);
    
    timer = new PIXI.Text("000");
    timer.style=timerStyle;
    timer.x=70;
    timer.y=10;
    gameScene.addChild(time);

    
    hiscore = new PIXI.Text("000");
    hiscore.style=timerStyle;
    hiscore.x=300;
    hiscore.y=100;
    endScene.addChild(hiscore);
    
    let over = new PIXI.Text("Your score:");
    over.style=timerStyle;
    over.x=200;
    over.y=100;
    endScene.addChild(over);
    
    
    deathReason = new PIXI.Text("You Died!");
    deathReason.style=timerStyle;
    deathReason.x=82;
    deathReason.y=70;
    endScene.addChild(deathReason);
    
    
    let startButton = new PIXI.Text("Start!");
    startButton.style=buttonStyle;
    startButton.x=190;
    startButton.y=120;
    startButton.interactive=true;
    startButton.buttonMode=true;
    startButton.on("pointerup",startGame);
    startButton.on("pointerover",e=>e.target.alpha = 0.7);
    startButton.on("pointerout",e=>e.currentTarget.alpha=1.0);
    startScene.addChild(startButton);
    
    
    let restartButton = new PIXI.Text("Try Again!");
    restartButton.style=buttonStyle;
    restartButton.x=150;
    restartButton.y=140;
    restartButton.interactive=true;
    restartButton.buttonMode=true;
    restartButton.on("pointerup",menu);
    restartButton.on("pointerover",e=>e.target.alpha = 0.7);
    restartButton.on("pointerout",e=>e.currentTarget.alpha=1.0);
    endScene.addChild(restartButton);
    
}

// Add the 'keydown' event listener to our document
document.addEventListener('keydown', onKeyDown);
function onKeyDown(key) {
    // W Key is 87
    // Up arrow is 87
    if (key.keyCode === 87 || key.keyCode === 38 ||key.keyCode===32 ) {
        // If the W key, Spacebar or the Up arrow is pressed, jump.
        
            if(!jump){
                Yvel=3;
                jump=true;
                jumpSound.play();
            }
        }

    // D Key is 68
    // Right arrow is 39
    if (key.keyCode === 68 || key.keyCode === 39) {
        Xvel=1.2;
    }
}



function menu(){
    startScene.visible=true;
    gameScene.visible=false;   
    endScene.visible=false;
}
let scroller; 
let spikesB;
let fresh;

function startGame(){
    scrollSpeed = 2;
    scroller = new Scroller(stage);
    //player
    player.x=410;
    player.y=100;
    Xvel=0;
    Yvel=0;
    startScene.visible=false;
    endScene.visible=false;
    b = new Bump(PIXI);
    gameScene.visible=true;  
    stage.addChild(time);
    stage.addChild(timer);
    score=0;
    stage.addChild(player);
    jump=false;
    alive=true;
    oldNow=Date.now();
    spikesB=false;
    
};  


function endGame(){
    die.play();
    player.y=100;
    startScene.visible=false;
    gameScene.visible=false;  
    scroller.endScreen();
    stage.removeChild(time);
    stage.removeChild(timer);
    stage.removeChild(player);
    stage.removeChild(spikes);
    endScene.visible=true;
    hiscore.text=Math.floor(score);
    stage.addChild(endScene);
    
}

app.ticker.add(()=>
{   
    //gravity
    if(Yvel>-1.6){
        Yvel-=.1;
    }
    Xvel-=.02;
    player.x+=Xvel;
    player.y-=Yvel;
});

function update() {
 
    if(gameScene.visible){
        
        //deltatime
        now=Date.now();
        dTime=now-oldNow;
        oldNow=now;
        
        score+=dTime/400;
        
        
        //keep the player in the bounds of the screen
        if(player.y>250){
           endGame();
            deathReason.text="You succumbed to the depths of the jungle.."
        }
        if(player.x<-15){
           endGame();
            deathReason.text="You were eaten alive by the ferocious tiger."
        }
        
        if(player.x>450){
           player.x=449;
        }
        
        if(player.y>215){
            //draw spikes
            spikes.x=player.x;
            spikes.y=245;
            stage.addChild(spikes);
            spikesB=true;
        }
        else{
            if(spikesB){
                stage.removeChild(spikes);
            }
        }
        
        
        let floor;
        floor=scroller.spriteList();
        
        
        
        for(let i=0;i<floor.length;i++){ 
            let collision = b.rectangleCollision(player, floor[i].retSprite());
            if(collision){
                jump=false;            
            }
        }
        
        
        //update timer
        timer.text=Math.floor(score);

        
        scrollSpeed+=.002;
        
        if(scrollSpeed>7){
            scrollSpeed=5;
        }
	   	scroller.moveViewportXBy(scrollSpeed);
    }
}

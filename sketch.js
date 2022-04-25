let currentScene = 1;
let blobs = [];
let blobCount = 0;
let blobAngle = 0;
let gameTime = 0;

function setup() {
  createCanvas(600,600);
  rectMode(CORNER);
  blob = new Character(); //주 캐릭터
  frameRate(30);
}

function draw() {
  if (currentScene === 1) { //캐릭터 만들기 씬
    background(250, 250, 200);

    noStroke();
    fill(0);
    
    translate(400,500); // 캐릭터 중앙 밑부분으로
    blobAngle = sin(frameCount/10)*0.3 ; // 캐릭터 몸 흔들기
    rotate(radians(blobAngle));
    rect(-100,-blob.height,200,blob.height,100,100,0,0); // 캐릭터 몸

    noStroke();
    fill(blob.clothRGB);
    rect(-110,140-blob.height,220,blob.height-140,10,10,0,0); //캐릭터 옷

    noStroke();
    fill(blob.neckRGB);
    rect(-115,150-blob.height,230,50,5,5,5,5); //캐릭터 목도리

    noStroke();
    fill(255);
    if (frameCount%blob.blinkTime < 10) { // 캐릭터 눈 깜박임
      blob.eyeSize = 5;
    } else {
      blob.eyeSize = 40;
    }
    ellipse(-50,90-blob.height,20,blob.eyeSize);
    ellipse(0,90-blob.height,20,blob.eyeSize); //캐릭터 눈

    translate(10,40-blob.height); // 모자 부분 시작
    rotate(radians(185));
    noStroke();
    fill(blob.hatRGB);   
    ellipse(0,0,250,30); //모자 윗부분
    arc(0,0,170,170,radians(360),radians(180),240); //모자 아랫부분
    
    if (blob.hatRGB[3] != 0) {
      noStroke();
      fill(blob.hatneckRGB);
      rect(-85,10,170,20,1,1,100,100);
      ellipse(0,10,170,15); // 모자 중간부분
    }

    noStroke(); //모자 핀
    fill(blob.pinRGB);
    translate(-50,70);
    beginShape();
    if (blob.hatPin == 1) { //별 모양

      vertex(-10, 10);
      vertex(0, 35);
      vertex(10, 10);
      vertex(35, 0);
      vertex(10, -8);
      vertex(0, -35);
      vertex(-10, -8);
      vertex(-35, 0);

    } else if (blob.hatPin == 2) { //다이아 모양

      vertex(0, 35);
      vertex(25, 0);
      vertex(0, -35);
      vertex(-25, 0);

    } else if (blob.hatPin == 3) { //하트 모양

      vertex(0, -20);
      bezierVertex(40, -10, 30, 40, 0, 20);
      vertex(0, -20);
      bezierVertex(-40, -10, -30, 40, 0, 20);
    }
    endShape();
    translate(50,-70);

    rotate(radians(175));
    translate(-10,-40+blob.height); // 모자 부분 끝

    rotate(radians(360-blobAngle));
    translate(-400,-500);

    noStroke();
    fill(200);
    rect(250,500,300,50); //캐릭터 창 바닥

    strokeWeight(4);
    stroke(250,200,100);
    noFill();
    rect(250,50,300,500); //캐릭터 창

    button1 = new myButton('Remove Hat');
    button1.draw(50,80,12,32,22);

    button2 = new myButton('Random Hat');
    button2.draw(50,160,12,32,22);

    button3 = new myButton('Remove Muffler');
    button3.draw(50,240,9,32,18);

    button4 = new myButton('Random Muffler');
    button4.draw(50,320,9,32,18);

    button5 = new myButton('Remove Cloth');
    button5.draw(50,400,11,32,20);

    button6 = new myButton('Random Cloth');
    button6.draw(50,480,11,32,20); //버튼들

  } else if (currentScene === 2){
 
    gameTime = sin(radians(frameCount%1200/1200*360))*110; // 낮 밤 순환
    background(170-gameTime,180-gameTime,225-abs(gameTime)*8/11); //하늘의 색
    noStroke();
    fill(250,180,60);
    circle(600,0,150); //배경의 태양


    noStroke();
    fill(200);
    rect(0,100,600,500); //바닥

    blob.size = blob.height/2-50; //키 -> 사이즈 변환

    blob.draw();
    blob.move();
    blob.secondCount += 1; //주 캐릭터 움직임

    noStroke();
    textSize(30);
    text(blobCount,50,60);

    for (let i of blobs) { //부 캐릭터 움직임
      i.draw();
      i.move();
      i.secondCount += 1; //부 캐릭터 마다의 시간
    }

  }
}

function mousePressed() {
  if (currentScene === 1) {
    if (50 < mouseX && mouseX < 200) {
      if (80 < mouseY && mouseY < 130) { // 버튼 기능
        blob.removeHat();
      } 
      else if (160 < mouseY && mouseY < 210) {
        blob.randomHat();
      } 
      else if (240 < mouseY && mouseY < 290) {
        blob.removeNeck();
      } 
      else if (320 < mouseY && mouseY < 370) {
        blob.randomNeck();
      } 
      else if (400 < mouseY && mouseY < 450) {
        blob.removeCloth();
      } 
      else if (480 < mouseY && mouseY < 530) {
        blob.randomCloth();
      }
    }
  } else if (currentScene == 2) { //부 캐릭터 랜덤 생성
    blobs[blobCount] = new Character();
    blobs[blobCount].randomHat();
    blobs[blobCount].randomCloth();
    blobs[blobCount].randomNeck();
    blobs[blobCount].size = floor(random(1,5))*25+50;
    blobs[blobCount].x = floor(random(100,500));
    blobs[blobCount].y = floor(random(100,500));
    blobs[blobCount].dx = random(0.1,1);
    blobs[blobCount].blinkTime = floor(random(120,300));
    blobs[blobCount].secondCount = floor((random(0,90)));
    blobs[blobCount].isSmile = floor(random(0,100));
    if ( frameCount % 2 == 0){
      blobs[blobCount].right = false;
      blobs[blobCount].dx = -random(0.1,1);
    }
    blobCount += 1;
    
  }
  
}

function keyPressed() {
  if (currentScene === 1){ //키 조작
    if (key == 'o') {
      currentScene = 2;
    }
    if (key == 'w' && blob.height < 390) {
      blob.height += 50;
    }
    if (key == 's'&& blob.height > 260) {
      blob.height -= 50;
    }
  } else if (currentScene === 2) {
    if (key == 'w' ) {
      blob.dy = -1.5;
    }
    if (key == 'd') {
      blob.dx = 2;
      if (blob.right == false){
        blob.right = true;
      }
    } 
    if (key == 's') {
      blob.dy = 1.5;
    }
    if (key == 'a') {
      blob.dx = -2;
      if (blob.right) {
        blob.right = false;
      }
    }
    if (key == 'x') {
      if (blob.right) {
        blob.right = false;
      } else {
        blob.right = true;
      }
      
    } 
  }
}

function keyReleased() {
  if (currentScene === 2) {
    if (key == 'w') {
      blob.dy = 0;
    }
    if (key == 'd') {
      blob.dx = 0;
    } 
    if (key == 's') {
      blob.dy = 0;
    }
    if (key == 'a') {

      blob.dx = -0;
    }
  }
}

class Character {
  constructor() {
    this.height = 350;
    this.clothRGB = [255,0,0,255];
    this.neckRGB = [0,255,0,255];
    this.angle = 0;
    this.hatRGB = [0,0,255,255];
    this.hatneckRGB = [0,255,0,255];
    this.hatPin = 0;
    this.pinRGB = [0,255,0];
    this.blinkTime = 180;
    this.eyeSize = 10;
    this.size = 200;
    this.x = 300;
    this.y = 300;
    this.right = true;
    this.dx = 0;
    this.dy = 0;
    this.secondCount = 0;
    this.isSmile = 0;
  }
  draw() {
    let blobH = this.height/400*this.size;
    translate(this.x-this.size/2,this.y-this.size/2);
    noStroke();
    fill(250, 250, 200,0);
    rect(0,0,this.size,this.size); //히트박스

    noStroke();
    fill(0);
    rect(this.size*0.2,this.size-blobH,this.size*0.6,blobH,this.size/2,this.size/2,0,0); //몸

    if (this.isSmile > 75) {
      stroke(255);
      strokeWeight(2);
      noFill();
      arc(this.size*0.35+this.size*0.3*this.right,this.size*1.2-blobH,this.size/16,this.eyeSize,radians(220),radians(320));
      arc(this.size*0.5,this.size*1.2-blobH,this.size/16,this.eyeSize,radians(220),radians(320));
    } else {

      noStroke();
      fill(255);
      if (this.secondCount % this.blinkTime < 10) {
        this.eyeSize = this.size/60;
      } else {
        this.eyeSize = this.size/8;
      }
      ellipse(this.size*0.35+this.size*0.3*this.right,this.size*1.2-blobH,this.size/16,this.eyeSize);
      ellipse(this.size*0.5,this.size*1.2-blobH,this.size/16,this.eyeSize); //눈
    }
    noStroke();
    fill(this.clothRGB);
    rect(this.size*0.15,this.size*1.35-blobH,this.size*0.7,-this.size*0.35+blobH,this.size/20,this.size/20,0,0); //캐릭터 옷

    noStroke();
    fill(this.neckRGB);
    rect(this.size*0.13,this.size*1.4-blobH,this.size*0.74,this.size*0.15,this.size/30,this.size/30,this.size/30,this.size/30); //캐릭터 목도리

    translate(this.size*0.52-this.size*0.04*this.right,this.size*1.1-blobH); // 모자 부분 시작
    rotate(radians(185-10*this.right));
    noStroke();
    fill(this.hatRGB);   
    ellipse(0,0,this.size/1.5,this.size/20); //모자 윗부분
    arc(0,0,this.size/2.4,this.size/3.2,radians(360),radians(180),240); //모자 아랫부분
    
    if (this.hatRGB[3] != 0) {
      noStroke();
      fill(this.hatneckRGB);
      rect(-this.size/4.6,this.size/250,this.size/2.3,this.size/20,500,500,100,100);
      ellipse(0,this.size/10); // 모자 중간부분
    }

    noStroke();
    fill(this.pinRGB);
    translate(-this.size/10+this.size/5*this.right,this.size/8);
    let unit = this.size/400; //단위 배율
    beginShape(); //모자 핀
    if (this.hatPin == 1) { //별 모양

      vertex(-10*unit, 10*unit);
      vertex(0*unit, 35*unit);
      vertex(10*unit, 10*unit);
      vertex(35*unit, 0*unit);
      vertex(10*unit, -8*unit);
      vertex(0*unit, -35*unit);
      vertex(-10*unit, -8*unit);
      vertex(-35*unit, 0*unit);

    } else if (this.hatPin == 2) { //다이아 모양

      vertex(0*unit, 35*unit);
      vertex(25*unit, 0*unit);
      vertex(0*unit, -35*unit);
      vertex(-25*unit, 0*unit);

    } else if (this.hatPin == 3) { //하트 모양

      vertex(0*unit, -20*unit);
      bezierVertex(40*unit, -10*unit, 30*unit, 40*unit, 0*unit, 20*unit);
      vertex(0*unit, -20*unit);
      bezierVertex(-40*unit, -10*unit, -30*unit, 40*unit, 0*unit, 20*unit);
    }
    endShape();
    translate(this.size/10-this.size/5*this.right,-this.size/8);

    rotate(radians(175+10*this.right));
    translate(-this.size*0.52+this.size*0.04*this.right,-this.size*1.1+blobH); // 모자 부분 끝

    translate(-this.x+this.size/2,-this.y+this.size/2);
  }
  move() { //이동
    this.x += this.dx;
    this.y += this.dy;
    if (this == blob){ //주 캐릭터 이동 구역 제한
      this.x = constrain(this.x,20,580);
      this.y = constrain(this.y,120,580);
    }

  }

  removeHat() {
    this.hatRGB[3] = 0;
  }
  randomHat() {
    this.hatRGB[0] = int(random(255)); 
    this.hatRGB[1] = int(random(255));
    this.hatRGB[2] = int(random(255));
    this.hatRGB[3] = 255;
    this.hatneckRGB[0] = int(random(255)); 
    this.hatneckRGB[1] = int(random(255));
    this.hatneckRGB[2] = int(random(255));
    this.hatneckRGB[3] = floor(random(2))*255;
    this.hatPin = floor(random(4));
    this.pinRGB[0] = int(random(255));
    this.pinRGB[1] = int(random(255));
    this.pinRGB[2] = int(random(255));
  }
  removeNeck() {
    this.neckRGB[3] = 0;
  }
  randomNeck() {
    this.neckRGB[0] = int(random(255)); 
    this.neckRGB[1] = int(random(255));
    this.neckRGB[2] = int(random(255));
    this.neckRGB[3] = 255;
  }
  removeCloth() {
    this.clothRGB[3] = 0;
  }
  randomCloth() {
    this.clothRGB[0] = int(random(255)); 
    this.clothRGB[1] = int(random(255));
    this.clothRGB[2] = int(random(255));
    this.clothRGB[3] = 255;
  }
}

class myButton {
  constructor(text) { //버튼 텍스트
    this.text = text;
  }
  draw(x,y,tx,ty,tsize) { //버튼 그리기
    noStroke();
    fill(250,200,100);
    rect(x,y,150,50);

    noStroke();
    fill(255);
    textSize(tsize);
    text(this.text,x+tx,y+ty);
  }
}


window.addEventListener('DOMContentLoaded', (event) =>{

    let keysPressed = {};

    let bombtimer = 0
    let turretlevel = 0
    let spawndrop = 0
    let bomblifeline = 0
    let bombs = 0
    let piercing = 1
    let maxplayerspeed = .7
    let maxbulletspeed = 1.7
    let holdclick = {}
    let store = 1
    var timerrunner
    let blobs = []
    let clearblobs = []
    let holdblob = []
    var update;
    let dead = 0

    let score = 0
    let money = 0
// something happened
let secondpass = 0
let firstpass = 0

let immortalizer = document.getElementById('mort')
let scorecard = document.getElementById('score')
let moneycard = document.getElementById('money')

scorecard.innerText = "Collected: 0"
moneycard.innerText = "Money: 0"
    let immortal = 0

    immortalizer.onclick = fight

    function fight(){
        immortal = 1
    }
    let bullets = []
    let shotz = []
    // let bullets.length = 0
    let shotcount = 90000


    document.onkeydown = function(event) {
        switch (event.keyCode) {
                 case 32:
                    if(event.keyCode == 32 && event.target == document.body) {
                        event.preventDefault();
                      }
                 bullets = []
                 bullets.length = 0
                     shotcount = 9
                    break;
        }
    };

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
 });
 
 document.addEventListener('keyup', (event) => {
     delete keysPressed[event.key];
  });


    let tutorial_canvas = document.getElementById("tutorial");
    tutorial_canvas.x = 0
    tutorial_canvas.y = 0


    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    // tutorial_canvas_context.scale(.1, .1);
    tutorial_canvas.style.background = "#000000"


    class Blob{
        constructor(bits){
            this.bits = bits
         //   this.id = bits.length
        }
        draw(){
            for(let r = 0; r <this.bits.length; r++ ){
                this.bits[r].draw()
            }

        }
        move(){
            let xmomaverage = 0
            let ymomaverage = 0
            for(let r = 0; r <this.bits.length; r++ ){
                xmomaverage += this.bits[r].xmom 
            }
            xmomaverage = xmomaverage/this.bits.length

            for(let r = 0; r <this.bits.length; r++ ){
                ymomaverage += this.bits[r].ymom 
            }
            ymomaverage = ymomaverage/this.bits.length

            
            for(let r = 0; r <this.bits.length; r++ ){
                this.bits[r].y += ymomaverage 
            }
            
            for(let r = 0; r <this.bits.length; r++ ){
                this.bits[r].x += xmomaverage 
            }


            for(let r = 0; r <this.bits.length; r++ ){


            if(this.bits[r].x+this.bits[r].width > tutorial_canvas.width){

                if( this.bits[r].xmom > 0){
                    this.bits[r].xmom *= -1
                }

            }
            if(this.bits[r].y+this.bits[r].height > tutorial_canvas.height){

                if( this.bits[r].ymom > 0){
                    this.bits[r].ymom *= -1
                }

            }
            if(this.bits[r].x < 0){

                if( this.bits[r].xmom < 0){
                    this.bits[r].xmom *= -1
                }

            }
            if(this.bits[r].y+this.bits[r].height < 0){

                if( this.bits[r].ymom < 0){
                    this.bits[r].ymom *= -1
                }
        
            }
            }


        }
        disintegrate(){

            
        }


    }

    class Clearblob{
        constructor(bits){
            this.bits = bits
         //   this.id = bits.length
        }
        draw(){
            for(let r = 0; r <this.bits.length; r++ ){

                let weirdcircle = new Circle(this.bits[r].x,this.bits[r].y, 2, "#FFFFFF")



                weirdcircle.draw()
            }

        }
        move(){




            let xmomaverage = 0
            let ymomaverage = 0
            for(let r = 0; r <this.bits.length; r++ ){
                xmomaverage += this.bits[r].xmom 
            }
            xmomaverage = xmomaverage/this.bits.length

            for(let r = 0; r <this.bits.length; r++ ){
                ymomaverage += this.bits[r].ymom 
            }
            ymomaverage = ymomaverage/this.bits.length

            
            for(let r = 0; r <this.bits.length; r++ ){
                this.bits[r].y += ymomaverage 


            this.bits[r].y += (circ.y-this.bits[r].y)/50
            }
            
            for(let r = 0; r <this.bits.length; r++ ){
                this.bits[r].x += xmomaverage 
                this.bits[r].x += (circ.x-this.bits[r].x)/50
            }


            for(let r = 0; r <this.bits.length; r++ ){


            if(this.bits[r].x+this.bits[r].width > tutorial_canvas.width){

                if( this.bits[r].xmom > 0){
                    this.bits[r].xmom *= -1
                }

            }
            if(this.bits[r].y+this.bits[r].height > tutorial_canvas.height){

                if( this.bits[r].ymom > 0){
                    this.bits[r].ymom *= -1
                }

            }
            if(this.bits[r].x < 0){

                if( this.bits[r].xmom < 0){
                    this.bits[r].xmom *= -1
                }

            }
            if(this.bits[r].y+this.bits[r].height < 0){

                if( this.bits[r].ymom < 0){
                    this.bits[r].ymom *= -1
                }
        
            }
            }




            

        }
        disintegrate(){

            
        }


    }

    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color

            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
            tutorial_canvas_context.strokeStyle = "black"
            if(this.color == "#00000000"){
                tutorial_canvas_context.strokeStyle = "white"
            }
            tutorial_canvas_context.strokeRect(this.x, this.y, this.width, this.height)
        }
        move(){

            this.x+=this.xmom
            this.y+=this.ymom

            // if(this.x+this.width > tutorial_canvas.width){

            //     this.xmom *= -1

            // }
            // if(this.y+this.height > tutorial_canvas.height){

            //     this.ymom *= -1

            // }
            // if(this.x < 0){

            //     this.xmom *= -1

            // }
            // if(this.y+this.height < 0){

            //     this.ymom *= -1
        
            // }


        }
    }

    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 

          

            if(!bullets.includes(this)){


            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius*3, 0, (Math.PI*2), true)
            tutorial_canvas_context.stroke(); 

            }
        }
        move(){

            // this.xmom*=.999
            // this.ymom*=.999 //friction

            this.x += this.xmom
            this.y += this.ymom


            if(this === circ){

                if(this.x+this.radius > tutorial_canvas.width){

                    if(this.xmom > 0){
                    this.xmom *= -1
                    }
    
                }
                if(this.y+this.radius > tutorial_canvas.height){
                    if(this.ymom > 0){
                    this.ymom *= -1
                    }
    
                }
                if(this.x-this.radius < 0){
                    if(this.xmom < 0){
                        this.xmom *= -1
                    }
    
                }
                if(this.y-this.radius < 0){
    
                    if(this.ymom < 0){
                        this.ymom *= -1
                    }
            
                }

            }
     

        }


    }

    // let x = 0
    // let y = 0

    let circ = new Circle(50, 50, 5, "#00FF00")    //new Circle(tutorial_canvas.width/2, tutorial_canvas.height/2, 10, "#00FF00")
    // let rect = new Rectangle ( 200, 200, 50, 80, "#00FFFF")
    holdclick = new Circle(50, 50, 5, "#000000")

    let bitsostuff = []
    let bitsostuff1 = []
    let bitsostuff2 = []

    let allsquares = []

    let xz = 0
    let yz = 0

    for(let r = 0; r <144; r++ ){
    let box = new Rectangle ( 500+xz, 500+yz, 13, 13, "#FFFF00")

    box.xmom = (Math.random()-.5)/4.20
    box.ymom = (Math.random()-.5)/4.20
    // if(r == 78){

    //     box.color = "#0000FF"


    //     box.xmom = 0
    //     box.ymom = 0
    // }
    allsquares.push(box)
        bitsostuff.push(box)
        xz += 12
        if(xz > 132){
            yz += 12
            xz = 0
        }
    }
    
xz = 0
yz = 0
    for(let r = 0; r <100; r++ ){
        let box = new Rectangle ( 200+xz, 200+yz, 11, 11, "#FF0000")
    
        box.xmom = (Math.random()-.5)/4.20
        box.ymom = (Math.random()-.5)/4.20
        // if(r == 55){

        //     box.color = "#0000FF"
    
        //     box.xmom = 0
        //     box.ymom = 0
        // }
        allsquares.push(box)
            bitsostuff1.push(box)
            xz += 10
            if(xz > 90){
                yz += 10
                xz = 0
            }
        }
        xz = 0
        yz = 0

        for(let r = 0; r <225; r++ ){
            let box = new Rectangle ( 300+xz, 300+yz, 10, 10, "#00FFFF")
        
            box.xmom = (Math.random()-.5)/4.20
            box.ymom = (Math.random()-.5)/4.20
            // if(r == 127){

            //     box.color = "#0000FF"
        
            //     box.xmom = 0
            //     box.ymom = 0
            // }
            allsquares.push(box)
                bitsostuff2.push(box)
                xz += 9
                if(xz > 126){
                    yz += 9
                    xz = 0
                }
            }
            
    // let rect = new Rectangle ( 200, 200, 50, 80, "#00FFFF")s
    // rect.ymom = 1



    let checktocheck  = 0
    let blob = new Blob(bitsostuff)
    let blob1 = new Blob(bitsostuff1)
    let blob2 = new Blob(bitsostuff2)

    blobs.push(blob)
    blobs.push(blob1)
    blobs.push(blob2)














    // for(let q = 0; q< 2; q++){

    //     let squarebase = (Math.floor(Math.random()*10)+4)
    //     let squaredbased = squarebase *squarebase
    //     let width = (Math.floor(Math.random()*10)+3)
    
    //     let startingx = (Math.floor(Math.random()*tutorial_canvas.width))
    //     let startingy =  (Math.floor(Math.random()*tutorial_canvas.height))
    


    //     let colorbox = getRandomLightColor()
    
    //     let blobmaker = []
    
    //     xz = 0
    //     yz = 0
    
    //     for(let r = 0; r <squaredbased; r++ ){
    //         let box = new Rectangle ( (startingx)+xz, startingy+yz, width+1, width+1, colorbox)
        
    //         box.xmom = (Math.random()-.5)/4.20
    //         box.ymom =  (Math.random()-.5)/4.20
    //         allsquares.push(box)
    //         blobmaker.push(box)
    //             xz += width
    //             if(xz > ((width*squarebase)-1)){
    //                 yz += width
    //                 xz = 0
    //             }
    //         }
    // let newblob = new Blob(blobmaker)
    
    // blobs.push(newblob)
    

    // }



    function generategrid(){
    for(let q = 0; q< 4; q++){
        let startingx 
        let startingy
        let squarebase = (Math.floor(Math.random()*10)+6)
        let squaredbased = squarebase *squarebase
        let width = (Math.floor(Math.random()*10)+7)
        if(Math.random() > .5){
           startingx = 0 -((width*squaredbased)*(1))
        }else{
            startingx = tutorial_canvas.width + ((width*squarebase)*(Math.random()))
        }
        if(Math.random() > .5){
            startingy = 0 -((width*squarebase)*(1))
        }else{
            startingy = tutorial_canvas.height + ((width*squarebase)*(Math.random()))
        }
        let colorbox = getRandomLightColor()
        let blobmaker = []
        xz = 0
        yz = 0
        for(let r = 0; r <squaredbased; r++ ){
            let box = new Rectangle ( (startingx)+xz, startingy+yz, width+1, width+1, colorbox)
        
            box.xmom = (Math.random()-.5)/4.20
            box.ymom =  (Math.random()-.5)/4.20
            allsquares.push(box)
            blobmaker.push(box)
                xz += width
                if(xz > ((width*squarebase)-1)){
                    yz += width
                    xz = 0
                }
            }
    let newblob = new Blob(blobmaker)
    blobs.push(newblob)
    }
    }








     immortal = 0


     let counter = 0

    //  window.setInterval(function(){ 
    // //  for(let b = 0; b< blobs.length; b++){
    // //     connected(blobs[b], blobs[b].bits[(Math.floor(Math.random()*blobs[b].bits.length))])
    // //     }
    // }, 1000) 

    let recthole = new Rectangle(0,0,tutorial_canvas.width, tutorial_canvas.height, "#FFFFFF")


    function runthis(){
         timerrunner = window.setInterval(function(){ 


            if(store == 1){
                blobs.sort((a, b) => (a.bits[0].color > b.bits[0].color) ? 1 : (a.bits[0].color === b.bits[0].color) ? ((a.bits.length > b.bits.length) ? 1 : -1) : -1 )

            let singleblob = 1
            // blobs = blobs.filter(blob => !(blob.bits.length == 0))
            // blobs = blobs.unique()
    
            tutorial_canvas_context.clearRect(0,0,tutorial_canvas.width*10,tutorial_canvas.height*10)
    
    
            circ.move()
            // rect.draw()
    
            // rect.move()

            let indexer = []
    
            for(let b = 0; b< blobs.length; b++){
    
                if(blobs[b].bits.length == 1){
                    blobs[b].bits[0].color = "#00000000"
                }

                if(blobs[b].bits.length == 1){
                    let blockholder = [...blobs[b].bits]
                    ////console.log(blockholder, "block")
                    let clearblobhold = new Clearblob(blockholder)
                    ////console.log(clearblobhold, "clear")
                    clearblobs.push(clearblobhold)
                    allsquares.splice(allsquares.indexOf(blobs[b].bits[0]), 1)
                   indexer.push(blobs[b])
                   blobs[b].bits.splice(0, 1)
                }

            }

        blobs = blobs.filter(blobx => !(blobx.bits.length == 0))
        // blobs = blobs.unique()

            // for(let b = 0; b < blobs.length; b++){

            //     if(blobs[b].bits.length < 1){

            //         blobs.splice(blobs.indexOf(blobs[b]))
            //     }
            //     // if(indexer.length > 0){
            //     //     ////console.log("prefilter", blobs)
            //     //     blobs = blobs.filter(blobguy => !(indexer.includes(blobguy)))
            //     //      ////console.log("postfilter", blobs)
            //     // }
            // }


                for(let b = 0; b< blobs.length; b++){
        
                    if(blobs[b].bits.length == 1){
                        blobs[b].bits[0].color = "#00000000"
                    }
    
                blobs[b].draw()
    
                let movefloor = Math.floor(Math.sqrt(blobs[b].bits.length))+1
                for(let p = 0; p < movefloor; p++){
                    blobs[b].move()
                }
                
                if(b > blobs.length){
                    ////console.log("snafu")


                }
                ////console.log(blobs[b])
             for (let k = 0; k < blobs[b].bits.length; k++){
        
            
                for (let w = 0; w < bullets.length; w++){

                    // if(typeof blobs[b] === 'undefined'){
                    //     blobs[b] = new Blob([])
                    // }
        
                    // //////console.log("blobs", blobs, blobs[b], "blobs[b]" )
                    if(blobs[b].bits.length > 1){
    
                        if(squarecircle(blobs[b].bits[k], bullets[w])){
                            ////console.log(blobs)
            
                            bullets[w].health -= 1
                            //console.log(bullets)
                            // if(blobs[b].bits[k].color !== "#0000FF"){
                                if(Math.random() > (.9-spawndrop)){
    
                                    let blockhold = (blobs[b].bits.splice(k, 1))
                                    allsquares.splice(allsquares.indexOf(blobs[b].bits[k]),1)
                                    blockhold[0].color = "#00000000"
                                    blockhold[0].width = blockhold[0].width*1.2
                                    blockhold[0].height = blockhold[0].height*1.2
                                    singleblob  = new Clearblob(blockhold)
                                    //
                                    clearblobs.push(singleblob)
                                    //////console.log(clearblobs)
    
                                }else{
                                    allsquares.splice(allsquares.indexOf(blobs[b].bits[k]),1)
                                    blobs[b].bits.splice(k, 1)
    
                                }
        
                            // }
                            if(immortal == 0){
        
                                if(bullets[w].health <= 0){

                                    bullets.splice(w, 1)

                                }
        
                            }else{
    
                            
    
                            }
                            // k+=1
    
                            //////console.log(holdblob, "holdblob", blobs[b], "blobs[b]", blobs, "blobs")
            
                            if((holdblob !== blobs[b]) ){ //&& (holdblob.length !== 0) )
                                // ////////console.log(holdblob)
                                if(checktocheck == 1){
                                connected(holdblob, holdblob.bits[(Math.floor(Math.random()*holdblob.bits.length))])
                                // connected(holdblob, holdblob.bits[(Math.floor(Math.random()*holdblob.bits.length))])
                                }
                            }
        holdblob = blobs[b]
        // clearTimeout(update);
        update = setTimeout(splitter, 100);
        counter = 60
        
        checktocheck = 1
        
                            // connected(blobs[b], blobs[b].bits[(Math.floor(Math.random()*blobs[b].bits.length))])
                    
            
                            ////console.log(blobs)
                        }
                
    
                    }
                }
        
            }
        
                
            }
        // if(singleblob !== 1){
    
        // }
            circ.draw()
            players(circ)
    
            // circ.ymom  += .01
            circ.move()
    
         //   tutorial_canvas_context.clearRect(0,0,tutorial_canvas.width*10,tutorial_canvas.height*10)
    
        
         for (let k = 0; k < bullets.length; k++){
    
        
            bullets[k].move()
            bullets[k].draw(tutorial_canvas_context)
    
                 }
    
    
    // let newmaker = 0
    
    //         for(let d = 0; d<allsquares.length; d++){
    
    //             if(allsquares[d].color == "#0000FF"){
    
    //                 if(squarecircle(allsquares[d], circ) == true){
    
    
    //                     for(let q= 0; q<blobs.length; q++){
    //                         let holdbool = true
    //                         for(let v= 0; v<blobs[q].bits.length; v++){
    
    //                             if(squaresquare(allsquares[d], blobs[q].bits[v]) == true){
    
    //                                 if(allsquares[d] !== blobs[q].bits[v]){
    //                                     holdbool = false
                                        
    //                                 }
    
    
    //                             }
                                
    
        
    //                         }
    //                         if(holdbool == true){
    //                             blobs[q].bits = [...blobs[q].bits.filter(block => (block !== allsquares[d]))]
    //                             blobs = [...blobs.filter(blobhold => (blobhold.bits.length > 0))]
    //                             allsquares.splice(d, 1)
    
    //                             newmaker = 1
    //                         }else{
    
    //                             newmaker = 0
    
    //                         }
    //                     }
        
    //                 }
        
    
    //             }
    //         }
                 
    
    
    //         if(newmaker == 1){
    //             let boxocrap = []
    //             xz = 0
    //             yz = 0
        
    //             let randcolor  = getRandomLightColor()
    //             for(let r = 0; r <225; r++ ){
    //                 let box = new Rectangle ( 300+xz, 300+yz, 16, 16, randcolor)
                
    //                 box.xmom = (Math.random()-.5)
    //                 box.ymom = (Math.random()-.5)
    //                 if(r == 127){
        
    //                     box.color = "#0000FF"
                
    //                     box.xmom = 0
    //                     box.ymom = 0
    //                 }
    //                 allsquares.push(box)
    //                 boxocrap.push(box)
    //                     xz += 15
    //                     if(xz > 210){
    //                         yz += 15
    //                         xz = 0
    //                     }
    //                 }
                    
        
        
        
    //         let blobx = new Blob(boxocrap)
        
    //         blobs.push(blobx)
        
        
        
    // newmaker = 0    
    
    //         }
    
    
    for(let o = 0; o<bullets.length; o++){
        if(squarecircle(recthole, bullets[o]) == false){
            bullets.splice(o, 1)
        }
    }
    
    
    
    
    
    //         newmaker = 0    
    
                 counter++
    
    
                 for(let s = 0; s<clearblobs.length; s++){
                    if((intersects(circ, clearblobs[s].bits[0]) == true)){
                        //  for(let d = 0; d<allsquares.length; d++){
                            //  if(clearblobs[d].bits.length <= 1){
                                // if(clearblobs[d].bits.includes(allsquares[s]) == true){
                                    clearblobs.splice(s,1)
                                    // allsquares.splice(s,1)
                                    // //////console.log(circ)
                                    // circ.radius+=.1
                                    score+=1
                                    money+=1
                                // }
                            //  }else{
    
                            //  }
                         }
                    }
                 for(let s = 0; s<allsquares.length; s++){
                    if((squarecircle(allsquares[s], circ) == true)){
                        if(bomblifeline == 0){
                            death()
                        }else{
                            console.log("boom")
                            bomb()
                        }
                         }
                    }
                // }
    
    
    
    
                allsquares = []
    
                for(let w = 0; w<blobs.length; w++){
    
                    for(let q = 0; q<blobs[w].bits.length; q++){
    
                        allsquares.push(blobs[w].bits[q])
    
                    }
    
                }
    


                for(let r = 0; r < clearblobs.length; r++){
                    clearblobs[r].draw()
                    clearblobs[r].move()


                }
    
                scorecard.innerText = `Collected: ${score}`
                moneycard.innerText = `Money: ${money}`
    
                if(allsquares.length < 256){
    
                    clearInterval(timerrunner)
                    generategrid()
                    runthis()
    
                }else{
    
                    // //////console.log(allsquares)
                    // //////console.log(blobs)
                }

                for(let t = 0; t<blobs.length; t++){
                    if(blobs[t].bits.length <= 16){
                        connected(blobs[t], blobs[t].bits[(Math.floor(Math.random()*blobs[t].bits.length))])
                    }
                }

                if(dead == 1){
                    tutorial_canvas_context.fillStyle = "White";
                    tutorial_canvas_context.font = "40px Arial";
                    tutorial_canvas_context.fillText(`Crash! Score: ${score}`, 120, 100);
                }

                if(Math.random() < turretlevel){
                    shootturret(circ)
                }

            }else{
                if(dead == 0){

                    storemethod()
                }
            }

            bombtimer++
        }, 10)
    
    

    }

    let storebackground = new Rectangle(0,0,tutorial_canvas.width,tutorial_canvas.height, "#FFAAFF")

    let storeboxes = []
    let strbtn1 =  new Rectangle(100,80, 100, 200, "#FF0000")
    let strbtn2 =  new Rectangle(100,220, 100, 200, "#FF0000")
    let strbtn3 =  new Rectangle(100,370, 100, 200, "#FF0000")
    let strbtn1x =  new Rectangle(350,80, 100, 200, "#FF0000")
    let strbtn2x =  new Rectangle(350,220, 100, 200, "#FF0000")
    let strbtn3x =  new Rectangle(350,370, 100, 200, "#FF0000")
    let strbtnx =  new Rectangle(100,500, 100, 450, "#FF0000")


    storeboxes.push(strbtn1)
    storeboxes.push(strbtn2)
    storeboxes.push(strbtn3)
    storeboxes.push(strbtn1x)
    storeboxes.push(strbtn2x)
    storeboxes.push(strbtn3x)
    storeboxes.push(strbtnx)


    function storemethod(){

        storebackground.draw()






        for(let k = 0; k<storeboxes.length; k++){
            storeboxes[k].draw()
            // holdclick.draw()

            if(squarecircle(storeboxes[k], holdclick)){

                holdclick.x = -100
                holdclick.y = -100

                if(k == 0){
                    if(maxbulletspeed < 3.75){

                        if(money >= 10){

                            storeboxes[k].color = "blue"
                            money -= 10  
                            maxbulletspeed += .1  

                        }
                    }else{

                        storeboxes[k].color = "black"

                    }

                }else if(k == 1){
                    if(maxplayerspeed < 2.14159265){

                      if(money >= 10){

                        storeboxes[k].color = "brown"
                        money -= 10  
                            maxplayerspeed += .1  

                        }

                    }else{

                        storeboxes[k].color = "black"

                    }

                }else if(k == 2){
                    if(piercing < 25){

                        if(money >= 10){

                            storeboxes[k].color = "green"
                            money -= 10
                            piercing += 1

                        }

                    }else{

                        storeboxes[k].color = "black"

                    }

                }else if(k == 3){
                    if(bombs < 100){

                        if(money >= 10){

                            storeboxes[k].color = "purple"
                            money -= 10
                            bombs += 1

                        }

                    }else{

                        storeboxes[k].color = "black"

                    }
                }else if(k == 4){
                    if(spawndrop < .9){

                        if(money >= 10){

                        storeboxes[k].color = "gray"
                            money -= 10
                            spawndrop += .05

                        }

                    }else{

                        storeboxes[k].color = "black"

                    }
                }else if(k == 5){
                    if(turretlevel < .009){

                        if(money >= 10){

                        storeboxes[k].color = "#FF9999"
                            money -= 10
                            turretlevel += .0009

                        }

                    }else{

                        storeboxes[k].color = "black"

                    }
                }else if(k == 6){

                    if(bomblifeline !== 1){

                        if(money >= 999){

                            money -= 999
                            storeboxes[k].color = "black"
                            bomblifeline = 1

                        }

                    }else{

                        storeboxes[k].color = "black"

                    }
                }
                // }else if(k == 4){
                //     if(bombs < 10){

                //         storeboxes[k].color = "#FF00FF"
                //         bombs += 1

                //     }else{

                //         storeboxes[k].color = "black"

                //     }

                // }



            }


        }




        tutorial_canvas_context.fillStyle = "Bllack";
        tutorial_canvas_context.font = "30px Arial";
        tutorial_canvas_context.fillText(`10 points for each, til it is sold out`, 100, 50);


        tutorial_canvas_context.fillStyle = "White";
        tutorial_canvas_context.font = "30px Arial";
        tutorial_canvas_context.fillText(`bullet speed`, 120, 140);

        tutorial_canvas_context.fillStyle = "White";
        tutorial_canvas_context.font = "30px Arial";
        tutorial_canvas_context.fillText(`ship speed`, 120, 290);

        tutorial_canvas_context.fillStyle = "White";
        tutorial_canvas_context.font = "30px Arial";
        tutorial_canvas_context.fillText(`pierce depth`, 120, 440);

        tutorial_canvas_context.fillStyle = "White";
        tutorial_canvas_context.font = "30px Arial";
        tutorial_canvas_context.fillText(`999 points for explosive crash`, 120, 560);


        tutorial_canvas_context.fillStyle = "White";
        tutorial_canvas_context.font = "30px Arial";
        tutorial_canvas_context.fillText(`Bomb (B key)`, 360, 140);



        tutorial_canvas_context.fillStyle = "White";
        tutorial_canvas_context.font = "30px Arial";
        tutorial_canvas_context.fillText(`point spawn +`, 360, 290);


        tutorial_canvas_context.fillStyle = "White";
        tutorial_canvas_context.font = "30px Arial";
        tutorial_canvas_context.fillText(`auto turret`, 360, 440);


        moneycard.innerText = `Money: ${money}`
    }
    

    timerrunner = window.setInterval(function(){ 


        if(store == 1){

            blobs.sort((a, b) => (a.bits[0].color > b.bits[0].color) ? 1 : (a.bits[0].color === b.bits[0].color) ? ((a.bits.length > b.bits.length) ? 1 : -1) : -1 )

        let singleblob = 1
        // blobs = blobs.filter(blob => !(blob.bits.length == 0))
        // blobs = blobs.unique()

        tutorial_canvas_context.clearRect(0,0,tutorial_canvas.width*10,tutorial_canvas.height*10)


        circ.move()
        // rect.draw()

        // rect.move()

        let indexer = []

        for(let b = 0; b< blobs.length; b++){

            if(blobs[b].bits.length == 1){
                blobs[b].bits[0].color = "#00000000"
            }

            if(blobs[b].bits.length == 1){
                let blockholder = [...blobs[b].bits]
                ////console.log(blockholder, "block")
                let clearblobhold = new Clearblob(blockholder)
                ////console.log(clearblobhold, "clear")
                clearblobs.push(clearblobhold)
                allsquares.splice(allsquares.indexOf(blobs[b].bits[0]), 1)
               indexer.push(blobs[b])
               blobs[b].bits.splice(0, 1)
            }

        }

    blobs = blobs.filter(blobx => !(blobx.bits.length == 0))
    // blobs = blobs.unique()

        // for(let b = 0; b < blobs.length; b++){

        //     if(blobs[b].bits.length < 1){

        //         blobs.splice(blobs.indexOf(blobs[b]))
        //     }
        //     // if(indexer.length > 0){
        //     //     ////console.log("prefilter", blobs)
        //     //     blobs = blobs.filter(blobguy => !(indexer.includes(blobguy)))
        //     //      ////console.log("postfilter", blobs)
        //     // }
        // }


            for(let b = 0; b< blobs.length; b++){
    
                if(blobs[b].bits.length == 1){
                    blobs[b].bits[0].color = "#00000000"
                }

            blobs[b].draw()

            let movefloor = Math.floor(Math.sqrt(blobs[b].bits.length))+1
            for(let p = 0; p < movefloor; p++){
                blobs[b].move()
            }
            
            if(b > blobs.length){
                ////console.log("snafu")


            }
            ////console.log(blobs[b])
         for (let k = 0; k < blobs[b].bits.length; k++){
    
        
            for (let w = 0; w < bullets.length; w++){

                // if(typeof blobs[b] === 'undefined'){
                //     blobs[b] = new Blob([])
                // }
    
                // //////console.log("blobs", blobs, blobs[b], "blobs[b]" )
                if(blobs[b].bits.length > 1){

                    if(squarecircle(blobs[b].bits[k], bullets[w])){
                        ////console.log(blobs)
        
                        bullets[w].health -= 1
                        //console.log(bullets)
                        // if(blobs[b].bits[k].color !== "#0000FF"){   
                            if(Math.random() > (.9-spawndrop)){

                                let blockhold = (blobs[b].bits.splice(k, 1))
                                allsquares.splice(allsquares.indexOf(blobs[b].bits[k]),1)
                                blockhold[0].color = "#00000000"
                                blockhold[0].width = blockhold[0].width*1.2
                                blockhold[0].height = blockhold[0].height*1.2
                                singleblob  = new Clearblob(blockhold)
                                //
                                clearblobs.push(singleblob)
                                //////console.log(clearblobs)

                            }else{
                                allsquares.splice(allsquares.indexOf(blobs[b].bits[k]),1)
                                blobs[b].bits.splice(k, 1)

                            }
    
                        // }
                        if(immortal == 0){
    
                            if(bullets[w].health <= 0){

                                bullets.splice(w, 1)

                            }
    
                        }else{

                        

                        }
                        // k+=1

                        //////console.log(holdblob, "holdblob", blobs[b], "blobs[b]", blobs, "blobs")
        
                        if((holdblob !== blobs[b]) ){ //&& (holdblob.length !== 0) )
                            // ////////console.log(holdblob)
                            if(checktocheck == 1){
                            connected(holdblob, holdblob.bits[(Math.floor(Math.random()*holdblob.bits.length))])
                            // connected(holdblob, holdblob.bits[(Math.floor(Math.random()*holdblob.bits.length))])
                            }
                        }
    holdblob = blobs[b]
    // clearTimeout(update);
    update = setTimeout(splitter, 100);
    counter = 60
    
    checktocheck = 1
    
                        // connected(blobs[b], blobs[b].bits[(Math.floor(Math.random()*blobs[b].bits.length))])
                
        
                        ////console.log(blobs)
                    }
            

                }
            }
    
        }
    
            
        }
    // if(singleblob !== 1){

    // }
        circ.draw()
        players(circ)

        // circ.ymom  += .01
        circ.move()

     //   tutorial_canvas_context.clearRect(0,0,tutorial_canvas.width*10,tutorial_canvas.height*10)

    
     for (let k = 0; k < bullets.length; k++){

    
        bullets[k].move()
        bullets[k].draw(tutorial_canvas_context)

             }


// let newmaker = 0

//         for(let d = 0; d<allsquares.length; d++){

//             if(allsquares[d].color == "#0000FF"){

//                 if(squarecircle(allsquares[d], circ) == true){


//                     for(let q= 0; q<blobs.length; q++){
//                         let holdbool = true
//                         for(let v= 0; v<blobs[q].bits.length; v++){

//                             if(squaresquare(allsquares[d], blobs[q].bits[v]) == true){

//                                 if(allsquares[d] !== blobs[q].bits[v]){
//                                     holdbool = false
                                    
//                                 }


//                             }
                            

    
//                         }
//                         if(holdbool == true){
//                             blobs[q].bits = [...blobs[q].bits.filter(block => (block !== allsquares[d]))]
//                             blobs = [...blobs.filter(blobhold => (blobhold.bits.length > 0))]
//                             allsquares.splice(d, 1)

//                             newmaker = 1
//                         }else{

//                             newmaker = 0

//                         }
//                     }
    
//                 }
    

//             }
//         }
             


//         if(newmaker == 1){
//             let boxocrap = []
//             xz = 0
//             yz = 0
    
//             let randcolor  = getRandomLightColor()
//             for(let r = 0; r <225; r++ ){
//                 let box = new Rectangle ( 300+xz, 300+yz, 16, 16, randcolor)
            
//                 box.xmom = (Math.random()-.5)
//                 box.ymom = (Math.random()-.5)
//                 if(r == 127){
    
//                     box.color = "#0000FF"
            
//                     box.xmom = 0
//                     box.ymom = 0
//                 }
//                 allsquares.push(box)
//                 boxocrap.push(box)
//                     xz += 15
//                     if(xz > 210){
//                         yz += 15
//                         xz = 0
//                     }
//                 }
                
    
    
    
//         let blobx = new Blob(boxocrap)
    
//         blobs.push(blobx)
    
    
    
// newmaker = 0    

//         }


for(let o = 0; o<bullets.length; o++){
    if(squarecircle(recthole, bullets[o]) == false){
        bullets.splice(o, 1)
    }
}





//         newmaker = 0    

             counter++


             for(let s = 0; s<clearblobs.length; s++){
                if((intersects(circ, clearblobs[s].bits[0]) == true)){
                    //  for(let d = 0; d<allsquares.length; d++){
                        //  if(clearblobs[d].bits.length <= 1){
                            // if(clearblobs[d].bits.includes(allsquares[s]) == true){
                                clearblobs.splice(s,1)
                                // allsquares.splice(s,1)
                                // //////console.log(circ)
                                // circ.radius+=.1
                                score+=1
                                money+=1
                            // }
                        //  }else{

                        //  }
                     }
                }
             for(let s = 0; s<allsquares.length; s++){
                if((squarecircle(allsquares[s], circ) == true)){
                    if(bomblifeline == 0){
                        death()
                    }else{
                        console.log("boom")
                        bomb()
                    }
                     }
                }
            // }




            allsquares = []

            for(let w = 0; w<blobs.length; w++){

                for(let q = 0; q<blobs[w].bits.length; q++){

                    allsquares.push(blobs[w].bits[q])

                }

            }



            for(let r = 0; r < clearblobs.length; r++){
                clearblobs[r].draw()
                clearblobs[r].move()


            }

            scorecard.innerText = `Collected: ${score}`
            moneycard.innerText = `Money: ${money}`

            if(allsquares.length < 256){

                clearInterval(timerrunner)
                generategrid()
                runthis()

            }else{

                // //////console.log(allsquares)
                // //////console.log(blobs)
            }

            if(dead == 1){
                tutorial_canvas_context.fillStyle = "White";
                tutorial_canvas_context.font = "40px Arial";
                tutorial_canvas_context.fillText(`Crash! Score: ${score}`, 120, 100);
            }

        if(Math.random() < turretlevel){
            shootturret(circ)
        }
        }else{
            if(dead == 0){

                storemethod()
            }
        }

        bombtimer++
    }, 10)

    function splitter(){

        // for(let b = 0; b< blobs.length; b++){
            if(counter > 70){
                connected(holdblob, holdblob.bits[(Math.floor(Math.random()*holdblob.bits.length))])
                // connected(holdblob, holdblob.bits[(Math.floor(Math.random()*holdblob.bits.length))])
                counter = 0

        checktocheck = 0
            }
            // connected(holdblob, holdblob.bits[(Math.floor(Math.random()*holdblob.bits.length))])
        // }


        ////////console.log(blobs)
    }

    function players(racer){
        if (keysPressed['w']) {
            if(racer.y > 0){
                racer.y -= maxplayerspeed
            }
        }
        if (keysPressed['a']) {
            if(racer.x > 0){
                racer.x -= maxplayerspeed
            }
        }
        if (keysPressed['s']) {
            if(racer.y < tutorial_canvas.height){
                racer.y += maxplayerspeed
            }
        }
        if (keysPressed['d']) {
            if(racer.x < tutorial_canvas.width){
                racer.x += maxplayerspeed
            }
        }
        if (keysPressed['b']) {
            if(bombtimer > 25){
                if(bombs >= 1){
                    bomb()
                    bombs -= 1
                    bombtimer = 0
                }
            }
        }




        document.onkeydown = function(event) {

        
            switch (event.keyCode) {
       
                     case 32:
                            if(dead == 0){
                            circ.x = tutorial_canvas.width/2
                            circ.y = tutorial_canvas.height/2
          // spacebar
            tutorial_canvas_context.clearRect(0,0,tutorial_canvas.width*10,tutorial_canvas.height*10)
    
            blobs = []
            clearblobs = []
            allsquares = []
            bullets = []

            if(store == 1) {
                store = 0
            }else{
                store = 1
            }
            clearInterval(timerrunner)
            runthis()
        }
                        break;
            }
        };
    
        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    }



    // function players(racer){


    //     if (keysPressed['w']) {
    //         if(racer.y > 0){

    //             for(let d = 0; d< blobs.length; d++){

    //                 for(let f = 0; f< blobs[d].bits.length; f++){

    //                     blobs[d].bits[f].y += .7
    //                 }
    //             }



    //             // racer.y -= .7

    //         }
    //     }
    //     if (keysPressed['a']) {

    //         for(let d = 0; d< blobs.length; d++){

    //             for(let f = 0; f< blobs[d].bits.length; f++){

    //                 blobs[d].bits[f].x += .7
    //             }
    //         }

    //     }
    //     if (keysPressed['s']) {

    //         for(let d = 0; d< blobs.length; d++){

    //             for(let f = 0; f< blobs[d].bits.length; f++){

    //                 blobs[d].bits[f].y -= .7
    //             }
    //         }

    //     }
    //     if (keysPressed['d']) {
       

    //         for(let d = 0; d< blobs.length; d++){

    //             for(let f = 0; f< blobs[d].bits.length; f++){

    //                 blobs[d].bits[f].x -= .7
    //             }
    //         }

    //     }

    //     if (keysPressed['f']) {
    //     }

    // }

    // run on any object with x/y attributes in the timer to give them wasd controls
    // function players(racer){
    //     if (keysPressed['w']) {
    //         if(racer.ymom <= 0){
    //             racer.ymom = -.5
    //             racer.xmom = 0

    //         }
    //     }
    //     if (keysPressed['a']) {
    //         if(racer.xmom <= 0){
    //             racer.xmom = -.5
    //             racer.ymom = 0
    //         }
    //     }
    //     if (keysPressed['s']) {

    //         if(racer.ymom >= 0){
    //             racer.ymom = .5
    //             racer.xmom = 0
    //         }
    //     }
    //     if (keysPressed['d']) {
    //         if(racer.xmom >= 0){
    //             racer.xmom = .5
    //             racer.ymom = 0
    //         }
    //     }
    //     if (keysPressed['f']) {
    //     }

    //     if (keysPressed['d']) {
         
    //         if (keysPressed['s']) {

    //             // if(racer.ymom <= 0){
    //             //     if(racer.xmom <= 0){
    //                 racer.ymom = .5
    //                 racer.xmom = .5
    //             }
                
    //         }
    //     }



        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    



        function intersects(circle, left) {
            var areaX = left.x - circle.x;
            var areaY = left.y - circle.y;
            return areaX * areaX + areaY * areaY <= circle.radius * circle.radius*4.41;
        }

        function intersectssmall(circle, left) {
            var areaX = left.x - circle.x;
            var areaY = left.y - circle.y;
            return areaX * areaX + areaY * areaY <= circle.radius * circle.radius*.5;
        }

function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 12)+4];
    }
    return color;
  }



  function squarecircle(square, circle){


    if(typeof square == "undefined"){
        return false
    }
    if(typeof circle == "undefined"){
        return false
    }
    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}




function squaresquare(a, b){

    a.left = a.x
    b.left = b.x
    a.right = a.x + a.width
    b.right = b.x + b.width
    a.top = a.y 
    b.top = b.y
    a.bottom = a.y + a.height
    b.bottom = b.y + b.height



    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}




Array.prototype.unique = function() {
    return this.filter(function (value, index, self) { 
      return self.indexOf(value) === index;
    });
  }


function connected(blorp, bit){
    let block = []
    let xblock = [...blorp.bits]
    let nums = []
    let blockus = [bit]
    for (let k = 0; k < blorp.bits.length; k++){
        if(squaresquare(bit, blorp.bits[k]) == true){
            if(!(blockus.includes(blorp.bits[k]))){
                blockus.push(blorp.bits[k])
            }
        }
    }
    for (let e = 0; e < 25; e++){
        for (let k = 0; k < blorp.bits.length; k++){
        for (let z = 0; z < blockus.length; z++){
            if(squaresquare(blockus[z],blorp.bits[k]) == true){
                if(!(blockus.includes(blorp.bits[k]))){
                    blockus.push(blorp.bits[k])
                }
            }
        }
    }
}
    for (let k = blorp.bits.length-1; k > 0; k--){
        for (let w = 0; w < blorp.bits.length; w++){
            if(w!==k){
                if(squaresquare(blorp.bits[k],blorp.bits[w]) == true){
                    block.push(blorp.bits[k])
                    block.push(blorp.bits[w])
                    nums.push(k)
                    nums.push(w)
                }
            }
            }
        }
        let bump = nums.unique()
        for (let k = 0; k < bump.length; k++){
            xblock.splice(bump[-k], 1)
        }
        let q =  [...blorp.bits.filter(block => !blockus.includes(block))]
        q =  [...q.filter(block => (typeof block !== undefined))]
        let bhlab = new Blob(q)
        let blarb = new Blob(blockus)
        blobs.push(bhlab)
        blobs.push(blarb)

        blobs.splice(blobs.indexOf(blorp), 1)

        if(blarb.bits.length < blorp.bits.length){


            connected(bhlab, bhlab.bits[(Math.floor(Math.random()*bhlab.bits.length))])
           connected(blarb, blarb.bits[(Math.floor(Math.random()*blarb.bits.length))])
        }



        // if(firstpass == 0 ){

        //     ////////console.log("hellohere")
        //     firstpass = 1
        //     connected(bhlab, bhlab.bits[(Math.floor(Math.random()*bhlab.bits.length))])
        //     connected(blarb, blarb.bits[(Math.floor(Math.random()*blarb.bits.length))])
        //     firstpass = 0

        // }

        // if(secondpass == 0 ){

        //     ////////console.log("hellohere")
        //     secondpass = 1
        //     connected(bhlab, bhlab.bits[(Math.floor(Math.random()*bhlab.bits.length))])
        //     connected(blarb, blarb.bits[(Math.floor(Math.random()*blarb.bits.length))])
        //     secondpass = 0

        // }
        
        for(let g = 0; g< blobs.length; g++){
            blobs[g].bits =  [...blobs[g].bits.filter(block => ( typeof block !== "undefined"))]
        }
        blobs = blobs.filter(blob => !(blob.bits.length == 0))
        blobs = blobs.unique()
        blobs.sort((a, b) => (a.bits[0].color > b.bits[0].color) ? 1 : (a.bits[0].color === b.bits[0].color) ? ((a.bits.length > b.bits.length) ? 1 : -1) : -1 )

    }


// function connected(blorp, bit){

//     ////////console.log(bit)

//     let block = []
//     let xblock = [...blorp.bits]
//     // ////////console.log(xblock, "xblock")

//     let nums = []

//     let blockus = [bit]


        
    
//     for (let k = 0; k < blorp.bits.length; k++){

//         if(squaresquare(bit, blorp.bits[k]) == true){
    
//             if(!(blockus.includes(blorp.bits[k]))){

//                 blockus.push(blorp.bits[k])
//                 // ////////console.log(blockus)

//             }
            
//         }
    
//     }

    
//     for (let e = 0; e < 11; e++){
    
//         for (let k = 0; k < blorp.bits.length; k++){
//         for (let z = 0; z < blockus.length; z++){

    
//             if(squaresquare(blockus[z],blorp.bits[k]) == true){
    
//                 if(!(blockus.includes(blorp.bits[k]))){

//                     blockus.push(blorp.bits[k])
//                     // ////////console.log(blockus)

//                 }
                
//             }
    
//         }
    
//     }
// }

        
//     for (let k = blorp.bits.length-1; k > 0; k--){


//         for (let w = 0; w < blorp.bits.length; w++){


//             if(w!==k){

//                 if(squaresquare(blorp.bits[k],blorp.bits[w]) == true){

//                     block.push(blorp.bits[k])
//                     block.push(blorp.bits[w])
//                     // ////////console.log(block)
                    
//                     nums.push(k)
//                     nums.push(w)

//         // ////////console.log(xblock)
//                 }
    

//             }

//             }
//         }
        

//         let bump = nums.unique()


//         for (let k = 0; k < bump.length; k++){

//             xblock.splice(bump[-k], 1)
//         }

//         let arr = block.unique()


//         // for(let h = 0; h<blockus.length; h++){


//             // ////////console.log(blorp, "before")
//            let q =  [...blorp.bits.filter(block => !blockus.includes(block))]
//             q =  [...q.filter(block => (typeof block !== undefined))]

//             // ////////console.log(blorp, "after")

//         // }

//         ////////console.log(q, blockus, "what")
        
//         // ////////console.log(blarb)
    

//         // let blarbx = new Blob(xblock)
//         let bhlab = new Blob(q)

//         // ////////console.log(blarbx)
//         // ////////console.log(blobs)

//         blobs.splice(blobs.indexOf(blorp), 1)
//         let blarb = new Blob(blockus)

//         blobs.push(bhlab)
//         blobs.push(blarb)

//         for(let g = 0; g< blobs.length; g++){

//             blobs[g].bits =  [...blobs[g].bits.filter(block => ( typeof block !== "undefined"))]

//         }



//     blobs = blobs.filter(blob => !(blob.bits.length == 0))

//     //     blobs.push(blarb)
//     //    blobs.push(bhlab)
//     //    if(blarbx.bits.length>0){

//     //     blobs.push(blarbx)

//     //    }



//         ////////console.log(blobs, "blobs")
//     }
    



























let isDrawing = false;
let x = 0;
let y = 0;

let myPics = document.getElementById('tutorial');
let context = myPics.getContext('2d');



// myPics.width = 500
// myPics.height = 500
// context.scale(.25, .25);

// The x and y offset of the canvas from the edge of the page
const rect = myPics.getBoundingClientRect();

// Add the event listeners for mousedown, mousemove, and mouseup


myPics.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = 'red';
  context.lineWidth = 1;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}



function shootturret(turret){
    if(store == 1){

        let holdtarget = Math.floor(Math.random()*allsquares.length)
        x = allsquares[holdtarget].x
        y = allsquares[holdtarget].y

  if (shotcount >= 0){
    bullets[bullets.length] = new Circle(turret.x,turret.y,1,"#ffffff")
    bullets[bullets.length-1].health = piercing  //Math.ceil(score/10)

  
    s = Math.abs(turret.x - x)
    b = Math.abs(turret.y - y)
  
  
  
  
  
  
  
    g = s*s/b*b
    h = b*b/s*s
  
  
    n = g*g
    m = h*h 
  
  
  
    d = Math.sqrt((m+n))
  
    p = d/25
  
    g = g/p
  
    h = h/p
  
    gg = h+g
  
    hh = g*h
  
  //    if(b < 1){
  
     
  //     b -= 1
  //  }
  //  if(b > -1){
  
   
  //     b += 1
  //  }
  //  if(s < -1){
  
   
  //  s -= 1
  // }
  // if(s > 1){
  
  
  //  s += 1
  // }
  
  // b *= 100
  // s *= 100
  
  //////////console.log((Math.abs(b)*Math.abs(s)))
  
  
    for (let k = 0; (Math.abs(b)+Math.abs(s)) > maxbulletspeed; k++ ){
     b = b*.9999
     s = s*.9999
    }
    for (let k = 0; (Math.abs(b)+Math.abs(s)) < maxbulletspeed; k++ ){
     b = b/.9999
     s = s/.9999
    }
  
  // j = b / 100
  // w = s / 100
  
  // if(j > w){
  //     b = b *j
  //     s = s*j
  // } else {
  //     b = b *w
  //     s = s*w
  // }
  
    ////////console.log(gg/hh, gg, hh,g,h,s,b)
    ////////console.log((Math.abs(b)*Math.abs(s)))
  
    if(x > turret.x){
     //circ2.ymom = g
     bullets[bullets.length-1].xmom = s
     }
     if(x < turret.x){
    // circ2.ymom = g
    bullets[bullets.length-1].xmom = -s
     }
     if(y< turret.y){
         bullets[bullets.length-1].ymom = -b
    // circ2.xmom = h
     }
     if(y> turret.y){
         bullets[bullets.length-1].ymom = b
    // circ2.xmom = h
     }
    
  
     //bullets[bullets.length].ymom = s
     //bullets[bullets.length].xmom = b
  
  
  
  
  
  
  
  
  
  
  //    bullets.length +=1
  }
  
     shotcount--

}

}





myPics.addEventListener('mousedown', e => {

        //isDrawing = true;
          if(store == 1){

            x = (e.clientX - rect.left);
            y = (e.clientY - rect.top);
      
      if (shotcount >= 0){
        bullets[bullets.length] = new Circle(circ.x,circ.y,1,"#ffffff")
        bullets[bullets.length-1].health = piercing  //Math.ceil(score/10)
    
      
        s = Math.abs(circ.x - x)
        b = Math.abs(circ.y - y)
      
      
      
      
      
      
      
        g = s*s/b*b
        h = b*b/s*s
      
      
        n = g*g
        m = h*h 
      
      
      
        d = Math.sqrt((m+n))
      
        p = d/25
      
        g = g/p
      
        h = h/p
      
        gg = h+g
      
        hh = g*h
      
      //    if(b < 1){
      
         
      //     b -= 1
      //  }
      //  if(b > -1){
      
       
      //     b += 1
      //  }
      //  if(s < -1){
      
       
      //  s -= 1
      // }
      // if(s > 1){
      
      
      //  s += 1
      // }
      
      // b *= 100
      // s *= 100
      
      //////////console.log((Math.abs(b)*Math.abs(s)))
      
      
        for (let k = 0; (Math.abs(b)+Math.abs(s)) > maxbulletspeed; k++ ){
         b = b*.9999
         s = s*.9999
        }
        for (let k = 0; (Math.abs(b)+Math.abs(s)) < maxbulletspeed; k++ ){
         b = b/.9999
         s = s/.9999
        }
      
      // j = b / 100
      // w = s / 100
      
      // if(j > w){
      //     b = b *j
      //     s = s*j
      // } else {
      //     b = b *w
      //     s = s*w
      // }
      
        ////////console.log(gg/hh, gg, hh,g,h,s,b)
        ////////console.log((Math.abs(b)*Math.abs(s)))
      
        if(x > circ.x){
         //circ2.ymom = g
         bullets[bullets.length-1].xmom = s
         }
         if(x < circ.x){
        // circ2.ymom = g
        bullets[bullets.length-1].xmom = -s
         }
         if(y< circ.y){
             bullets[bullets.length-1].ymom = -b
        // circ2.xmom = h
         }
         if(y> circ.y){
             bullets[bullets.length-1].ymom = b
        // circ2.xmom = h
         }
        
      
         //bullets[bullets.length].ymom = s
         //bullets[bullets.length].xmom = b
      
      
      
      
      
      
      
      
      
      
      //    bullets.length +=1
      }
      
         shotcount--

    }else{

        // console.log(holdclick)

        x = (e.clientX - rect.left);
        y = (e.clientY - rect.top);
        holdclick.x = x
        holdclick.y = y

    }
  });





  function death(){


    circ.radius = 100
    circ.x = 1000000000
    circ.y = 1000000000

    dead = 1
  }

// runthis()


function bomb(){

    let xs =[0, .25, .5, .75, 1, 0, -.25, -.5, -.75, -1, 0, .25, .5, .75, 1, 0, -.25, -.5, -.75, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, .25, .5, .75, 1, 0, -.25, -.5, -.75, -1, 0, .25, .5, .75, 1, 0, -.25, -.5, -.75, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    let ys = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, .25, .5, .75, 1, 0, -.25, -.5, -.75, -1, 0, .25, .5, .75, 1, 0, -.25, -.5, -.75, -11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, .25, .5, .75, 1, 0, -.25, -.5, -.75, -1, 0, .25, .5, .75, 1, 0, -.25, -.5, -.75, -1]

    console.log(xs, ys)

    for(let j= 0; j < xs.length; j++){


        // if(store == 1){

            x = circ.x+xs[j]
            y = circ.y+ys[j]
      
            console.log(x,y)
      if (shotcount >= 0){
        bullets[bullets.length] = new Circle(circ.x,circ.y,1,"#ffffff")
        bullets[bullets.length-1].health = piercing  //Math.ceil(score/10)
    
      
        s = Math.abs(circ.x - x)
        b = Math.abs(circ.y - y)
      
      
      
      
      
      
      
        g = s*s/b*b
        h = b*b/s*s
      
      
        n = g*g
        m = h*h 
      
      
      
        d = Math.sqrt((m+n))
      
        p = d/25
      
        g = g/p
      
        h = h/p
      
        gg = h+g
      
        hh = g*h
      
      //    if(b < 1){
      
         
      //     b -= 1
      //  }
      //  if(b > -1){
      
       
      //     b += 1
      //  }
      //  if(s < -1){
      
       
      //  s -= 1
      // }
      // if(s > 1){
      
      
      //  s += 1
      // }
      
      // b *= 100
      // s *= 100
      
      //////////console.log((Math.abs(b)*Math.abs(s)))
      
      
        for (let k = 0; (Math.abs(b)+Math.abs(s)) > maxbulletspeed; k++ ){
         b = b*.9999
         s = s*.9999
        }
        for (let k = 0; (Math.abs(b)+Math.abs(s)) < maxbulletspeed; k++ ){
         b = b/.9999
         s = s/.9999
        }
      
      // j = b / 100
      // w = s / 100
      
      // if(j > w){
      //     b = b *j
      //     s = s*j
      // } else {
      //     b = b *w
      //     s = s*w
      // }
      
        ////////console.log(gg/hh, gg, hh,g,h,s,b)
        ////////console.log((Math.abs(b)*Math.abs(s)))
      
        if(x > circ.x){
         //circ2.ymom = g
         bullets[bullets.length-1].xmom = s
         }
         if(x < circ.x){
        // circ2.ymom = g
        bullets[bullets.length-1].xmom = -s
         }
         if(y< circ.y){
             bullets[bullets.length-1].ymom = -b
        // circ2.xmom = h
         }
         if(y> circ.y){
             bullets[bullets.length-1].ymom = b
        // circ2.xmom = h
         }
        
      
         //bullets[bullets.length].ymom = s
         //bullets[bullets.length].xmom = b
      
      
      
      
      
      
      
      
      
      
      //    bullets.length +=1
      }
      
         shotcount--

    // }else{

    //     // console.log(holdclick)

    //     x = (e.clientX - rect.left);
    //     y = (e.clientY - rect.top);
    //     holdclick.x = x
    //     holdclick.y = y

    // }



    }
}
})
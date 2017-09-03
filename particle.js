loadImgs([
    'littleleague.png'
], function (imgs){
    
    var iNow = 0;
    
    show(imgs[iNow],0,50,10,4);
    
    
    function show(yImg,dx,dy,iN,iR){
        
        var oC = document.getElementById('c1');
        var oGC = oC.getContext('2d');
        
        var w = yImg.width;
        var h = yImg.height;
        
        oGC.globalAlpha = 1;
        oGC.drawImage(yImg , 0, 0, w, h, oC.width/2-w/4, oC.height/2-h/4, w/2, h/2);
        
        var imageData = oGC.getImageData(oC.width/2-w/4, oC.height/2-h/4, w/2, h/2);
        
        oGC.clearRect(0,0,oC.width,oC.height);
        
        var arr = [];
        var iNum = 0;
        
        for(var i=0;i<imageData.height;i++){
            for(var j=0;j<imageData.width;j++){
                
                var color = getXY( imageData , j , i );
                
                if( color[3] > 100 ){
                    
                    arr.push([j,i]);
                }
                
            }
        }
        
        arr.sort(function(num1,num2){
            return Math.random() - 0.5;
        });
        
        var timer3 = setInterval(function(){
            
            oGC.clearRect(0,0,oC.width,oC.height);
            for(var i=0;i<allBall.length;i++){
                oGC.fillStyle = '#0a88f9';
                oGC.beginPath();
                oGC.globalAlpha = allBall[i].a/100;
                oGC.arc(allBall[i].x,allBall[i].y,allBall[i].r,0,360*Math.PI/180,false);
                oGC.closePath();
                oGC.fill();
            }
            
        },30);
        
        
        var allBall = [];
        
        var timer1 = setInterval(function(){
            for(var i=0;i<Math.min(allBall.length,arr.length);i++){
                startMove(allBall[i],{x:arr[i][0]*iN+dx,y:arr[i][1]*iN+dy,r:iR,a:100});
            }
            
        },30);
        
        var timer2 = setInterval(function(){
    
            iNum++;
            
            for(var i=0;i<iNum;i++){
                
                allBall.push({
                    x : Math.floor(Math.random()*oC.width),
                    y : Math.floor(Math.random()*oC.height),
                    r : 100,
                    a : 0
                });
                
            }
            
            if(allBall.length >= arr.length){
                clearInterval(timer2);
                setTimeout(function(){
            
                    clearInterval(timer1);
                
                },2000);
            }
    
        },100);
        
        function startMove(obj,json){
            
            for(var attr in json){
                
                var iSpeed = (json[attr] - obj[attr])/6;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                
                obj[attr] += iSpeed;
                
            }
            
        }
        
        function startMove2(obj,json,fn){
            
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                
                var bBtn = true;
                
                for(var attr in json){
                
                    var iSpeed = (json[attr] - obj[attr])/8;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    
                    obj[attr] += iSpeed;
                    
                    if( obj[attr] != json[attr] ){
                        bBtn = false;
                    }
                    
                }
                
                if(bBtn){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
                
            },30);
            
        }
        
    }
    
});


function loadImgs(arr, fnSucc){
    
    var loaded = 0;
    var result = [];

    for(var i=0;i<arr.length;i++){
        
        loads( arr[i] );		
    }
    
    function loads(oImg){
        var yImg = new Image();
        
        yImg.src = oImg;
        
        yImg.onload = function(){
        
            loaded++;
            result.push( yImg );	
            
            if( loaded == arr.length ){
                fnSucc(result);
            }
            
            
            
        };
        
    }
    
}

function getXY(obj,x,y){
    
    var data = obj.data;
    var w = obj.width;
    var h = obj.height;
    
    var color = [];
    color[0] = data[ 4*(w*y+x) ];
    color[1] = data[ 4*(w*y+x) + 1 ];
    color[2] = data[ 4*(w*y+x) + 2 ];
    color[3] = data[ 4*(w*y+x) + 3 ];
    
    return color;
    
}
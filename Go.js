//模式
var mode=true;
var on_off=true;//开关
//获取
//自定义类存放旋转体状态
function ClockComponent(idName){
    this.obj=document.getElementById(idName);
    this.current=0;//随机模式下的角度
    this.handAngle=0;//钟表模式下的指针角度
    this.t=0;
    this.lerp_On_Off=true;
}
//实例化组件
var clock_gun=new ClockComponent("gun"),clock_in=new ClockComponent("in"),clock_out1=new ClockComponent("out1"),clock_out2=new ClockComponent("out2"),
clock_out3=new ClockComponent("out3"),clock_out4=new ClockComponent("out4"),clock_b_out1=new ClockComponent("b_out1"),clock_b_out2=new ClockComponent("b_out2"),
clock_gun2=new ClockComponent("gun2"),clock_gun3=new ClockComponent("gun3"),clock_gun4=new ClockComponent("gun4");
var mb=document.getElementById("mb");
var mb_Switch=true;
//时间
var time=new Date();
var h,m,s;
var t_text=document.getElementById("time");

//电表倒转
function RotateImg(component,size,isRight){
    if(!on_off){
        return false;
    }
    if(mode){
        return false;
    }
    if(!component.obj){
        alert("没找到！");
        return false;
    }
    size=size/100;
    if(isRight){
        component.current+=size;
    }else{
        component.current-=size;
    }
    component.current=component.current%360;
    component.obj.style.transform='rotate('+component.current+'deg)';
}
///设置世界时间
function setHandTime(){
    time=new Date();
    h=time.getHours();
    m=time.getMinutes();
    s=time.getSeconds();
    if(h>12){
        h-=12;
    }
    if(mode){
        clock_gun.handAngle=m*6;
        clock_gun2.handAngle=h*30+m/60;
        clock_gun3.handAngle=s*6;
    }
    if(on_off){
        t_text.innerText=h.toString()+":"+m.toString()+":"+s;
    }
}
///当前时间
function setRotateAccordingDate(target,accrValue,isH){
    if(!on_off){
        return false;
    }
    if(!mode){
        return false;
    }
    var current;
    if(accrValue!=null){
        if(arrcValue=0){
            arrcValue=1;
        }
        if(isH){
            current=accrValue*30;
            current+=m/60;
        }else{
            current=(accrValue+1)*6;
        }
        // var target=document.getElementById("gun3");
        target.obj.style.transform='rotate('+current+'deg)';
    }
}
///
function gunRotateS(){
    ///////////////////////////////////////////
    setInterval("RotateImg (clock_in,10,false)",10);
    setInterval("RotateImg (clock_out2,50,true)",10);
    setInterval("RotateImg (clock_out3,150,false)",10);
    setInterval("RotateImg (clock_out4,98,true)",10);
    setInterval("RotateImg (clock_b_out1,5,true)",10);
    setInterval("RotateImg (clock_b_out2,5,false)",10);
    
    setInterval("RotateImg (clock_gun4,360,true)",10);//毫秒
    setInterval("RotateImg (clock_gun3,390,true)",10);//秒
    setInterval("RotateImg (clock_gun2,200,false)",10);//时
    setInterval("RotateImg (clock_gun,400,false)",10);//分
    ///////////////////////////////////////////
    setInterval("setHandTime()",50);//显示暂时的时间，并且保存h.m.s;
    setInterval("setRotateAccordingDate(clock_gun3,s,false)",1000)
    setInterval("setRotateAccordingDate(clock_gun2,h,true)",50)
    setInterval("setRotateAccordingDate(clock_gun,m+s/60,false)",50)
    setTimeout(() => {
        
    }, 3000);
}
function changeMode(){
    if(mode==true){
        clock_gun.current=m*6;
        clock_gun2.current=h*30+m/60;
        clock_gun3.current=s*6;
        if(mb_Switch){
            StartTime();
            ChangeImg();
        }
    }else{//从随机到钟表
        //对其时间
        //从当前时间角度lerf到世界时间角度
        on_off=false;
        SwitchToCurrentTime(clock_gun3);
        // ChangeImg();
    }
    mode=!mode;
}
window.onload=gunRotateS();

function SwitchToCurrentTime(component){
    ///
    setComponentOn_Off(true);
    ///
    var si1=setInterval(() => {
        setHandTime();
        clock_gun.handAngle=m*6;
        clock_gun2.handAngle=h*30+m/60;
        clock_gun3.handAngle=s*6;
        LerpRotate(component,100);
    }, 10);
    var si1=setInterval(() => {

        LerpRotate(clock_gun2,300);
    }, 10);
    var si1=setInterval(() => {

        LerpRotate(clock_gun4,200);
    }, 10);
    var si1=setInterval(() => {

        LerpRotate(clock_gun,150);
    }, 10);
}
function LerpRotate(component,sec){
    if(!component.lerp_On_Off){
        return false;
    }
    component.t++;
    // currentTimeAngle=s*6;
    component.current+=(-component.current+ component.handAngle)*(component.t/(100*sec));
    component.obj.style.transform='rotate('+component.current+'deg)';
    if(Math.abs(component.current-component.handAngle)<6){
        component.t=0;
        // component.current=component.handAngle;
        component.current=0;
        component.handAngle=0;
        on_off=true;
        component.lerp_On_Off=false;
    }
}

function setComponentOn_Off(bool){
    clock_gun.lerp_On_Off=bool;
    clock_gun2.lerp_On_Off=bool;
    clock_gun3.lerp_On_Off=bool;
    clock_gun4.lerp_On_Off=bool;
}
function ChangeImg(){
    clock_gun.obj.src="newTIme/sz.png";
    clock_gun2.obj.src="newTIme/szz.png";
    clock_gun3.obj.src="newTIme/mz.png";
    clock_gun4.obj.src="newTIme/hmz.png";
    /////////////////
    // clock_b_out1.obj.src="newTIme/5h.png";
    clock_b_out2.obj.src="newTIme/5.5h.png";
    clock_out1.obj.src="newTIme/5h.png";
    clock_out2.obj.src="newTIme/3h.png";
    clock_out3.obj.src="newTIme/4h.png";
    clock_out4.obj.src="newTIme/2h.png";
    clock_in.obj.src="newTIme/1h.png";
}

function StartTime(){
    let t=1.0;
    var si=setInterval(() => {
        t-=0.01;
        mb.style.opacity=t;
        if(t<=0){
            mb_Switch=false;
            /////////
            on_off=false;
            SwitchToCurrentTime(clock_gun3);
            mode=!mode;
            /////////
            clearInterval(si);
        }
    }, 50);
}
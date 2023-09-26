function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

loco();

let third_col = "#8a0303"

function checksize(){
    let screenSize = screen.width;
    if(screenSize<480){
        mobilePage1();
        mobilePage2()
        mobileEduPage();
    }else if(screenSize>480 && screenSize <1200){
        mobilePage1();
        mobilePage2()
        mobileEduPage();
    }else{
        console.log(screenSize +"this is screen")
        normalPage1();
        normalEduPage();
    }
}

function mobilePage1(){
    let mp1 = gsap.timeline({
        scrollTrigger:{
            trigger:".page1",
            scroller:"#main",
            markers:true,
            scrub: 1,
            start:"top 0%",
            end:"top -20%",
            pin: true

        }
    })
        mp1.from(".about-left ,.about-right",{
            // transform:`translate(600px,-100px) rotate(-15deg)`,
            transform:"translate(50%, 5%) rotate(-15deg)",
            duration: 1,
            opacity:0,
            scrub:2,
            stagger:.2
        })
        
}

function mobileEduPage(){
    let mE1 = gsap.timeline({
        scrollTrigger:{
            scroller:"#main",
            trigger: ".page3",
            // markers: true,
            start:"top 25%",
            end:"top -100% ", 
            scrub: 2  
        }
     })


     mE1.from(".page3 .box1",{
        left:-300,
        duration:.5,
        opacity:0,
       

    })
    mE1.from(".page3 .box2",{
        right:-300,
        duration:.5,
        opacity:0,

    })
    mE1.from(".page3 .box3",{
        left:-300,
        duration:.5,
        opacity:0,

    },)
    mE1.from(".page3 .box4",{
        right:-300,
        duration:.5,
        opacity:0,

    })
    
}

function mobilePage2(){
    let mp1 = gsap.timeline({
        scrollTrigger:{
            trigger:".page2",
            scroller:"#main",
            // markers:true,
            scrub: 1,
            start:"top 30%",
            end:"top 10%",

        }
    })

    mp1.from(".page2 .mid, .page2 .wrap",{
        opacity:0,
    })
}

// Normal Animation

function normalEduPage(){
    let tl4 = gsap.timeline({
        scrollTrigger:{
            trigger:".page3",
            scroller:"#main",
            // markers:true,
            scrub: 2,
            start:"top 0%",
            end:"top -200%",
            pin: true

        }
        
    })
    
    tl4.to('.page3',{
        borderRadius: 0,
        backgroundColor:"#8a0303",
        duration:.2,
        scrub:.2,
    },"anim3")
    tl4.to('.page3 .box1',{
        x:500,
        top:"10%",
        duration:1.5,
        scrub:.2,
    },"anim3")
  
    tl4.to('.page3 .box2',{
        delay:.7,
        top:"10%",
        right:"25%",
        duration:2,
        scrub:.2,
    },"anim3")
    tl4.to('.page3 .box1',{
        x:200,
        duration:1.5,
        scrub:.2,
    },"left-anim")
    tl4.to('.page3 .box3',{
        transform:"rotate(15deg)",
        delay:1.5,
        top:"10%",
        left:"50%",
        duration:2.5,
        scrub:.2,
    },"anim3")
    tl4.to('.page3 .box2',{
        x:-300,
        duration:1.5,
        scrub:.2,
    },"left-anim")
    tl4.to('.page3 .box4',{
        transform:"rotate(-15deg)",
        delay:2.5,
        top:"10%",
        right:"15%",
        duration:2.5,
        scrub:.2,
    },"anim3")
    tl4.to('.page3 .box3',{
        x:-150,
        duration:1.5,
        scrub:.2,
    },"left-anim")
}

function normalPage1(){
    let tl2 = gsap.timeline({
        scrollTrigger:{
            trigger:".page1",
            scroller:"#main",
            markers:true,
            scrub: 1,
            end:"top -30%",
            pin: true

        }
    })
    tl2.from(".page1 .about-left",{
        transform:"translate(50%, 5%) rotate(-15deg)",
        opacity:0,
        duration:2,
    },"anim")
    tl2.from(".page1 .about-right",{
        transform:"translate(50%, 5%) rotate(-15deg)",
        opacity:0,
        duration:2,
    },"anim")
}









function cursorMove(){
    let curs = document.querySelector('.curs');
    window.addEventListener('mousemove',(dets)=>{
        curs.style.transform=`translate(${dets.clientX}px, ${dets.clientY}px)`
    })
   
}

function iconMove(){
    var iconbox= document.querySelectorAll('.iconbox')
     var posY = 0
     var diff = 0;
     var posX = 0;


    window.addEventListener('mousemove',(dets)=>{
        posY = dets.clientY;
        posX = dets.clientX-0;
    })
    iconbox.forEach(function(elem){
        elem.addEventListener("mouseenter",(e)=>{
            var icwrap = elem.querySelector('.icwrap');
            icwrap.style.display="block"
        })
        elem.addEventListener('mousemove',(e)=>{
            var pos = elem.getBoundingClientRect();
            diff = posY - pos.top;  
            console.log(diff)
            var icwrap = elem.querySelector('.icwrap');
            icwrap.style.transform = `translate(${posX}px, ${diff}px)`
        })
        elem.addEventListener('mouseleave',(dets)=>{
            console.log(dets)
            var icwrap = elem.querySelector('.icwrap');
            icwrap.style.display="none";   
        })
    })
}





// page3animation()
checksize();
iconMove()
cursorMove()
// newHeroAnime();


const form = document.getElementById("contact-form");
const username = document.getElementById("name_cont");
const mail = document.getElementById("email_cont");
const error_message = document.getElementById("errormessage")

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let flag = 0
    if(username.value.length<3){
        error_message.style.display="block"
        error_message.innerText="Name atleast contain 3 letters"
        error_message.style.color="#fff"
    }else{
        flag=1
    }

    if(flag){
        error_message.style.display="none"
        error_message.innerText=""
        const data = new FormData(e.target)
        const name = data.get("name_cont")
        const mailId = data.get("email_cont")
        const feedbackMessage = data.get("feedback")
        console.log(name)
        console.log(mailId)
        console.log(feedbackMessage)

        sendEmail(name, mailId, feedbackMessage)
    }
    
})

function sendEmail(name, mailId, feedbackMessage){
    Email.send({
        Host : "smtp.gmail.com",
        Username : "manishbhuwad11@gmail.com",
        Password : "password",
        To : 'manishbhuwad11@gmail.com',
        From : mailId,
        Subject : "This is the subject",
        Body : "name:" + name
                +"<br> Email:" + mailId
                +"<br> message" + feedbackMessage
    }).then(
      message => alert("message sent successfully")
    );

    
}
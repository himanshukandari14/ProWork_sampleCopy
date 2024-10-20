import Lenis from 'lenis'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function lenisScroll(){
    const lenis = new Lenis()
    function raf(time) {
        lenis.raf(time)
        ScrollTrigger.update();
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
}

export function navbarHide(){
    let oldScrollY = window.scrollY;
    const Navbar = document.getElementById('Navbar');
    // const ProfileMenu = document.querySelector('.profile-menu');
    window.onscroll = function(e) {
        if(oldScrollY < window.scrollY){
            if(oldScrollY>100){
                Navbar.classList.add('hide');
                // ProfileMenu.classList.add('hide');
            }
        } else {
            Navbar.classList.remove('hide');
            // ProfileMenu.classList.remove('hide');
        }
        oldScrollY = window.scrollY;
    }
}

export function navSignUpBtn(){
    // const signupNumber = document.querySelector('.signup-number');
    const signupNumber = document.querySelector('.signUp-par');
    const BodyRoutes = document.getElementById('Body-routes');
    signupNumber.classList.add('showDisplay')
    // signupNumber.classList.remove('signup-number-move-up')
    BodyRoutes.classList.add('blurr')
    BodyRoutes.classList.remove('nonblurr')
}
export function SignUpBoxCross(){
    // const signupNumber = document.querySelector('.signup-number');
    const signupNumber = document.querySelector('.signUp-par');
    const BodyRoutes = document.getElementById('Body-routes');
    // signupNumber.classList.remove('signup-number-move-down')
    // signupNumber.classList.add('signup-number-move-up')
    signupNumber.classList.remove('showDisplay')
    BodyRoutes.classList.remove('blurr')
    BodyRoutes.classList.add('nonblurr')
}

export function navUserLaptopBtn(){
    const userNav = document.querySelector('.profile-menu');
    userNav.classList.add('profile-menu-show');
    userNav.classList.remove('hide');
}
export function closeProfileMenu(){
    const userNav = document.querySelector('.profile-menu');
    userNav.classList.remove('profile-menu-show');
    userNav.classList.add('hide'); 
}
export function unBLUR(){
    const BodyRoutes = document.getElementById('Body-routes');
    BodyRoutes.classList.remove('blurr')
    BodyRoutes.classList.add('nonblurr')
}

export function heroScroll(){
    const heroscroll = document.querySelector('.heroscroll');
    heroscroll.addEventListener('click', function(){window.scrollTo({top: 500, behavior: "smooth"})})
}
export function heroScrollx(){
    const Body = document.getElementById('Body')
    window.scrollTo({top: 0, behavior: "smooth"})
}


export function homeBodyAnimation(){setTimeout(stop, 2000)
    function stop(){

        const Body = document.getElementById("Hero");

        const subbox1lefta = document.querySelector('.sub-box1-left-a');
        const subbox1leftb = document.querySelector('.sub-box1-left-b');
        const subbox1leftc = document.querySelector('.sub-box1-left-c');
        const subbox1leftd = document.querySelector('.sub-box1-left-d');
 
        const time1 = gsap.timeline({paused: true});
        const time2 = gsap.timeline({paused: true});
        const time3 = gsap.timeline({paused: true});
        const time4= gsap.timeline({paused: true});
 
        time1.fromTo(subbox1lefta, {y:0},{y: '3vh', x: '5vh', duration: 2, delay:0.5, ease: 'none'} );
        time2.fromTo(subbox1leftb, {y:0},{y: '3vh', x: '-5vh', duration: 2, delay:0.5, ease: 'none'} );
        time3.fromTo(subbox1leftc, {y:0},{y: '-3vh', x: '5vh', duration: 2, delay:0.5, ease: 'none'} );
        time4.fromTo(subbox1leftd, {y:0},{y: '-3vh', x: '-5vh', duration: 2, delay:0.5, ease: 'none'} );
 
        const scroll_1 = ScrollTrigger.create({animation: time1, trigger: Body, start: 'bottom center ', end: 'bottom top', scrub: true})
        const scroll_2 = ScrollTrigger.create({animation: time2, trigger: Body, start: 'bottom center ', end: 'bottom top', scrub: true})
        const scroll_3 = ScrollTrigger.create({animation: time3, trigger: Body, start: 'bottom center ', end: 'bottom top', scrub: true})
        const scroll_4 = ScrollTrigger.create({animation: time4, trigger: Body, start: 'bottom center ', end: 'bottom top', scrub: true})

    }
}
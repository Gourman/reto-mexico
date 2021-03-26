



const toggleButton = document.getElementsByClassName('toggle-button')[0]
const menu = document.getElementsByClassName('menu')[0]

toggleButton.addEventListener('click', () => {
    menu.classList.toggle('active')
})

// cambiar el body de color
// function changeBackground() {
//     if (window.scrollY > window.innerHeight / 2) {
//         document.body.classList.add('bg-active');
//     } else {
//         document.body.classList.remove('bg-color')
//     }
// }

// function changeBackground() {
//     if (window.scrollY > window.innerHeight / 2) {
//         document.body.classList.add('bg-active');
//     }
//     else {
//         document.body.classList.remove('bg-active')

//     }
// }

// window.addEventListener('scroll', changeBackground);




gsap.utils.toArray(".panel").forEach(function (elem) {

    var color = elem.getAttribute('data-color');

    ScrollTrigger.create({
        trigger: elem,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => gsap.to('main', { backgroundColor: color }),
        onLeave: () => gsap.to('main', { backgroundColor: 'white' }),
        onLeaveBack: () => gsap.to('main', { backgroundColor: 'white' }),
        onEnterBack: () => gsap.to('main', { backgroundColor: color }),
        // markers: true
    });

});

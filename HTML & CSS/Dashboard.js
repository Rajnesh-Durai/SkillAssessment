document.getElementById('close').addEventListener('click', close);
document.getElementById('open').addEventListener('click', open);
 // Check if the window width is less than or equal to 1200px
var x = window.matchMedia("(max-width: 1200px)")
 // Function to open the navigation menu
function open() {
    document.getElementById('close').classList.remove('hidden');
    document.getElementById('open').classList.add('hidden');
     // Show navigation links if the window width matches the condition
    if (x.matches) {
        document.getElementById('nav-links').classList.remove('hidden-2');
    }
}
 // Function to close the navigation menu
function close() {
    document.getElementById('close').classList.add('hidden');
    document.getElementById('open').classList.remove('hidden');
     // Hide navigation links if the window width matches the condition
    if (x.matches) {
    document.getElementById('nav-links').classList.add('hidden-2');
    }
}
 // Add event listeners for extra and employee modules
document.getElementById('down').addEventListener('click', extramodule);
document.getElementById('up').addEventListener('click', closeModule);
document.getElementById('emp-down').addEventListener('click', empmodule);
document.getElementById('emp-up').addEventListener('click', empClose);
 // Function to open the extra module
function extramodule() {
    document.getElementById('up').classList.remove('hidden');
    document.getElementById('down').classList.add('hidden');
    document.getElementById('ques').classList.remove('hidden');
}
 // Function to close the extra module
function closeModule() {
    document.getElementById('up').classList.add('hidden');
    document.getElementById('down').classList.remove('hidden');
    document.getElementById('ques').classList.add('hidden');
}
 // Function to open the employee module
function empmodule() {
    document.getElementById('emp-up').classList.remove('hidden');
    document.getElementById('emp-down').classList.add('hidden');
    document.getElementById('emp').classList.remove('hidden');
}
 // Function to close the employee module
function empClose() {
    document.getElementById('emp-up').classList.add('hidden');
    document.getElementById('emp-down').classList.remove('hidden');
    document.getElementById('emp').classList.add('hidden');
}
 // Functions to change the background color of elements
function changecolor1() {
    document.getElementById('demo1').style.backgroundColor = '#DFF3FB';
}
function changecolor2() {
    document.getElementById('demo2').style.backgroundColor = '#DFF3FB';
}
function changecolor3() {
    document.getElementById('demo3').style.backgroundColor = '#DFF3FB';
}
function changecolor4() {
    document.getElementById('demo4').style.backgroundColor = '#DFF3FB';
}
function changecolor5() {
    document.getElementById('demo5').style.backgroundColor = '#DFF3FB';
}
function changecolor6() {
    document.getElementById('demo6').style.backgroundColor = '#DFF3FB';
}
function changecolor7() {
    document.getElementById('demo7').style.backgroundColor = '#DFF3FB';
}
function changecolor8() {
    document.getElementById('demo8').style.backgroundColor = '#DFF3FB';
}
 // Event listeners to reset the background color when clicking outside the element
document.addEventListener('click', function (event) {
    resetBackgroundColor(event, 'demo1');
    resetBackgroundColor(event, 'demo2');
    resetBackgroundColor(event, 'demo3');
    resetBackgroundColor(event, 'demo4');
    resetBackgroundColor(event, 'demo5');
    resetBackgroundColor(event, 'demo6');
    resetBackgroundColor(event, 'demo7');
    resetBackgroundColor(event, 'demo8');
});
 // Function to reset the background color of an element
function resetBackgroundColor(event, elementId) {
    var p = document.getElementById(elementId);
    if (!p.contains(event.target)) {
        p.style.backgroundColor = '#ffffff00';
    }
}
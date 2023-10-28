// document.getElementById('question').addEventListener('click',hide);

document.getElementById('close').addEventListener('click', close);
document.getElementById('open').addEventListener('click', open);
var x = window.matchMedia("(max-width: 1200px)")

function open() {
    document.getElementById('close').classList.remove('hidden');
    document.getElementById('open').classList.add('hidden');
    if(x.matches)
    {
    document.getElementById('nav-links').classList.remove('hidden-2')
    }
}
function close(){
    document.getElementById('close').classList.add('hidden');
    document.getElementById('open').classList.remove('hidden');
    if(x.matches)
    {
    document.getElementById('nav-links').classList.add('hidden-2');
    }
}

document.getElementById('down').addEventListener('click', extramodule);
document.getElementById('up').addEventListener('click', closeModule);
document.getElementById('emp-down').addEventListener('click', empmodule);
document.getElementById('emp-up').addEventListener('click', empClose);


function extramodule(){
    document.getElementById('up').classList.remove('hidden');
    document.getElementById('down').classList.add('hidden');
    document.getElementById('ques').classList.remove('hidden');
}

function closeModule(){
    document.getElementById('up').classList.add('hidden');
    document.getElementById('down').classList.remove('hidden');
    document.getElementById('ques').classList.add('hidden');
}

function empmodule(){
    document.getElementById('emp-up').classList.remove('hidden');
    document.getElementById('emp-down').classList.add('hidden');
    document.getElementById('emp').classList.remove('hidden');
}

function empClose(){
    document.getElementById('emp-up').classList.add('hidden');
    document.getElementById('emp-down').classList.remove('hidden');
    document.getElementById('emp').classList.add('hidden');
}

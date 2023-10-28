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

const selected1 = document.querySelector(".selected1");
const optionsContainer1 = document.querySelector(".options-container1");
const optionList1 = document.querySelectorAll(".option1");

selected1.addEventListener("click", () => {
    optionsContainer1.classList.toggle("active");
})

optionList1.forEach(o=>{
    o.addEventListener("click", () =>{
        selected1.innerHTML=o.querySelector("label").innerHTML;
        optionsContainer1.classList.remove('active');
    });
});

const selected2 = document.querySelector(".selected2");
const optionsContainer2 = document.querySelector(".options-container2");
const optionList2 = document.querySelectorAll(".option2");

selected2.addEventListener("click", () => {
    optionsContainer2.classList.toggle("active");
})

optionList2.forEach(o=>{
    o.addEventListener("click", () =>{
        selected2.innerHTML=o.querySelector("label").innerHTML;
        optionsContainer2.classList.remove('active');
    });
});
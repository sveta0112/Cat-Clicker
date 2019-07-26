//model
const model = [
    {
        name: 'Murka',
        img: './img/cat1.jpeg',
        count: 0,
        selected: false
    },
    {
        name: 'Tishka',
        img: './img/cat2.jpeg',
        count: 0,
        selected: false
    },
    {
        name: 'Gena',
        img: './img/cat3.jpeg',
        count: 0,
        selected: false
    },
    {
        name: 'Cheburashka',
        img: './img/cat4.jpeg',
        count: 0,
        selected: false
    },
    {
        name: 'Alyssa',
        img: './img/cat5.jpeg',
        count: 0,
        selected: false
    }

];


//View
const catView = (function(){
    const catDisplay = document.querySelector('.entry-body');
    const adminBtn = document.querySelector('.admin-btn');
    const hiddenAdminElements = document.querySelectorAll('.hidden');
    const cancelBtn = document.querySelector('.cancel-btn');
    const catName= document.querySelector('#cat_name');
    const catImg = document.querySelector('#cat_img');
    const clickCoutn = document.querySelector('#cat_click_count');
    const submitBtn = document.querySelector('.submit-btn');

    function init() {
        catDisplay.addEventListener('click', octopus.catWasClicked);
        adminBtn.addEventListener('click', _toggleAdminElements);
        cancelBtn.addEventListener('click', function(event) {
            event.preventDefault();
            _toggleAdminElements();
        });
        submitBtn.addEventListener('click', function(event) {
            event.preventDefault();
            octopus.changeCurrentCat(catName.value, catImg.value, clickCoutn.value);
        });
    }
    function render(cat) {
        catDisplay.innerHTML = `
            <h2 class="cat-name">${cat.name}</h2>
            <img class='cat_img' src='${cat.img}' width='300' height='300'>
            <h2>Clicked: <span class="click-count">${cat.count}</span></h2>
        `;
        _fillAdminForm(cat);
    }

    function _toggleAdminElements() {
        hiddenAdminElements.forEach((element)=> element.classList.toggle('hidden'));
    }

    function _fillAdminForm(cat) {
        catName.value = cat.name;
        catImg.value = cat.img;
        clickCoutn.value = cat.count;
    }

    return {
        init: init,
        render: render
    }
    
})();


const listView = (function(){
    const listDisplay = document.querySelector('.kitty_list');


    function init() {
        listDisplay.addEventListener('click', function(e){
            octopus.updateCurrentCat(e.target.textContent);
            //console.log(e.target.textContent);
        });
    }

    function render(cats) {
        listDisplay.innerHTML= '';
        cats.forEach(cat => {
            listDisplay.innerHTML += '<li class="each_cat '+( cat.selected ? 'each_cat_selected':'')+'">'+cat.name+'</li>';
        });
    }

    return {
        init: init,
        render: render
    }
})();




//Octopus
const octopus = (function(){
    let selectedCat = model[0];

    function init() {
        selectedCat.selected = true;
        catView.init();
        listView.init();
        catView.render(selectedCat);
        listView.render(model);
    }

    function catWasClicked() {
        selectedCat.count++;
        catView.render(selectedCat);
    }

    function updateCurrentCat(name) {
        selectedCat.selected = false;
        selectedCat = model.find(cat => {
            return cat.name === name;
        });
        selectedCat.selected = true;
        listView.render(model);
        catView.render(selectedCat);
    }

    function changeCurrentCat(name, img, count) {
        selectedCat.name = name;
        selectedCat.img = img;
        selectedCat.count = count;

        catView.render(selectedCat);
        listView.render(model);
    }

    return {
        init: init,
        catWasClicked: catWasClicked,
        updateCurrentCat: updateCurrentCat,
        changeCurrentCat: changeCurrentCat
    }
})();

document.addEventListener('DOMContentLoaded', octopus.init);
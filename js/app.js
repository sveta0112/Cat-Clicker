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

    function init() {
        catDisplay.addEventListener('click', octopus.catWasClicked);
    }
    function render(cat) {
        catDisplay.innerHTML = `
            <h2 class="cat-name">${cat.name}</h2>
            <img src="${cat.img}" class="cat-img">
            <h2>Clicked: <span class="click-count">${cat.count}</span></h2>
        `;
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

    return {
        init: init,
        catWasClicked: catWasClicked,
        updateCurrentCat: updateCurrentCat
    }
})();

document.addEventListener('DOMContentLoaded', octopus.init);
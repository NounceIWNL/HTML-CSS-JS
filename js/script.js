var previous = document.getElementById('btnPrevious')
var next = document.getElementById('btnNext')
var gallery = document.getElementById('image-gallery')
var pageIndicator = document.getElementById('page')
var galleryDots = document.getElementById('gallery-dots');

var images = [];
for (var i = 1; i <= 14; i++) {
    images.push({
        title: "Image " + i,
        source: "img/im" + i + ".jpg"
    });
}
images[0].title = "Летний амфитеатр";
images[1].title = "Синий дом";
images[2].title = "Кировский мост";
images[3].title = "Княгиня Ольга";
images[4].title = "Усадьба Здравнево";
images[5].title = "Ратуша";
images[6].title = "Дом Шагала";
images[7].title = "Западная Двина";
images[8].title = "Театр Якуба Коласа";
images[9].title = "Площадь Победы";
images[10].title = "Памятник Ольгерду";
images[11].title = "Успенский собор";
images[12].title = "Памятник героям Отечественной войны";
images[13].title = "Марк Шагал";

/*
    Дом Шагала
    Княгиня Ольга
    Марк Шагал
    Кировский мост
    Ратуша
    Западная Двина
    Летний амфитеатр
    Усадьба Здравнево
    Площадь Победы
    Театр Якуба Коласа
    Успенский собор
    Покровский собор
    Памятник Ольгерду
    Памятник героям Отечественной войны
*/

var perPage = 3;
var page = 1;
var pages = Math.ceil(images.length / perPage)


// Gallery dots
for (var i = 0; i < pages; i++) {
    var dot = document.createElement('button')
    var dotSpan = document.createElement('span')
    var dotNumber = document.createTextNode(i + 1)
    dot.classList.add('gallery-dot');
    dot.setAttribute('data-index', i);
    dotSpan.classList.add('sr-only');

    dotSpan.appendChild(dotNumber);
    dot.appendChild(dotSpan)

    dot.addEventListener('click', function (e) {
        var self =
            e.target

        goToPage(self.getAttribute('data-index'))
    })

    galleryDots.appendChild(dot)
}

// Previous Button
previous.addEventListener('click', function () {
    if (page === 1) {
        page = 1;
    } else {
        page--;
        showImages();
    }
})

// Next Button
next.addEventListener('click', function () {
    if (page < pages) {
        page++;
        showImages();
    }
})

// Jump to page
function goToPage(index) {
    index = parseInt(index);
    page = index + 1;

    showImages();
}

// Load images
function showImages() {
    while (gallery.firstChild) gallery.removeChild(gallery.firstChild)

    var offset = (page - 1) * perPage;
    var dots = document.querySelectorAll('.gallery-dot');

    for (var i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    dots[page - 1].classList.add('active');

    for (var i = offset; i < offset + perPage; i++) {
        if (images[i]) {
            var template = document.createElement('div');
            var title = document.createElement('p');
            var titleText = document.createTextNode(images[i].title);
            var img = document.createElement('img'); //<img src="" alt="" class="image0"/>

            template.classList.add('template');
            img.setAttribute("src", images[i].source);
            img.setAttribute('alt', images[i].title);
            img.setAttribute("class", "image" + i);

            title.appendChild(titleText);
            template.appendChild(img);
            template.appendChild(title);
            gallery.appendChild(template);
        }
    }

    // Animate images
    var galleryItems = document.querySelectorAll('.template')
    for (var i = 0; i < galleryItems.length; i++) {
        var onAnimateItemIn = animateItemIn(i);
        setTimeout(onAnimateItemIn, i * 100);
    }

    function animateItemIn(i) {
        var item = galleryItems[i];
        return function () {
            item.classList.add('animate');
        }
    }

    // Update page indicator
    pageIndicator.textContent = "Page " + page + " of " + pages;

}

showImages(); 
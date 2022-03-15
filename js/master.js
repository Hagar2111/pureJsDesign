//Settings Sidebar

//toggle spin class icon
document.querySelector(".toggle-settings .set-icon").onclick = function() {

    //Toggle class Fa-spin for Rotation on self
    this.classList.toggle("fa-spin");

    //Toggle class open on main settings box
    document.querySelector(".settings-box").classList.toggle("open");

};

//Check If there's local storage color option
let mainColors = localStorage.getItem("color_option");

if(mainColors !== null){

    document.documentElement.style.setProperty('--main-color', mainColors);

        //Remove active class from all colors list Item
        document.querySelectorAll(".colors-list li").forEach(element => {

            element.classList.remove("active");

             //Add Active class on Element with Data-color == Local Storage Item
            if(element.style.backgroundColor === mainColors){
                
                //Add active class
                element.classList.add("active");
            }
        });

}
//Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

//Loop on all list Items
colorLi.forEach(li => {

    //Loop on Every List Items
    li.addEventListener("click", (e) => {

        // Set color on root
        document.documentElement.style.setProperty('--main-color', e.target.style.backgroundColor);

        //Set color on Local Storage
        localStorage.setItem("color_option", e.target.style.backgroundColor);

        handleActive(e);
    });
});


//Random Background Option
let backgroundOption = true;

//Variable to control the background interval
let backgroundInterval;

//check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");


//remove all active class from spans
document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active");
    }); 

//check if random background local storage is not empty
if(backgroundLocalItem !== null){
    if(backgroundLocalItem === 'true') {

        backgroundOption = true;

        document.querySelector(".random-backgrounds .yes").classList.add("active");

    }else{

        backgroundOption = false;

        document.querySelector(".random-backgrounds .no").classList.add("active");

    }

}else{
    randomizeImgs();

    document.querySelector(".random-backgrounds .yes").classList.add("active");
}
//Switch random backgrounds option
const randomBackgroundsEl = document.querySelectorAll(".random-backgrounds span");

//Loop on all spans
randomBackgroundsEl.forEach(span => {

    //Loop on Every span
    span.addEventListener("click", (e) => {

        handleActive(e);

        if(e.target.dataset.background === 'yes'){

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);

        } else {
            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);

        }
    });
});


//Select Landing page element
let landingPage = document.querySelector(".landing-page");

//Get Array of imgs
let imgsArray = ["1-bg.jpg", "2-bg.jpg", "3-bg.jpg", "4-bg.jpg", "5-bg.jpg"];

//Function to randomize image
function randomizeImgs(){

    if(backgroundOption === true){

        backgroundInterval = setInterval(() => {

            //Get random number
            let randomNumber = Math.ceil(Math.random() * imgsArray.length);
        
            //change background image Url
            landingPage.style.backgroundImage = `url("imgs/${randomNumber}-bg.jpg")`;
        }, 1000);
    }
    
}


//Reset Button
document.querySelector(".reset-options").onclick = function () {

    //localStorage.clear();

    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color_option");

    //reload window
    window.location.reload();
};

//Side Bullets

//select all bullets 
const allBullets = document.querySelectorAll('.nav-bullets .bullet');

//select all links 
const allLinks = document.querySelectorAll('.links a');

function scrolling(elements){

elements.forEach(ele => {
    
    ele.addEventListener("click", (e) => {

        e.preventDefault();

        let targetSection = document.querySelector(e.target.dataset.section);

        targetSection.scrollIntoView({

            behavior: "smooth"
        });
    });
});

}
scrolling(allBullets);
scrolling(allLinks);

//Handle Active state
function handleActive(ev){

    //Remove active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");
    });

    //Add Active class on Self
    ev.target.classList.add("active");
}

let bulletSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null){

bulletSpan.forEach(span => {

    span.classList.remove("active");
});

if(bulletLocalItem === 'block'){

    bulletsContainer.style.display = 'block';

    document.querySelector(".bullets-option .yes").classList.add("active");

}else{

    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
}
}

bulletSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if(span.dataset.display === "show"){

            bulletsContainer.style.display = "block";

            localStorage.setItem("bullets-option", "block");

        }else{

            bulletsContainer.style.display = "none";

            localStorage.setItem("bullets-option", "none");

        }

        handleActive(e);
    });
});

//Side Navbar Responsive Menu

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    //Stop Propagation
    e.stopPropagation();

    //Toggle Class "menu-active" on button
    this.classList.toggle("menu-active");

    //Toggle class "open" on links
    tlinks.classList.toggle("open");
};

//click anywhere outside menu and toggle
document.addEventListener("click", (e) => {

    if(e.target !== toggleBtn && e.target !== tlinks){

        //Check If menu is open
        if(tlinks.classList.contains("open")){

            //Toggle Class "menu-active" on button
            toggleBtn.classList.toggle("menu-active");

            //Toggle class "open" on links
            tlinks.classList.toggle("open");
        }
    }
});

//Stop Propagation on menu
tlinks.onclick = function(e) {

    e.stopPropagation();
}

//Skills Section

//select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    //Skills offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    //Skills Outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window Height
    let windowHeight = this.innerHeight;

    //Window ScrollTop
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
}; 

//Gallery Section

//Create Popup with the Image
let ourGallery = document.querySelectorAll(".gallery img");
let imgs = Array.from(document.querySelectorAll(".gallery img"));
let currentIndex = 0;

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        //Create Overlay Element
        let overlay = document.createElement("div");

        //Add Class To Overlay
        overlay.className = 'popup-overlay';

        //Append overlay to body
        document.body.appendChild(overlay);

        //Create the Popup Box
        let popupBox = document.createElement("div");

        //Add Class to the popup box
        popupBox.className = 'popup-box';

        //Create The Image
        let popupImage = document.createElement("img");

        //Set Image Source
        popupImage.src = img.src;

        //Add Image to popup Box
        popupBox.appendChild(popupImage);

        //Append the popup Box to Body
        document.body.appendChild(popupBox);

        //Create the close span
        let closeButton = document.createElement("span");

        //Create the close button text
        let closeButtonText = document.createTextNode("X");

        //Append Text to Close button
        closeButton.appendChild(closeButtonText);

        //Add class to the close button
        closeButton.className = 'close-button';

        //Add close button to the popup box
        popupBox.appendChild(closeButton);

        //Create Previous button
        let prevBtn = document.createElement("i");

        //Add class to prev Button
        prevBtn.className = 'far ';
        prevBtn.classList.add('fa-arrow-alt-circle-left');

        //Add Id to prev Button 
        prevBtn.id = 'prev';

        //Add previous Button to popup box
        popupBox.appendChild(prevBtn);

        //Create next button
        let nextBtn = document.createElement("i");

        //Add class to next Button
        nextBtn.className = 'far ';
        nextBtn.classList.add('fa-arrow-alt-circle-right');

        //Add Id to next Button 
        nextBtn.id = 'next';

        //Add next Button to popup box
        popupBox.appendChild(nextBtn);

        //index of clicked item
        currentIndex = imgs.indexOf(e.target);

        nextBtn.addEventListener("click", function (e) {

            currentIndex++;
    
            if(currentIndex == imgs.length){
    
                currentIndex = 0 ;
            }
    
            let imgSrc = imgs[currentIndex].getAttribute("src");
    
            //Set Image Source
            popupImage.src = imgSrc;
        
        });

        prevBtn.addEventListener("click", function (e) {

            currentIndex--;
    
            if(currentIndex < 0 ){
    
                currentIndex = imgs.length - 1 ;
            }
    
            let imgSrc = imgs[currentIndex].getAttribute("src");

            //Set Image Source
            popupImage.src = imgSrc;
        
        });
    });

});

//Close Popup
document.addEventListener("click", function(e){

    if(e.target.className == 'close-button'){

        //Remove the current popup
        e.target.parentNode.remove();

        //Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

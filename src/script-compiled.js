"use strict";

$(document).ready(script(document.cookie === "" ? navigator.language : document.cookie));

function script(lang) {

    document.cookie = "";

    var en;
    var jsonFile;
    if (lang.substr(0, 2) === "es") {
        jsonFile = "data_es.json";
        en = false;
    } else {
        jsonFile = "data_en.json";
        en = true;
    }

    var navLabels;
    if (en) {
        navLabels = ["bio", "experience", "skills", "education"];
    } else {
        navLabels = ["bio", "experiencia", "lenguajes", "educacion"];
    }

    var trans = {
        bio: "bio",
        experiencia: "experience",
        lenguajes: "skills",
        educacion: "education",
    };

    function isMobile() {
        return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        );
    }

    function isPhone() {
        return (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        );
    }

    var education = new Image();
    var bio = new Image();
    var experience = new Image();
    var skills = new Image();
    var blog = new Image();

    $("#content").children().hide();
    setPage(document.getElementById("page-title").innerHTML);

    document.getElementById("menu-btn").addEventListener("click", function () {
        document.getElementById("hidden-menu").style.left = "0";
        document.getElementsByTagName("BODY")[0].style.overflow = "hidden";
    });

    document.getElementById("close").addEventListener("click", function () {
        closeHiddenMenu();
    });

    $(".hidden-menu-item").on("click", closeHiddenMenu);

    function closeHiddenMenu() {
        document.getElementById("hidden-menu").style.left = "100%";
        document.getElementsByTagName("BODY")[0].style.overflow = "scroll";
    }

    var data = function () {
        $.ajax({
            'async': false,
            'global': false,
            'url': jsonFile,
            'dataType': 'json',
            'success': function success(response) {
                data = response;
            }
        });
        return data;
    }();

    var loadImgs = new Promise(function (resolve, reject) {
        bio.src = 'img/bio.jpg';
        experience.src = 'img/experience.jpg';
        skills.src = 'img/skills.jpg';
        blog.src = 'img/blog_post.jpg';
        education.onload = function () {
            resolve();
        };
        education.src = 'img/education.jpg';
    });

    loadImgs.then(function () {
        setTimeout(function () {
            return $("#loading").fadeOut();
        }, 1000);
    });

    var navItems = document.getElementsByClassName("nav-item");
    var hiddenMenuItems = document.getElementsByClassName("hidden-menu-item");

    for (var i = 0; i < navItems.length; i++) {
        navItems[navItems.length - 1 - i].firstChild.innerHTML = navLabels[i];
        hiddenMenuItems[i].firstChild.innerHTML = navLabels[i];
    }

    document.getElementById("language-container").childNodes[3].innerHTML = lang === "en-US" ? "idioma" : "Language";

    $("#language-list a").on("click", function(e){
        document.cookie = e.target.getAttribute("id");
        location.reload();
    });

    document.querySelector("#language-container > a").addEventListener("click", function(e){
        e.stopPropagation();
        $("#language-list").toggleClass("language-up");
        console.log(document.getElementById("language-list").classList[0]);
        if(document.getElementById("language-list").classList[0] === "language-up"){
            document.addEventListener("click", function(){
                $("#language-list").removeClass("language-up");
            });
            
        }
    });

    $("#bio").children().last().html(data.bio);

    function hidePhoneNumber() {
        $("#phone-number-container").css({
            "display": "none"
        });
        $("#phone-number").css({
            "top": "100%",
            "transform": "translate(-50%,0)"
        });
    }

    if (isPhone()) {
        $("#phone").attr("href", "tel:00584142436711");
    } else {
        $("#phone-number a").on("click", function () {
            hidePhoneNumber();
        });

        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                hidePhoneNumber();
            }
        });

        $("#phone").on("click", function () {
            $("#phone-number-container").fadeIn();
            $("#phone-number").css({
                "top": "50%",
                "transform": "translate(-50%,-50%)"
            });
        });
    }

    function Project(title, language, description, imageSrc, imageAlt, url) {

        var project = document.createElement("DIV");
        var imgTag = document.createElement("IMG");
        var projMain = document.createElement("DIV");
        var projTitle = document.createElement("P");
        var projLang = document.createElement("SPAN");
        var projDesc = document.createElement("P");

        project.classList.add("project");

        imgTag.setAttribute("src", imageSrc);
        imgTag.setAttribute("alt", imageAlt);

        projMain.classList.add("project-main");

        projTitle.classList.add("project-title");
        projTitle.innerHTML = title;

        projLang.classList.add("language");
        projLang.innerHTML = language;

        projDesc.classList.add("project-desc");
        projDesc.innerHTML = description;

        projMain.appendChild(projTitle);
        projMain.appendChild(projLang);

        project.appendChild(imgTag);
        project.appendChild(projMain);
        project.appendChild(projDesc);

        if (!isMobile()) {
            project.addEventListener("click", function () {
                window.open(url, '_blank');
            });
        }

        return project;
    }

    function fillSkills(skillArr) {

        var skillContainer = document.getElementById("skills");

        function figures(set) {
            var skillSet = document.createElement("DIV");
            skillSet.classList.add("skill-list");
            //LENGUAJES
            for (var i = 0; i < set.skillList.length; i++) {
                var figure = document.createElement("FIGURE");
                var image = document.createElement("IMG");
                var figcaption = document.createElement("FIGCAPTION");

                image.setAttribute("src", set.skillList[i].imgSrc);
                image.setAttribute("alt", set.skillList[i].imgAlt);

                figcaption.innerHTML = set.skillList[i].figCaption;

                figure.appendChild(image);
                figure.appendChild(figcaption);

                skillSet.appendChild(figure);
            }

            return skillSet;
        }

        //TIPO DE HABILIDAD
        for (var i = 0; i < skillArr.length; i++) {

            var someSkill = document.createElement("DIV");
            var skillType = document.createElement("P");

            someSkill.classList.add("skill");

            skillType.classList.add("skill-type");

            skillType.innerHTML = skillArr[i].skillType;

            someSkill.appendChild(skillType);
            someSkill.appendChild(document.createElement("HR"));
            someSkill.appendChild(figures(skillArr[i]));

            skillContainer.appendChild(someSkill);
        }
    }

    var pageTitle = document.getElementById("page-title");
    var header = document.getElementsByTagName("HEADER")[0];

    $(header).css({
        "background-image": "url(img/" + document.querySelector("#page-title").innerHTML + ".jpg)",
        "transition": "background-image .5s ease"
    });

    $.each($(".nav-item,.hidden-menu-item"), function (index, elem) {
        elem.addEventListener("click", function () {
            if (elem.innerHTML !== getValueByLanguage(pageTitle.innerHTML)) {
                $("#page-title").fadeOut();
                $("#" + getValueByLanguage(pageTitle.innerHTML).toLowerCase()).fadeOut();
                setTimeout(function () {
                    pageTitle.innerHTML = elem.firstChild.innerHTML;
                    $("#page-title").fadeIn();
                    setPage(pageTitle.innerHTML);

                    $(header).css({
                        "background-image": "url(" + eval(getValueByLanguage(document.querySelector("#page-title").innerHTML.toLowerCase())).src + ")",
                        "transition": "background-image .5s ease"
                    });
                }, 500);
            }
        });
    });

    function getValueByLanguage(key) {
        if (!en) {
            key = trans[key];
        }
        return key;
    }

    function setPage(title) {
        $("#" + getValueByLanguage(title).toLowerCase()).fadeIn();
    }

    document.querySelector("#experience p").innerHTML = data.experience.p;

    var projects = document.getElementById("projects");
    var projectList = data.experience.projects;
    for (var i = 0; i < projectList.length; i++) {
        projects.appendChild(new Project(projectList[i].title, projectList[i].language, projectList[i].description, projectList[i].imgSrc, projectList[i].imgAlt, projectList[i].url));
    }

    fillSkills(data.skills);
};

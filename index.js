function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on m obile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

init();

var cursor = document.querySelector(".cursor");

var main = document.querySelector(".main");

document.addEventListener("mousemove", function (dets) {
  // console.log("hey");
  cursor.style.left = dets.x + 20 + "px";
  cursor.style.top = dets.y + 20 + "px";
});

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    markers: true,
    start: "top 27%",
    end: "top 0",
    scrub: 3,
  },
});

tl.to(
  ".page1 h1",
  {
    x: -100,
  },
  "anim"
);

tl.to(
  ".page1 h2",
  {
    x: 20,
  },
  "anim"
);

tl.to(
  ".page1 video",
  {
    width: "90%",
    height: "800px",
  },
  "anim"
);

var tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    markers: true,
    start: "top -90%",
    end: "top -100%",
    scrub: 3,
  },
});
tl2.to(".main", {
  backgroundColor: "#fff",
});

var tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    markers: true,
    start: "top -430%",
    end: "top -450%",
    scrub: 3,
  },
});

tl3.to(".main", {
  backgroundColor: "#0F0D0D",
});

var boxes = document.querySelectorAll(".box");
boxes.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    var att = elem.getAttribute("data-image");
    cursor.style.width = "300px";
    cursor.style.height = "250px";
    cursor.style.borderRadius = "0";
    cursor.style.backgroundImage = `url(${att})`;
  });
  elem.addEventListener("mouseleave", function () {
    elem.style.backgroundColor = "transparent";
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.borderRadius = "50%";
    cursor.style.backgroundImage = `none`;
  });
});

var h4 = document.querySelectorAll("#nav h4");
var purple = document.querySelector("#purple");
h4.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    purple.style.display = "block";
    // purple.style.alignItems = "center";
    // purple.style.justifyContent = "center";
    purple.style.opacity = "1";
    var tag = document.createElement("marquee");
    tag.style.fontSize = "3rem";
    tag.style.marginTop = "15rem";
    var text = document.createTextNode(`${elem.textContent}`);
    tag.appendChild(text);
    var element = document.getElementById("purple");
    element.appendChild(tag);
    console.log(elem);
  });
  elem.addEventListener("mouseleave", function () {
    purple.style.display = "none";
    purple.style.opacity = "0";
  });
});

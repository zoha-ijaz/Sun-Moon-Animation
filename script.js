const scene = document.querySelector(".scene");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const body = document.body;
const clouds = document.querySelectorAll(".cloud-part");
window.addEventListener("load", () => {
    gsap.from(".sunny-moony, .clouds", { opacity: 0, y: 50, duration: 1.5, ease: "power2.out" });
});
gsap.to(".cloud-part", {
    y: 10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});
const addHoverEffect = (element) => {
    element.addEventListener("mouseenter", () => {
        gsap.to(element, { filter: "drop-shadow(0 0 20px rgba(255,255,255,0.7))", scale: 1.05, duration: 0.3 });
    });
    element.addEventListener("mouseleave", () => {
        gsap.to(element, { filter: "drop-shadow(0 0 0px transparent)", scale: 1, duration: 0.3 });
    });
};
addHoverEffect(sun);
addHoverEffect(moon);
const starContainer = document.createElement("div");
starContainer.id = "star-container";
document.body.appendChild(starContainer);
gsap.set(moon, { opacity: 0, scale: 0, transformOrigin: "center" });
function createStars() {
    for (let i = 0; i < 20; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 80 + "vh";
        starContainer.appendChild(star);
    }
    gsap.fromTo(".star", { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.1 });
}
scene.addEventListener("click", () => {
    gsap.to(".sunny-moony", { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
    body.classList.toggle("dark-mode");
    const isDarkMode = body.classList.contains("dark-mode");
    if (isDarkMode) {
        gsap.to(sun, { opacity: 0, scale: 0, duration: 0.8, ease: "power2.inOut" });
        gsap.to(moon, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" });
        gsap.to(clouds, { backgroundColor: "var(--cloud-night)", duration: 0.5, stagger: 0.1 });
        createStars();
    } else {
        gsap.to(moon, { opacity: 0, scale: 0, duration: 0.8, ease: "power2.inOut" });
        gsap.to(sun, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" });
        gsap.to(clouds, { backgroundColor: "var(--cloud-white)", duration: 0.5, stagger: 0.1 });
        gsap.to(".star", { opacity: 0, duration: 0.5, onComplete: () => starContainer.innerHTML = "" });
    }
});
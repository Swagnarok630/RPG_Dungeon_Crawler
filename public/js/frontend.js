// example frontend js file loaded into the views that need FE logic (clicks, forms, interactions, etc.)
document.addEventListener("keyup", moveChar)
console.log('frontend.js loaded');

//do other frontend stuff here!


function moveChar(e) {
    switch (e.key) {
        case "ArrowLeft":
            console.log("moved left")
            break
        case "ArrowRight":
            console.log("moved right")
            break
        case "ArrowUp":
            console.log("moved up")
            break
        case "ArrowDown":
            console.log("moved down")
            break
    }
}

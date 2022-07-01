document.addEventListener("keyup", moveChar)

module.exports = {
    //this useless example helper fuction returns 'example helper output' string everytime it's called
    moveChar: (e) => {
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
    },
};


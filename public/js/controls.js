

let gameData;

async function getMeData(){
    //get user-charid
    const userCharId = location.pathname.split("/").slice(-1)[0];
    console.log(userCharId)
    const res = await fetch(`/api/game/gamedata/${userCharId}`);
    const data = await res.json();
    console.log("DATA", data)
    gameData = data
}

getMeData()

async function uploadData(start) {
    const dataToSave = gameData
    const userCharId = dataToSave.character.id
    // const id = dataToSave.map.id
    // const name = dataToSave.map.name
    // const map = dataToSave.map.map
    // const char_id = dataToSave.map.char_id
    console.log ("THIS IS dataToSave -- ", dataToSave)
    const res = await fetch(`/api/game/gamedata/${userCharId}`, {
        method: "PUT",
        body: JSON.stringify({ userCharId, start, newCoord:dataToSave.map.newCoord }),
        headers: { 'Content-Type': 'application/json' },
    });
    const newData = await res.json();
    console.log("NEWDATA", newData)
    location.reload()
    exited()
}

const moveUp = async () => {
    //need to check if y-1, x is a path
    const start0 = gameData.map.start[0];
    const start1 = gameData.map.start[1];
    //if path, move to it, check if item or enemy
    //item or enemy logic here if applies

    //else just change location
    let newCoord = gameData.map.start;
    if(gameData.map.map[newCoord[1] - 1].cols[newCoord[0]].isPath === true) {
        newCoord[1] = newCoord[1] - 1;
        gameData.map.newCoord = newCoord
        console.log("moved -- ", gameData.map.start)
        console.log("extra data -- ", gameData)
        uploadData([start0, start1])

    }else{
        console.log("unmoved -- ", gameData.map.start)
    }

//     if (map.start === map.items[0]) {
//         switch (map.items[0].name) {
//             case "Health":
//                 data.character.hitpoints += 15
//                 break
//             case "Mana":
//                 data.character.manapoints += 15
//                 break
//             case "Double":
//                 data.character.hitpoints += 15
//                 data.character.manapoints += 15
//                 break
//             default:
//                 break
//         }
//     }else{
//     }
//     if (map.start === map.items[1]) {
//         switch (map.items[0].name) {
//             case "Health":
//                 data.character.hitpoints += 15
//                 break
//             case "Mana":
//                 data.character.manapoints += 15
//                 break
//             case "Double":
//                 data.character.hitpoints += 15
//                 data.character.manapoints += 15
//                 break
//             default:
//                 break
//         }
//     }else{
//     }

//     if (map.start === map.enemies[0]) {
//         start an encounter in the encounter view? 
//     }else{
//     if (map.start === map.enemies[1]) {
//         // Load up encounter view?
//     }else{

//     }
// }
}

const moveLeft = async () => {
    console.log(gameData)
    const start0 = gameData.map.start[0];
    const start1 = gameData.map.start[1];

    //else just change locationlet newCoord = gameData.map.start;
    let newCoord = gameData.map.start;
    if(gameData.map.map[newCoord[1]].cols[newCoord[0] - 1].isPath === true) {
        newCoord[0] = newCoord[0] - 1;
        gameData.map.newCoord = newCoord
        console.log("moved -- ", gameData.map.start)
        console.log("extra data -- ", gameData)
        uploadData([start0,start1])
    }else{
        console.log("unmoved -- ", gameData.map.start)
    }
}

const moveRight = async () => {
    console.log(gameData)
    const start0 = gameData.map.start[0];
    const start1 = gameData.map.start[1];
    let newCoord = gameData.map.start;
    if(gameData.map.map[newCoord[1]].cols[newCoord[0] + 1].isPath === true) {
        newCoord[0] = newCoord[0] + 1;
        gameData.map.newCoord = newCoord
        console.log("moved -- ", gameData.map.start)
        console.log("extra data -- ", gameData)
        uploadData([start0, start1])
    }else{
        console.log("unmoved -- ", gameData.map.start)
    }
}

const moveDown = async () => {
    console.log(gameData)
    const start0 = gameData.map.start[0];
    const start1 = gameData.map.start[1];
    let newCoord = gameData.map.start;
    if(gameData.map.map[newCoord[1] + 1].cols[newCoord[0]].isPath === true) {
        newCoord[1] = newCoord[1] + 1;
        gameData.map.newCoord = newCoord
        console.log("moved -- ", gameData.map.start)
        console.log("extra data -- ", gameData)
        uploadData([start0, start1])
    }else{
        console.log("unmoved -- ", gameData.map.start)
    }
}

const exited = async () => {
    if (start === gameData.map.exit) {
        typemodal.style.display = "block";
            // Allows user to click on X button to close modal
            typespan.onclick = function() {
                typemodal.style.display = "none";
            }
            // Allows user to click anywhere outside the modal window to close modal
            window.onclick = function(event) {
                if (event.target == typemodal) {
                    typemodal.style.display = "none";
                }
            }
            document.location.replace('/start');
    }
    
}


// const skill1 = async () => {
//     let enemyStatus = enemy.hitpoints
//     enemy.hitpoints -= data.character.strength

//     enemyStatus = enemy.hitpoints
//     if (enemyStatus <= 0) {
//         // Update text view if possible
//         // Exit out of encounter view
//         // use splice method to remove enemy from array list and rerender map 
//     }
// }


document.querySelector(".up").addEventListener("click", moveUp)
document.querySelector(".left").addEventListener("click", moveLeft)
document.querySelector(".right").addEventListener("click", moveRight)
document.querySelector(".down").addEventListener("click", moveDown)

// document.querySelector(".skill1").addEventListener("click", skill1)
// document.querySelector(".skill2").addEventListener("click", skill2)
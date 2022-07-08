const seed = require("./seed");

(async()=>{
    await seed();
    console.log("SEEDED!");
    process.exit()
}
)()
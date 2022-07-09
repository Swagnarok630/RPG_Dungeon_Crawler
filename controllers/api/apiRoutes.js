const router = require('express').Router();
const { UserChar, Chars, Map } = require("../../models")
const seeder = require("../../seeds/seed")

router.post('/new-char', async (req, res) => {
  console.log("user chose", req.body.value);
  console.log("user id -", req.session.userId);

  //find one in Char table
  //create new3 user-char in db
  const char = await Chars.findOne({ where: { job_class: req.body.value } });
  const charData = { ...char.dataValues };
  delete charData.id;
  console.log(UserChar)
  const newChar = await UserChar.create({ ...charData, user_id: req.session.userId, char_id: char.dataValues.id })
  res.json(newChar)
})

router.post('/super-secret-seeder', async (req, res) => {
  if (req.headers.authorization !== process.env.SUPER_SECRET) return res.json("CANNOT SEED, WRONG CREDENTIALS");
  await seeder();
  res.json("db seeded!")
})

router.get("/gamedata/:usercharId", async (req, res) => {
  const userChar = await UserChar.findByPk(req.params.usercharId);
  const map = await Map.findOne({ where: { char_id: userChar.dataValues.id } });

  res.json({ character: userChar, map: { ...map.dataValues, ...JSON.parse(map.dataValues.map) } })
})

router.put("/gamedata/:usercharId", async (req, res) => {
  const {newCoord, start, userCharId} = req.body
  const userChar = await UserChar.findByPk(userCharId)
  console.log("THIS IS userChar -- ", userChar)
  console.log("THIS IS req.body -- ", req.body)
  const map = await Map.findOne({ where: { char_id: userChar.dataValues.id } });
  // const map = await Map.update({ map: {...map.dataValues} }, {where:{char_id: userChar.dataValues.id}})
  // map.update(
  //     {
  //       id: req.body.userCharId,
  //       name: req.body.name,
  //       map: req.body.map,
  //       char_id: req.body.char_id,
  //     },
  //     {
  //       where: {
  //         char_id: userChar.dataValues.id,
  //       }
  //     }
  //   )
  // console.log("THIS IS map -- ", map)
  // console.log("THIS IS map.dataValues.map -- ", map.dataValues.map)
  // .then((updatedMap) => {
  //   console.log(updatedMap)
  //   res.json({character: userChar, map: {...updatedMap.dataValues, ...JSON.parse(updatedMap.dataValues.map)}}.catch((err) => res.json(err)))
  //   res.render('game', { map: {...updatedMap.dataValues, ...JSON.parse(updatedMap.dataValues.map)}, user: userInfo.dataValues, character: currentChar.dataValues })
  // })
  const mapParsed = JSON.parse(map.dataValues.map);
  mapParsed.start = newCoord;

  console.log("START", mapParsed.map[start[1]].cols[start[0]]);
  console.log("NEW", mapParsed.map[newCoord[1]].cols[newCoord[0]]);
  mapParsed.map[start[1]].cols[start[0]].isStart = false;
  mapParsed.map[newCoord[1]].cols[newCoord[0]].isStart = true;

  await Map.update(
    {
      map: JSON.stringify(mapParsed),
    },
    {
      where: {
        char_id: userChar.dataValues.id,
      }
    }
  );

  console.log("updated map!")
  res.json("ok")
  // console.log(map)
  // const map = await Map.update(start, {where: {char_id: userChar.dataValues.id}});
  // console.log("SOMETHING")
  // console.log("DATA VALUES --- ", map.dataValues)
  // console.log("MAP DATA --- ", map)
  // res.json({character: userChar, map: {...map.dataValues, ...JSON.parse(map.dataValues.map)}}.catch((err) => res.json(err)))
  // res.render('game', { map: {...currentMap.dataValues, ...JSON.parse(currentMap.dataValues.map)}, user: userInfo.dataValues, character: currentChar.dataValues })
})

module.exports = router;
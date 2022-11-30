const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.postFeed = async (req, res, next) => {
  try {
    const db = getDb();
    const user = req.body;

    const result = await db.collection("feeds").insertOne(user);
    if (result.acknowledged) {
      res.status(200).json({
        status: "Successfully Save Data!",
        data: result,
      });
    } else {
      res.status(400).send("Something Wrong!");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getFeeds = async (req, res, next) => {
  try {
    const db = getDb();

    const result = await db.collection("feeds").find({}).toArray();

    if (result) {
      res.status(200).json({
        status: "Data Find success!",
        data: result,
      });
    } else {
      res.status(400).send("Something Wrong!");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteFeed = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params;
    const _id = { _id: ObjectId(id) };
    const result = await db.collection("feeds").deleteOne(_id);
    console.log(result);
    if (result) {
      res.status(200).json({
        status: "Data delete success!",
        data: result,
      });
    } else {
      res.status(400).send("Something Wrong!");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateFeed = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params;
    const updateInfo = req.body;
    console.log(updateInfo);
    const _id = { _id: ObjectId(id) };
    console.log(_id);
    const result = await db.collection("feeds").updateOne(_id, {
      $set: {
        status: updateInfo.status,
      },
    });
    // console.log(result);
    if (result) {
      res.status(200).json({
        status: "Data Update success!",
        data: result,
      });
    } else {
      res.status(400).send("Something Wrong!");
    }
  } catch (error) {
    next(error);
  }
};

const Records = require("../db/models/records");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns response
 * @aggregation pipeline query
 * 1st stage Match
 * 2nd Stage project the totalCount
 * 3rd Stage get Range of total count
 */
const get = async (req, res) => {
  try {
    const { startDate, endDate, minCount, maxCount } = req.body;
    const result = await Records.aggregate([
      {
        $match: {
          $or: [
            {
              createdAt: {
                $gte: new Date(startDate),
              },
            },
            {
              createdAt: {
                $gte: new Date(endDate),
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          key: 1,
          createdAt: 1,
          totalCount: {
            $sum: "$counts",
          },
        },
      },
      {
        $match: {
          totalCount: {
            $gt: minCount,
            $lt: maxCount,
          },
        },
      },
    ]);
    if (result && result.length === 0) {
      return res.status(402).json({
        code: 1,
        msg: "No records found for given query",
      });
    }
    return res.status(200).json({
      code: 0,
      msg: "Success",
      records: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 3,
      msg: "internal error",
    });
  }
};

module.exports = {
  get,
};

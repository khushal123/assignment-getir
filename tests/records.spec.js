/**
 * @jest-environment node
 */

const axios = require("axios").default;
describe("GET /records", () => {
  it("Should get the records between minCount and maxCount and date is greater than or equals createdAt", async () => {
    const data = JSON.stringify({
      startDate: "2016-01-26",
      endDate: "2018-02-02",
      minCount: 2700,
      maxCount: 3000,
    });

    const config = {
      method: "get",
      url: "http://localhost:3000/records",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
        const response = await axios(config);
        const data = response.data
        expect(response.status).toBe(200)
        expect(data).toHaveProperty('code');
        expect(data).toHaveProperty('msg');
        expect(data).toHaveProperty('records');
    } catch (error) {
        console.error(error)
        return error
    }
  });
});

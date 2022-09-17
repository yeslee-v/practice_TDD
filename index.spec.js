const request = require("supertest");
const should = require("should");
const app = require("./index");

describe("GET /users는", () => {
  describe("Success", () => {
    it("Response user object array", (done) => {
      request(app)
        .get("/users")
        // .expect(400)
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done(); // async
        });
    });
    it("Response max limited", (done) => {
      request(app)
        .get("/users?limit=2")
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done(); // async
        });
    });
  });
  describe("Fail", () => {
    it("Response 400 if limit is not integer", (done) => {
      request(app).get("/users?limit=two").expect(400).end(done);
    });
  });
});

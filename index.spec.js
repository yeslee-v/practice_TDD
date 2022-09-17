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

describe("GET /users/1은", () => {
  describe("Success", () => {
    it("Response object that id is 1", (done) => {
      request(app)
        .get("/users/1")
        .end((err, res) => {
          res.body.should.have.property("id", 1);
          done();
        });
    });
  });
  describe("Fail", () => {
    it("Response if id is not integer", (done) => {
      request(app).get("/users/one").expect(400).end(done);
    });
    it("Response if user does not exist", (done) => {
      request(app).get("/users/4").expect(404).end(done);
    });
  });
});

describe("DELETE /users/1은", () => {
  describe("Sucess", () => {
    it("Response 204", (done) => {
      request(app).delete("/users/1").expect(204).end(done);
    });
  });
  describe("Fail", () => {
    it("Response if id is not integer", (done) => {
      request(app).delete("/users/one").expect(400).end(done);
    });
  });
});

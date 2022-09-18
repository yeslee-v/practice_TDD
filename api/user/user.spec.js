// test code

const request = require("supertest");
const should = require("should");
const app = require("../../index");

describe("GET /users", () => {
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

describe("GET /users/:id", () => {
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

describe("DELETE /users/:id", () => {
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

describe("POST /users", () => {
  describe("Success", () => {
    let name = "daniel",
      body;
    before((done) => {
      request(app)
        .post("/users")
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });
    it("Response created user object", () => {
      body.should.have.property("id");
    });
    it("Response inputted name", () => {
      body.should.have.property("name", name);
    });
  });
  describe("Fail", () => {
    it("Response 400 if name is not provided", (done) => {
      request(app).post("/users").send({}).expect(400).end(done);
    });
    it("Response 409 if name is duplicated", (done) => {
      request(app)
        .post("/users")
        .send({ name: "daniel" }) // Delete method에서 1번을 삭제해서 alice를 넣으면 create되어 201이 나온다
        .expect(409)
        .end(done);
    });
  });
});

describe("PUT /users/:id", () => {
  describe("Success", () => {
    it("Response updated user object", (done) => {
      const name = "chally";
      request(app)
        .put("/users/3")
        .send({ name })
        .end((err, res) => {
          res.body.should.have.property("name", name);
          done();
        });
    });
  });
  describe("Fail", () => {
    it("Response 400 if id is not integer", (done) => {
      request(app).put("/users/one").expect(400).end(done);
    });
    it("Response 400 if name is not provided", (done) => {
      request(app).put("/users/1").send({}).expect(400).end(done);
    });
    it("Response 404 if user does not exist", (done) => {
      // send method가 없으면 name이 없다고 간주하여 400이 나온다
      request(app).put("/users/4").send({ name: "foo" }).expect(404).end(done);
    });
    it("Response 409 if name is duplicated", (done) => {
      request(app)
        .put("/users/3")
        .send({ name: "bek" }) // bek으로 할 때는 되는데 chris로 할 때는 안되는지 모르겠다
        .expect(409)
        .end(done);
    });
  });
});

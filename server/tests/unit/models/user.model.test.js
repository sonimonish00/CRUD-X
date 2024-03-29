import { faker } from "@faker-js/faker";
import { User } from "../../../app/models/user.model.js";

describe("User model", () => {
  describe("User validation", () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
      };
    });
    test("should correctly validate a valid user", async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });
  });
});

/* Reference Links, Code & Info [#User Module Related]
    - Filename convention : Mocha -> a.spec.js | Jest -> a.test.js
    - NOTE : Used JEST and Supertest
    - FLOW : Jest test cases -> Coverall (package.json) -> Travis CI (Build System ~> .travis.yml)
    - [TODO] : Coveralls and travis CI (Have created A/C online for both of them)
    - https://github.com/hagopj13/node-express-boilerplate/blob/master/tests/unit/models/user.model.test.js
    - common global fn (Doesn't need importing) - Mocha, Chai, Jasmine, Jest, SuperTest
      `describe`: Groups related tests together.
      `it` or `test`: Defines a test case.
      `beforeEach`: Runs a fn. before each test in a describe block.
      `afterEach`: Runs a fn. after each test in a describe block.
      `beforeAll`: Runs a fn. before all tests in a describe block.
      `afterAll`: Runs a fn. after all tests in a describe block.
      `expect` or `assert`: Makes assertions about the behavior of the code being tested.
*/

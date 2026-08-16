

const BASE_URL = "https://www.saucedemo.com/";

function login(username, password) {
  cy.visit(BASE_URL);
  cy.get("#user-name").clear().type(username);
  cy.get("#password").clear().type(password);
  cy.get("#login-button").click();
}

describe("SauceDemo Login", () => {

  // positive test case
  it("TC-LOGIN-01: logs in successfully with valid credentials", () => {
    login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("have.text", "Products");
  });

// negative test cases

  it("TC-LOGIN-02: shows error for invalid username", () => {
    login("invalid_user", "secret_sauce");
    cy.get("[data-test='error']").should("contain.text", "do not match any user");
    cy.url().should("not.include", "/inventory.html");
  });

  it("TC-LOGIN-03: shows error for invalid password", () => {
    login("standard_user", "wrong_password");
    cy.get("[data-test='error']").should("contain.text", "do not match any user");
    cy.url().should("not.include", "/inventory.html");
  });

  it("TC-LOGIN-04: shows error for empty username", () => {
    login("", "secret_sauce");
    cy.get("[data-test='error']").should("contain.text", "Username is required");
  });

  it("TC-LOGIN-05: shows error for empty password", () => {
    login("standard_user", "");
    cy.get("[data-test='error']").should("contain.text", "Password is required");
  });

  it("TC-LOGIN-06: shows error when both fields are empty", () => {
    login("", "");
    cy.get("[data-test='error']").should("contain.text", "Username is required");
  });

  it("TC-LOGIN-07: blocks a locked out user", () => {
    login("locked_out_user", "secret_sauce");
    cy.get("[data-test='error']").should("contain.text", "locked out");
    cy.url().should("not.include", "/inventory.html");
  });

});
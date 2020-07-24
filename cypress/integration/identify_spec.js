/* eslint-disable no-undef */
describe("Login and register forms", () => {
  it("displays an alert when user leaves the Username input empty", () => {
    cy.visit("/login");
    cy.get("input").eq(0).type("s").type("{backspace}");
    cy.get(".alert-danger").should("be.visible");
  });
  it("displays an alert when user leaves the Password input empty", () => {
    cy.visit("/login");
    cy.get("input").eq(1).type("p").type("{backspace}");
    cy.get(".alert-danger").contains("is not allowed to be empty");
  });
  it("displays alert when user tries to submit the form with invalid credentials", () => {
    cy.server()
      .route({
        method: "POST",
        url: "/api/auth",
        status: 400,
      })
      .as("invalidLogin");
    cy.visit("/login");
    cy.get("input").eq(0).type("keyur@gmail.com");
    cy.get("input").eq(1).type("acb123");
    cy.get(".btn").click();
    cy.wait("@invalidLogin");
    cy.get(".alert-danger").should("be.visible");
  });
  it("ensures that the user can login successfully if valid credentials are given", () => {
    cy.server().route("GET", "/api/genres", "fixture:genres").as("getGenres");
    cy.server().route("GET", "/api/movies", "fixture:movies").as("getMovies");
    cy.server()
      .route({
        method: "POST",
        url: "/api/auth",
        status: 200,
      })
      .as("validLogin");
    cy.visit("/login");
    cy.get("input").eq(0).type("keyur@gmail.com");
    cy.get("input").eq(1).type("abc123");
    cy.get(".btn").click();
    cy.wait("@validLogin");
  });
  it("ensures that the user cannot leave any of the form inputs empty", () => {
    cy.visit("/register");
    cy.get("input").eq(0).type("s").type("{backspace}");
    cy.get(".alert-danger").contains("Username");
    cy.get("input").eq(1).type("s").type("{backspace}");
    cy.get(".alert-danger").contains("Password");
    cy.get("input").eq(2).type("s").type("{backspace}");
    cy.get(".alert-danger").contains("Name");
  });
  it("shows an alert if user has given an invalid username", () => {
      cy.visit('register')
      cy.get("input").eq(0).type("sdfasd.com")
      cy.get('.alert-danger').contains('must be a valid email')
  });
  it('shows an alert if the password the user has entered is less than 5 characters',() => {
    cy.visit('/register')
    cy.get('input').eq(1).type('1234')
    cy.get('.alert-danger').contains('length must be at least 5 characters long')
  })
  it('ensures that the user can successfully register', () => {
    cy.server().route("GET", "/api/genres", "fixture:genres").as("getGenres");
    cy.server().route("GET", "/api/movies", "fixture:movies").as("getMovies");
    cy.server()
    .route({
      method: "POST",
      url: "/api/users",
      status: 200,
      response: {},
    })
    .as("validRegistry");
    cy.visit('/register')
    cy.get("input").eq(0).type("testing@domain.com");
    cy.get("input").eq(1).type("abc123");
    cy.get("input").eq(2).type("tester");
    cy.get('.btn').click()
    cy.wait('@validRegistry')
  })
});

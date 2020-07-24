/* eslint-disable no-undef */
describe("Navigating movie genres", () => {
  beforeEach(() => {
    cy.server().route("GET", "/api/genres", "fixture:genres").as("getGenres");
    cy.server().route("GET", "/api/movies", "fixture:movies").as("getMovies");
    cy.visit("/movies");
  });
  it("displays the correct movie that the user types", () => {
    cy.get("[data-cy=movie-find-searchbar]").type("Jurassic Park");
    cy.get("tbody>tr").find("td").contains("Jurassic Park");
  });
  it("displays the correct genre movies when genre is clicked", () => {
    cy.get("[data-cy=specific-genre-selected]").contains("Comedy").click();
    cy.get("tbody>tr").find("td").contains("Comedy");
  });
  it("ensures that pagination works successfully ", () => {
    cy.get("[data-cy=specific-pagination-nav-screen]").eq(1).click();

    //check to see if list of movies changed
  });
  it("redirects a user that is not registered to the login page if they click on a movie", () => {
    cy.get("tbody>tr").find("td").contains("Avatar").click();
  });
  it("redirects user to login form when 'login' is clicked through the navbar", () => {
    cy.get("[data-cy=navbar-login-link]").click();
    cy.get("[data-cy=login-header]").invoke("text").should("equal", "Login");
  });
  it("redirects user to register form when 'register' is clicked through the navbar", () => {
    cy.get("[data-cy=navbar-register-link]").click();
    cy.get("[data-cy=register-header]")
      .invoke("text")
      .should("equal", "Register");
  });
  it("properly handles delete when user is not logged in", () => {
    cy.server()
      .route({
        method: "DELETE",
        url: "/api/movies/*",
        status: 400,
        response: {},
      })
      .as("deleteMovies");
    cy.get("tbody>tr").find(">td").contains("Delete").click();
    cy.wait("@deleteMovies");
    cy.get(".Toastify__toast-body").should("be.visible");
  });
});

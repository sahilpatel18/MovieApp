/* eslint-disable no-undef */

describe("how a logged in user interacts with the movieapp", () => {
  beforeEach(() => {
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
    cy.get("input").eq(0).type("sahilpatel18@domain.com");
    cy.get("input").eq(1).type("abc123");
    cy.get(".btn").click();
    cy.wait("@validLogin");
  });
  
  it("allows the verified user click on the New Movie button", () => {
    cy.visit("/movies")
    cy.get(".btn").contains("New Movie").click();
  });
  it("displays an alert if user leaves the title input empty on the create new movie form", () => {
    cy.visit("/movies/new");
    cy.get("input").eq(0).type("s").type("{backspace}");
    cy.get(".alert-danger").contains("is not allowed to be empty");
  });
  it("displays an alert if user leaves the genre selection empty on the create new movie form", () => {
    cy.visit("/movies/new");
    cy.get("select").select("");
    cy.get(".alert-danger").contains("is not allowed to be empty");
  });
  it("displays an alert if user leaves the Number in Stock input empty on the create new movie form", () => {
    cy.visit("/movies/new");
    cy.get("input").eq(1).type("2").type("{backspace}");
    cy.get(".alert-danger").contains("must be a number");
  });
  it("displays an alert if user types a letter instead of a number for the Rate input on the create new movie form ", () => {
    cy.visit("/movies/new");
    cy.get("input").eq(2).type("s");
    cy.get(".alert-danger").contains("must be a number");
  });
  it("displays an alert if user types a letter instead of a number for the Rate input on the create new movie form ", () => {
    cy.visit("/movies/new");
    cy.get("input").eq(2).type("s").type("{backspace}");
    cy.get(".alert-danger").should("be.visible");
  });
  it("should allow the user to create a post new movie when create new movie form is submitted", () => {
    cy.server()
      .route({
        method: "POST",
        url: "/api/movies",
        status: 200,
        response: {},
      })
      .as("postedNewMovie");
    cy.visit("/movies/new");
    cy.get("input").eq(0).type("World War Z");
    cy.get("select").select("Action");
    cy.get("input").eq(1).type("2");
    cy.get("input").eq(2).type("8");
    cy.get(".btn").click();
    cy.wait("@postedNewMovie");
  });
  it("esures that the verified user can search for movies in the search bar", () => {
    cy.get("[data-cy=movie-find-searchbar]").type("World War Z");
    cy.get("[data-cy=row-of-movie-info]").contains("World War Z");
  });
  it("ensures that the user can delete a selected movie", () => {
    cy.server()
      .route({
        method: "DELETE",
        url: "/api/movies/*",
        status: 200,
        response: {},
      })
      .as("deleteMovie");
    cy.get("[data-cy=movie-find-searchbar]").type("World War Z");
    cy.get("[data-cy=row-of-movie-info]").contains("Delete").click();
    cy.get("p").contains("0");
  });
  it("show the user the edit movie form when a specific movie title is clicked", () => {
    cy.server()
      .route("GET", "/api/movies/*", {
        title: "Avatar",
        genre: { _id: "5f188bbf4bdd633875c82882", name: "Science Fiction" },
        numberInStock: 6,
        dailyRentalRate: 10,
      })
      .as("editForm");
    cy.get("tbody>tr>td").find("a").contains("Avatar").click();
    cy.wait("@editForm");
    cy.get("h1").contains("Movie Form");
  });
  it("ensures that a logged in user can logout of the account", () => {
    cy.get(".nav-link").contains("Logout").click();
    cy.get(".nav-link").contains("Login");
  });
});

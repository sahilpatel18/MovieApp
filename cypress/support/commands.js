Cypress.Commands.add("login", () => {
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

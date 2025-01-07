describe('Página de Lista de Usuários', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('deve exibir a tabela', () => {
    cy.get('[data-test="user-table"]').should('exist');
  });

  it('deve exibir os botões de exportação', () => {
    cy.get('[data-test="export-pdf-button"]').should('exist');
    cy.get('[data-test="export-excel-button"]').should('exist');
  });

  it('deve exibir os botões de ação para cada linha da tabela', () => {
    cy.get('[data-test="user-row"]').should('have.length.greaterThan', 0);

    cy.get('[data-test="user-row"]').each(($row) => {
      cy.wrap($row).find('[data-test="view-details-button"]').should('exist');
      cy.wrap($row).find('[data-test="edit-user-button"]').should('exist');
      cy.wrap($row).find('[data-test="delete-user-button"]').should('exist');
    });
  });

  it('deve navegar para a tela de detalhes do usuário e validar os elementos', () => {
    cy.get('[data-test="user-row"]')
      .first()
      .find('[data-test="view-details-button"]')
      .click();

    cy.get('[data-test="user-details-card"]').should('exist');
    cy.get('[data-test="user-avatar"]').should('exist');
    cy.get('[data-test="user-id"]').should('exist');
    cy.get('[data-test="user-name"]').should('exist');
    cy.get('[data-test="user-email"]').should('exist');

    cy.get('[data-test="go-back-button"]').click();
    cy.url().should('eq', Cypress.config().baseUrl);
  });

  it('deve navegar até o modal de edição, validar os campos e clicar no botão de Ok', () => {
    cy.get('[data-test="user-row"]')
      .first()
      .find('[data-test="edit-user-button"]')
      .click();

    cy.get('[data-test="edit-user-modal"]').should('exist');
    cy.get('[data-test="edit-user-form"]').should('exist');

    cy.get('button').contains('OK').should('exist').click();
  });

  it('deve abrir o modal de exclusão e confirmar a exclusão do usuário', () => {
    cy.get('[data-test="user-row"]')
      .first()
      .find('[data-test="delete-user-button"]')
      .click();

    cy.get('[data-test="delete-user-modal"]').should('exist');
    cy.get('[data-test="delete-confirmation-message"]').should('exist');
    cy.get('[data-test="delete-user-name"]')
      .should('exist')
      .and('not.be.empty');

    cy.get('button').contains('OK').should('exist').click();
  });

  it('deve filtrar a tabela por nome ao realizar uma busca', () => {
    const nomeBuscado = 'Janet';

    cy.get('[data-test="search-input"]').type(nomeBuscado);
    cy.get('[data-test="user-row"]').should('have.length', 1);
    cy.get('[data-test="user-name"]').should('contain.text', nomeBuscado);
  });
});

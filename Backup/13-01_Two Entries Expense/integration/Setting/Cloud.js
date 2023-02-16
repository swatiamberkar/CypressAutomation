class Cloud {

    verifyNotication(message) {
        cy.get(".toast-message").invoke('text').should('eq', message)
        cy.get(".toast-message").click({ force: true })
    }

    selectEmployee(employeeId) {
        cy.get('#select2-approvalManager-container').click({ force: true })
        cy.get('input[type="search"]').click({ force: true }).type(employeeId)
        cy.get('.select2-results__option--highlighted').click({ force: true })
    }

    verifyPageTitle(title) {
        cy.get('.card-header').invoke('text').should('contain', title)
    }
}

export default Cloud
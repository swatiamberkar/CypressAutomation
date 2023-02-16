class Employee {

    addApprovalMatrixManager() {
        cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
    }
    selectApprovalMatrixTab() {
        cy.get('#approval_matrix_tab').click({ force: true })
    }
    saveApprovalMatrix() {
        cy.get('#btnSaveText').click({ force: true })
    }
}
export default Employee
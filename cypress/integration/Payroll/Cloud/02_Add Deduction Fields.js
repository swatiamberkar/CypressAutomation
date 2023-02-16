describe('Add Earnings&& Deductions Fields', function () {

	beforeEach(function () {
		cy.getCookies()
	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})

	it('Payroll Salary components navigate', function () {
	
		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.get('#payroll_detail_tab').click({ force: true })
		cy.wait(2000)
		cy.get('#payroll_detail_tab').click()
		cy.wait(2000)
		cy.get('#payroll_detail_tab').click({ force: true })
		cy.wait(2000)
		cy.get('#Payroll_SalaryComponents').click({ force: true })
		cy.wait(2000)
		cy.get('#Payroll_SalaryComponents').click()
		cy.wait(2000)
		cy.get('#Payroll_SalaryComponents').click({ force: true })
		cy.wait(2000)
	})

	it('Add Deduction field for CarLoan', function () {
		cy.wait(5000)
		cy.get('#activeAddDeduction').click({ force: true })
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//a").click({ force: true })
		cy.wait(2000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('CL')

		cy.get('#LabelName').click({ force: true })
		cy.get('#LabelName').clear()
		cy.get('#LabelName').type('Carloan')

		cy.get('#deductIncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.get('#LoanId').not('[disabled]').check({ force: true }).should('be.checked')

		cy.get('#btnSaveText').click({ force: true })

	})

	it('Add Deduction field for HomeLoan', function () {
		cy.wait(5000)
		cy.get('#activeAddDeduction').click({ force: true })
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//a").click({ force: true })
		cy.wait(4000)
		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('HL')

		cy.get('#LabelName').click({ force: true })
		cy.get('#LabelName').clear()
		cy.get('#LabelName').type('HomeLoan')

		cy.get('#LoanId').not('[disabled]').check({ force: true }).should('be.checked')
		cy.get('#btnSaveText').click({ force: true })


	})

	it('Add Deduction field for EducationLoan', function () {
		cy.wait(5000)
		cy.get('#activeAddDeduction').click({ force: true })
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//a").click({ force: true })
		cy.wait(3000)
		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('EL')

		cy.get('#LabelName').click({ force: true })
		cy.get('#LabelName').clear()
		cy.get('#LabelName').type('EducationLoan')

		cy.get('#LoanId').not('[disabled]').check({ force: true }).should('be.checked')
		cy.get('#btnSaveText').click({ force: true })

	})

})
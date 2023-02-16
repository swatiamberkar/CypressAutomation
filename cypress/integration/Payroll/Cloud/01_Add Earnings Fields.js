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

	it('Add Earning field for Arrear Field Allownace', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('AFIELD')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Arrear Field Allownace')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//cy.wait(10000)
		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })
	})

	it('Add Earning field for Arrear HRA', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)
		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('AHRA')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Arrear HRA')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})

		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })
	})

	it('Add Earning field for Arrear Project Allowance', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('APROJ')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Arrear Project Allowance')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//cy.wait(2000)
		cy.get(".toast-message").click({ force: true })
	})
/*
	it('Add Earning field for Earned HRA', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('EHRA')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Earned HRA')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})

		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })
	})

	it('Add Earning field for Field Allowance', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('EFIELD')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Field Allowance')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})

		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })
	})


	it('Add Earning field for Fixed HRA', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('FHRA')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Fixed HRA')

		cy.get('#Increment_Component').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})

		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })

	})

	it('Add Earning field for Lop Basic', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('LOP')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Lop Basic')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		//cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})

		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })
	})

	it('Add Earning field for LOP Credit days', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('LOPCD')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('LOP Credit days')

		//cy.get('#IncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})

		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })

	})

	it('Add Earning field for Master Field Allowance', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('FFIELD')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Master Field Allowance')

		cy.get('#Increment_Component').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })
	})

	it('Add Earning field for Master Project Allowance', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('FPROJ')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Master Project Allowance')

		cy.get('#Increment_Component').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })
	})


	it('Add Earning field for Project Allowance', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('EPROJ')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Project Allowance')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.get('#TaxYesNo').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })

	})

	it('Add Earning field for Supplementary Basic', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('SB')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Supplementary Basic')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })

	})

	it('Add Earning field for Supplementary Days', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('SD')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Supplementary Days')

		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })

	})

	it('Add Earning field for Conditional', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('CONDITIONAL')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('Conditional Earning')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//clear confirmation msg
		cy.get(".toast-message").click({ force: true })

	})

	it('Add Earning field for TELEPHONE REIMBURSEMENT (Monthly)', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('TER')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('TELEPHONE REIMBURSEMENT')

		cy.get('#fnReimbursement').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(2000)
		cy.get('#fnReimbursementType').select('Monthly', { force: true })
		cy.wait(2000)

		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//cy.wait(2000)
		cy.get(".toast-message").click({ force: true })
	})


	it('Add Earning field for Petrol REIMBURSEMENT (Yearly)', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('PETR')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('PETROL REIMBURSEMENT')

		cy.get('#fnReimbursement').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(2000)
		cy.get('#fnReimbursementType').select('Annual', { force: true })
		cy.wait(2000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//cy.wait(2000)
		cy.get(".toast-message").click({ force: true })
	})


	it('Add Earning field for TELEPHONE REIMBURSEMENT (Monthly Taxable)', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('TERT')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('TELEPHONE REIMBURSEMENT TAXABLE')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('#MonthlyInput').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('#TaxYesNo').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(2000)

		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//cy.wait(2000)
		cy.get(".toast-message").click({ force: true })
	})


	it('Add Earning field for Petrol REIMBURSEMENT TAXABLE (Yearly)', function () {
		cy.wait(5000)
		cy.xpath("//div[@id='payrollContentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(1000)

		cy.get('#FieldName').click({ force: true })
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('PETRT')

		cy.get('#fieldLabelName').click({ force: true })
		cy.get('#fieldLabelName').clear()
		cy.get('#fieldLabelName').type('PETROL REIMBURSEMENT TAXABLE')

		cy.get('#IncludeGrossPay').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('#MonthlyInput').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(1000)
		cy.get('#TaxYesNo').not('[disabled]').check({ force: true }).should('be.checked')
		cy.wait(2000)
		cy.get('[onclick="updateAddEarning(this)"]').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
		})
		//cy.wait(2000)
		cy.get(".toast-message").click({ force: true })
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
*/
})

import cloud from './Function/Cloud'

describe('Sample file', function () {
	const Cloud = new cloud()
	beforeEach(function () {
		cy.getCookies()
	})

	before(() => {
	cy.task('readXlsx', { file: 'cypress/fixtures/Employee.xlsx', sheet: "Employee" }).then((rows) => {
		var rowsLength = rows.length;
		cy.writeFile("cypress/fixtures/Employee.json", {rows})
	  }) 
	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})

	it('Add Employee', function () {
        Cloud.addEmployee()
	})

})

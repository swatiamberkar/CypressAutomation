import Employee from '../../Function/Employee'
import Cloud from '../../Function/Cloud'

describe('Approval Matrix', function () {
	const { softAssert, softExpect } = chai;
	const employee = new Employee()
	const cloud = new Cloud()

	var adminID = 'CY2'
	var employeeId = 'AP1'
	var employeeIDName = 'Incometaxpost test(CY11)'
	var employeeID2 = 'CY5'

	beforeEach(function () {
		cy.getCookies()
	})

	Cypress.Commands.add('delete_ManagerDetails', () => {
		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({ force: true })
		cy.wait(2000)
	})

	it('Pocket HRMS Login and Change Company', function () {
		cy.login()
		cy.changeCompany()
	})

	it('Navigate Manager Details Page', function () {
		cy.navigate_EmployeeProfile(employeeId)
		employee.selectApprovalMatrixTab()
		employee.addApprovalMatrixManager()
	})

	it('Verify Validation Massges - Select Manager Name', function () {
		employee.saveApprovalMatrix()
		cloud.verifyNotication('Select Manager Name')
	})

	it('Verify Validation Massges - Select Atleast 1 Module Name', function () {
		cloud.selectEmployee(employeeId)
		employee.saveApprovalMatrix()
		cloud.verifyNotication('Select Atleast 1 Module Name')
	})

	it('Verify Validation Massges - Enter Positive Priority', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		cy.get('#AttendanceRegularization').click({ force: true })

		cy.get('#Priority').then($input => {
			expect($input.val()).to.contain('1')
		})


		cy.get('#Priority').click({ force: true })
		cy.get('#Priority').clear()
		cy.get('#Priority').type('0');


		//Priority validation		
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter Positive Priority');
			cy.wait(2000)
			cy.get(".toast-message").click({ force: true })


		})
		cy.wait(5000)
		cy.get('#Priority').click({ force: true })
		cy.get('#Priority').clear()
		//cy.get('#Priority').type('0');


		//Priority validation		
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter Positive Priority');
			cy.wait(2000)
			cy.get(".toast-message").click({ force: true })


		})

	})

	it('Verify Validation Massges - You can not assigned manager yourself', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		cy.get('#Priority').click({ force: true })
		cy.get('#Priority').clear()
		cy.get('#Priority').type('1');
		//assigned manager yourself	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('You can not assigned manager yourself');
			cy.wait(1000)
			cy.get(".toast-message").click({ force: true })
		})

	})

	it('Attendance Regularization Module - Data saved successfully.!', function () {
		const { softAssert, softExpect } = chai;

		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(20000)
		})


		cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Attendance Regularization')
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000)
		})
	})


	it('Verify Validation Massges - AttendanceRegularization- Priority Number is not in Sequence.', function () {
		const { softAssert, softExpect } = chai;

		//#approvalmatrixbody > div > .col-lg-6

		//div[@id='approvalmatrixbody']//div[@class='card-body body-bg']




		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({ force: true })

		cy.wait(2000)
		cy.xpath("//div[@id='approvalComponentTitle']//i[@class='fas fa-plus']").click({ force: true })
		cy.wait(2000)

		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.wait(2000)
		cy.get('#AttendanceRegularization').click({ force: true })

		// Duplicate Priority	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('AttendanceRegularization- Priority Number is not in Sequence.AttendanceRegularization-Priority already exist !!!AttendanceRegularization-Leader Already Exist !!!');
			cy.wait(8000)
			//cy.get(".toast-message").click({force: true})
		})

	})

	it('Verify Validation Massges - Leader Already Exist !!!', function () {
		const { softAssert, softExpect } = chai;

		cy.get('#Priority').click({ force: true })
		cy.get('#Priority').clear()
		cy.get('#Priority').type('2');

		// Duplicate Manager	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('AttendanceRegularization-Leader Already Exist !!!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})

		cy.xpath("//div[@class='modal-header']//button[@class='close'][contains(text(),'×')]").click({ force: true })
	})


	it('Attendance Regularization Module - Edit Manager Details', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({ force: true })
		cy.wait(2000)

		cy.get('.select2-selection__clear').click({ force: true })
		cy.wait(1000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID2)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.wait(1000)
		cy.get('#viewonly').select('Yes', { force: true })
		cy.get('#cancelrights').select('Yes', { force: true })
		//Priority with duplicate node
		cy.get('#Priority').click({ force: true })
		cy.get('#Priority').clear()
		cy.get('#Priority').type('2');

		cy.get('#btnUpdateApproval').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data Updated Successfully');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})

		cy.wait(3000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID2)
			cy.wait(2000)
		})
	})

	it('Attendance Regularization Module - Delete Manager Details', function () {
		const { softAssert, softExpect } = chai;

		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({ force: true })
		cy.wait(2000)

		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Manager deleted successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})

	})


	it('Attendance Regularization Module - View Only- Yes', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(10000)

		//	cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsetting')
		//	cy.wait(2000)
		//	cy.navigate_EmployeeProfile()
		//	cy.wait(2000)
		//	cy.get('#approval_matrix_tab').click({force:true})
		//cy.delete_ManagerDetails()



		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
		cy.wait(2000)

		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.get('#AttendanceRegularization').click({ force: true })
		cy.get('#viewonly').select('Yes', { force: true })

		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000)
		})


		cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Attendance Regularization')
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('0')
			cy.wait(2000)
		})

		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({ force: true })
		cy.wait(2000)
	})

	it('Attendance Regularization Module - View Only- No', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(10000)

		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
		cy.wait(2000)


		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.get('#AttendanceRegularization').click({ force: true })
		cy.get('#viewonly').select('No', { force: true })

		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000)
		})

		cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Attendance Regularization')
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000)
		})

		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({ force: true })
		cy.wait(2000)
	})



	it('Navigate Manager Details Page', function () {

		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.navigate_EmployeeProfile()
		cy.wait(2000)
		cy.get('#approval_matrix_tab').click({ force: true })


	})

	it('On Duty Module - View Only- Yes', function () {
		const { softAssert, softExpect } = chai;

		cy.wait(10000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
		cy.wait(2000)

		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.get('#OnDuty').click({ force: true })
		cy.get('#viewonly').select('Yes', { force: true })

		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000)
		})

		cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('OnDuty')
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('0')
			cy.wait(2000)
		})

		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({ force: true })
		cy.wait(2000)
	})

	it('On Duty Module - View Only- No', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(10000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
		cy.wait(2000)


		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.get('#OnDuty').click({ force: true })
		cy.get('#viewonly').select('No', { force: true })

		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000)
		})

		cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('OnDuty')
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000)
		})

		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({ force: true })
		cy.wait(2000)

	})


	it('Increment Module - View Only- Yes', function () {
		const { softAssert, softExpect } = chai;

		cy.wait(10000)
		//cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		cy.wait(2000)

		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.get('#Increment').click({ force: true })
		cy.get('#viewonly').select('Yes', { force: true })

		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(10000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {

			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000)
		})

		cy.get("li[title='Module']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Increment');
			//expect(text.trim()).to.contain()
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('1');
			cy.wait(2000)
		})

		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({ force: true })
		cy.wait(2000)
	})

	it('Increment Module - View Only- No', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(10000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
		cy.wait(2000)


		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.get('#Increment').click({ force: true })
		cy.get('#viewonly').select('No', { force: true })

		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(10000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID)
			cy.wait(2000)
		})

		cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Increment')
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000)
		})

		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({ force: true })
		cy.wait(2000)

	})


	it('Verify Validation Massges - Increment- Priority Number is not in Sequence.', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(10000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
		cy.wait(2000)

		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })
		cy.wait(2000)
		cy.get('#Increment').click({ force: true })

		cy.get('#Priority').click({ force: true })
		cy.get('#Priority').clear()
		cy.get('#Priority').type('2');

		// Success Validation	
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Increment- Priority Number is not in Sequence.');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)


	})



	it('Navigate Manager Details Page', function () {

		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.get('#globalSearch').click({ force: true })
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeIDName).click({ force: true })
		cy.wait(3000)
		cy.get('#approval_matrix_tab').click({ force: true })

		cy.wait(20000)
		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
		cy.wait(2000)

	})

	it('Verify Validation Massges - select Approval Status', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(1000)

		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(adminID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.get('#Leave').not('[disabled]').check({ force: true }).should('be.checked')



		//Approval Status validation
		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select Approval Status');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)
	})

	it('Verify Validation Massges - Select Approved Cancel Rights', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(1000)
		cy.get('#approvalmust').select('Yes', { force: true })

		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select Approved Cancel Rights');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})

	})


	it('Leave Module - Data saved successfully.!', function () {
		const { softAssert, softExpect } = chai;
		cy.get('#cancelrights').select('Yes', { force: true })

		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data saved successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})
		cy.wait(3000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(adminID)
			cy.wait(2000)
		})


		cy.get("li[title='Module']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Leave')
			cy.wait(2000)
		})

		cy.get("li[title='Priority']").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			cy.wait(2000)
		})

	})

	it('Leave Module - Edit Manager Details', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		cy.get('#globalSearch').click({ force: true })
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeIDName).click({ force: true })
		cy.wait(3000)

		cy.get('#approval_matrix_tab').click({ force: true })

		cy.wait(2000)
		cy.get('.fa-edit').eq(0).click({ force: true })
		cy.wait(2000)

		cy.get('.select2-selection__clear').click({ force: true })
		cy.wait(1000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID2)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		cy.wait(1000)
		cy.get('#viewonly').select('Yes', { force: true })
		cy.get('#cancelrights').select('Yes', { force: true })
		//Priority with duplicate node
		cy.get('#Priority').click({ force: true })
		cy.get('#Priority').clear()
		cy.get('#Priority').type('2');

		cy.get('#btnUpdateApproval').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Data Updated Successfully');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})

		cy.wait(3000)

		cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			expect(text.trim()).to.contain(employeeID2)
			cy.wait(2000)
		})
	})

	it('Leave Module - Delete Manager Details', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		cy.get('#globalSearch').click({ force: true })
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeIDName).click({ force: true })
		cy.wait(3000)
		cy.get('#approval_matrix_tab').click({ force: true })

		cy.wait(2000)
		cy.get('.fa-trash-alt').eq(0).click({ force: true })
		cy.wait(2000)

		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Manager deleted successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({ force: true })
		})

	})

	it('Navigate Manager Details Page', function () {

		cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsetting')
		cy.wait(2000)
		cy.get('#globalSearch').click({ force: true })
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID2)
		cy.wait(2000)
		cy.contains('li', employeeID2).click({ force: true })
		cy.wait(3000)
		cy.get('#approval_matrix_tab').click({ force: true })

		cy.wait(20000)

	})

	it('Set Manager Details for Multiple Module', function () {
		const { softAssert, softExpect } = chai;
		cy.wait(1000)


		cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({ force: true })
		cy.wait(2000)
		cy.get('#select2-approvalManager-container').click({ force: true })
		cy.wait(2000)
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(adminID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({ force: true })

		/*	cy.get('#Leave').click({force: true})
			cy.get('#approvalmust').select('Yes',{force: true})
			cy.get('#cancelrights').select('Yes',{force: true})
			
			cy.get('#EmployeeDetails').click({force: true})
			cy.get('#IncomeTaxProof').click({force: true})
			cy.get('#Loan').click({force: true})
			cy.get('#OTEntryAll').click({force: true})
			cy.get('#Selfservice_Separation').click({force: true})
			cy.get('#ShiftScheduleEntry').click({force: true})
			
			cy.get('#AttendanceRegularization').click({force: true})
			cy.get('#EmployeeInOutDetails').click({force: true})
			cy.get('#Increment').click({force: true})
			//cy.get('#NewEmployee').click({force: true})
			cy.get('#PayrollLoan').click({force: true})
			cy.get('#SelfServiceTdsEntry').click({force: true})
			cy.get('#TimesheetEntry').click({force: true})
			
			
			cy.get('#Confirmation').click({force: true})
			cy.get('#Expense').click({force: true})
			cy.get('#JobManager').click({force: true})
			cy.get('#OnDuty').click({force: true})
			cy.get('#Selfservice_Permission').click({force: true})	
			cy.get('#SelfServiceTdsProofEntry').click({force: true})
			cy.get('#Transfer').click({force: true})
			
			cy.get('#EarningDeduction').click({force: true})
			cy.get('#IncomeTaxDeclaration').click({force: true})
			//cy.get('#Leave').click({force: true})
			cy.get('#OTEntry').click({force: true})
			cy.get('#Selfservice_PermissionFromTo').click({force: true})
			cy.get('#Separation').click({force: true})
			cy.get('#Travel').click({force: true})
			*/


		cy.get('#Confirmation').click({ force: true })
		cy.get('#Expense').click({ force: true })

		cy.get('#OnDuty').click({ force: true })

		cy.get('#Transfer').click({ force: true })

		cy.get('#Travel').click({ force: true })


		cy.get('#btnSaveText').click({ force: true })
		cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data saved successfully.!');
			cy.wait(3000)
			//cy.get(".toast-message").click({force: true})
		})
		cy.wait(20000)

		cy.xpath("//div[@id='approvalmatrixbody']").find('h4').should('have.length', 5)

	})

	/*	cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)Loan test (CY1)');
			cy.wait(2000) 
			})
			cy.get("li[title='Module']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('EmployeeDetails');
			cy.wait(2000) 
			})
			
			cy.get("li[title='Priority']").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('1');
			cy.wait(2000) 
			})
			*/




})
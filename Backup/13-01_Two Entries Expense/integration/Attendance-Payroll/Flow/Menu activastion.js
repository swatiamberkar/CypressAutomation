
describe('Attendance Payroll Flow', function () {

	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const month = moment().format('MMMM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");

	var url = Cypress.env('url')
	var username = 'nileshgajare@live.com'
	var userPass = '123456'
	var company = 'BBTest_25';
	//var employeeCode = 'CY4'
	var employeeId = 'exp01'

	var FinancialYear_From = Cypress.env('FinancialYear_From')
	var deviceMachineNo = 1
	var machineName = deviceMachineNo

	var startDate = '01/12/' + FinancialYear_From
	var endDate = '01/12/' + FinancialYear_From
	var onDutyMonth = 'April';

	var moduleName = "Attendance/machineLogImport.xlsx"
	var fileName = "machineLogImport.xlsx"
	var filePath = fileName
	var sheetName = 'MachineLog'
	var startingRow = '2'
	var endingRow = '2'

	var machineNo = 'A'
	var deviceEnrollNo = 'B'
	var inOutDate = 'C'
	var inTime = 'D'
	var outTime = 'E'

	var fixedBasic = 10000

	beforeEach(function () {
		cy.getCookies()
	})

	Cypress.Commands.add('navigate_EmployeeAttendanceInOutDetails', () => {
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({ force: true })
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({ force: true })
		cy.wait(10000)
	})

	Cypress.Commands.add('apply_InOutCoreDetailsFilter', () => {
		cy.get('#attendanceContentTitle a:nth-child(2)').click({ force: true })
		cy.wait(2000)

		cy.get('#StartDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate)
		})

		cy.wait(5000)
		cy.get('#EndDate').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(endDate)
		})

		cy.get('#btnFilterEarningDeduction').click({ force: true })
		cy.wait(5000)
	})

	function percentage(percent, totalValue) {
		return (percent / 100) * totalValue;
	}

	it('Pocket HRMS Login & Change Company', function () {
		cy.login()
		cy.changeCompany();
	})

	it('Menu Activation', function () {
		cy.visit(Cypress.env('url') + '/admin/menuactivation/menuactivation')
		cy.get('.page-title-box').click();
		cy.get('#SchemaName').select('Greyt56af30a136');
		cy.readFile('cypress/fixtures/Company.json').then((text) => {
			text.forEach(function (entry) {
				var comapnaycode = entry.comapnayname
				cy.log('comapnaycode ' + comapnaycode)
				cy.get('#Company').select(comapnaycode)

			})
		})
		cy.get('#Modules-0').click();
		cy.get('.col-sm-6:nth-child(1) #btnsave').click();
		cy.get('.navbar-custom').click();

	})


})
import Payroll from '../../Function/Payroll'

describe('02_Attendance Payroll Flow with Attendance - Leave Deduction Setting', function () {
	const payroll = new Payroll()

	var employeeId = 'exp01'

	var FinancialYear_From = Cypress.env('FinancialYear_From')
	var deviceMachineNo = 1
	var machineName = deviceMachineNo

	var startDate = '01/11/' + FinancialYear_From
	var endDate = '30/11/' + FinancialYear_From
	var month = 'November'
	var year = 2022
	var MonthDays = 30
	var LopDays = 1
	var PaidDays = MonthDays - LopDays
	var fixedBasic = 10000
	var EarnedBasic = ''
	var LeaveEncashRate = ''
	var ESICONAMOUNT = ''

	var LD = 2
	var WEEKOFF_DAYS = 2
	var moduleName = "Attendance"
	var fileName = "machineLogImport.xlsx"
	var filePath = moduleName + '/' + fileName
	var sheetName = 'AllPresent'
	var startingRow = '2'
	var endingRow = '30'

	var machineNo = 'A'
	var deviceEnrollNo = 'B'
	var inOutDate = 'C'
	var inTime = 'D'
	var outTime = 'E'

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

	it('Pocket HRMS Login', function () {
		cy.login()
		cy.changeCompany();
	})

/*	it('Set Payroll Component', function () {
		payroll.setPayrollComponent()
	})

	it('Do Time Consolidation', function () {
		cy.navigate_EmployeeProfile(employeeId);
		payroll.doTimeConsolidation(month, year)
	})
*/
	it('Do Payroll Process in Payroll Posting page', () => {
		payroll.doPayrollProcessInPosting(employeeId, month, year)
	})

	it('Do Payroll Posting', function () {
		payroll.doPayrollPosting(employeeId, month, year)
	})

	it('Verify Lop Days In Monthly Input', function () {
		let lopDays = 1
		cy.navigate_EmployeeProfile(employeeId);
		payroll.verifyLopDaysInMonthlyInput(month, year, lopDays)
	})

	it('Payroll Process for Month', function () {
		//cy.navigate_EmployeeProfile(employeeId);
		payroll.doPayrollProcess(month, year)
	})
	it('Verify Salary slip of Month', function () {
		//cy.navigate_EmployeeProfile(employeeId);
		var FB = fixedBasic
		var MD = MonthDays
		var PD = PaidDays
		var EarnedBasic = Math.round((FB / MD) * PD)
		//EarnedBasic = Math.round(EarnedBasic)

		var LeaveEncashRate = (FB / 26).toFixed(2);
		var ESICONAMOUNT = Math.round((0.0325 * EarnedBasic).toFixed(1))
		ESICONAMOUNT  = ESICONAMOUNT+1
		payroll.verifySalaryDetails(month, year, MonthDays, LopDays, PaidDays, fixedBasic, EarnedBasic, LeaveEncashRate, ESICONAMOUNT)
	})

})
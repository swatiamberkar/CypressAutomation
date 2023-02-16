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

	var LopDays = 0
	var PaidDays = MonthDays - LopDays
	var fixedBasic = 10000

	var EarnedBasic = 0
	var LeaveEncashRate = 0
	var ESICONAMOUNT = 0

	var LD = 2
	var WEEKOFF_DAYS = 2
	var moduleName = "Attendance"
	var fileName = "machineLogImport.xlsx"
	var filePath = moduleName + '/' + fileName

	var LeaveType = 'PL'
	var LeaveDate = '30/11/2022'
	var LeaveDay = 'FullDay'
	var LeaveDays = 1
	var Reason = 'UNPUNCH LEAVE DEDUCTION RULE '





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

	it('Set Attendance - Leave Deduction Setting', function () {
		cy.visit('https://pockethrmsnext.azurewebsites.net/Settings/Employee/Index?module=leave&submodule=TOS_LeaveDeduction');
		cy.wait(2000)
		cy.get('#ddField').select('UNPUNCH');
		cy.get('#ddLeaveName').select(LeaveType);
		cy.get('#ddLeaveType').select('F');
		cy.get('#btnSave').click();
		cy.get(".toast-message").invoke('text').should('eq', 'Data save successfully')
	});

	it('Delete Payroll Process', function () {
		cy.navigate_EmployeeProfile(employeeId);
		payroll.deletePayrollProcess(month, year)
	})

	it('Delete Time Consolidation', function () {
		//cy.navigate_EmployeeProfile(employeeId);
		payroll.deleteTimeConsolidation(month, year)
	})

	it('Do Time Consolidation', function () {
		//cy.navigate_EmployeeProfile(employeeId);
		payroll.doTimeConsolidation(month, year)
	})

	it('Verify Leave', function () {
		//cy.navigate_EmployeeProfile(employeeId);
		payroll.verifyLeaveDetails(LeaveType, LeaveDate, LeaveDay, LeaveDays, Reason )
	})

	it('Do Payroll Process in Payroll Posting page', () => {
		payroll.doPayrollProcessInPosting(employeeId, month, year)
	})

	it('Do Payroll Posting', function () {
		payroll.doPayrollPosting(employeeId, month, year)
	})

	it('Verify Lop Days In Monthly Input', function () {
		cy.navigate_EmployeeProfile(employeeId);
		payroll.verifyLopDaysInMonthlyInput(month, year, LopDays)
	})

	it('Payroll Process for Month', function () {
		//cy.navigate_EmployeeProfile(employeeId);
		payroll.doPayrollProcess(month, year)
	})

	it('Verify Salary slip of Month', function () {
		//cy.navigate_EmployeeProfile(employeeId);
		payroll.verifySalaryDetails(month, year, MonthDays, LopDays, PaidDays, fixedBasic)
	})




})
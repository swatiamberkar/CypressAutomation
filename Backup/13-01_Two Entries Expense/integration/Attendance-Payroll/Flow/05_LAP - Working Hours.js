import Payroll from '../../Function/Payroll'

describe('02_Attendance Payroll Flow with Attendance - Leave Deduction Setting', function () {
	const payroll = new Payroll()

	var employeeId = 'exp02'

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

	it('Set Attendance - Leave Deduction Setting For Working Hours', function () {
		cy.visit('https://pockethrmsnext.azurewebsites.net/Settings/Employee/Index?module=leave&submodule=TOS_LeaveDeduction');
		cy.wait(5000)
		cy.get('#ddField').select('WORKINGHOURS');

		cy.get('#FDHourFrom').click().clear().type('00');
		cy.get('#FDMinFrom').click().clear().type('01');
		cy.get('#FDHourTo').click().clear().type('04');
		cy.get('#FDMinTo').click().clear().type('29');
		cy.get('#FDLeaveName').select('LD');

		cy.get('#HDHourFrom').click().clear().type('04');
		cy.get('#HDMinFrom').click().clear().type('30');
		cy.get('#HDHourTo').click().clear().type('08');
		cy.get('#HDMinTo').click().clear().type('59');
		cy.get('#FDLeaveName').select('LD');
		cy.get('#btnSave').click();

		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Data save successfully')
		})
	});

	it('Delete Payroll Process', function () {
		cy.navigate_EmployeeProfile(employeeId);
		payroll.deletePayrollProcess(month, year)
	})

	it('Delete Time Consolidation', function () {
		//cy.navigate_EmployeeProfile(employeeId);
		payroll.deleteTimeConsolidation(month, year)
	})

	it('Upload Machine Log Excel', function () {

		var setting = ["In_Time", "outTime"];
		for (let time = 0; time < setting.length; time++) {

			var settingName = setting[time]
			cy.log("settingName: " + settingName)
			if (settingName == 'In_Time') {
				var inOutTime = inTime
			}
			else {
				var inOutTime = outTime
			}

			//cy.get('.dripicons-menu').click()
			cy.reload()
			cy.visit(Cypress.env('url') + 'Attendance/Settings/AttendanceImport#')
			cy.wait(2000)
			cy.get('#excelImport').select('Machine Log Import', { force: true })
			cy.wait(2000)
			cy.get('#SettingName').select(settingName, { force: true })
			cy.wait(5000)
			cy.fixture(filePath, 'binary')
				.then(Cypress.Blob.binaryStringToBlob)
				.then(fileContent => {
					cy.get('#file').attachFile({
						fileContent,
						fileName: filePath,
						mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
						encoding: 'utf8'
					})
				})
			cy.wait(3000)
			cy.get('#ExcelSheetName').select(sheetName, { force: true })
			cy.wait(3000)
			cy.get('#uploadsetting').click({ force: true })
			cy.wait(10000)

			var successMessage = 'Excel Uploaded successfully'
			cy.get(".alert-success").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
				//cy.get(".toast-message").click()
			})
			cy.wait(20000)
		}
	})

	it('In Out Import', function () {
		cy.visit(Cypress.env('url') + 'Attendance/Entry/InOutImport')
		cy.wait(15000)

		cy.get('#dtDateFrom').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate)
		})

		cy.wait(5000)
		cy.get('#dtDateTo').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(endDate)
		})

		cy.get('#chkWrongEntries').click({ force: true })
		cy.wait(1000)

		cy.get('#btnImport').click({ force: true })
		cy.wait(3000)

		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).contains('It will get processed in background.')
			//cy.get(".toast-message").click()
		})
		cy.wait(30000)
	})

	it('Verify imported Attendance', function () {

		//cy.wait(20000)
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeProfile(employeeId);
		cy.navigate_EmployeeAttendanceInOutDetails()
		cy.apply_InOutCoreDetailsFilter()

		cy.task('readXlsx', { file: 'cypress/fixtures/' + filePath, sheet: sheetName }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile('cypress/fixtures/' + sheetName + ".json", { rows })
		})

		cy.fixture(sheetName).then((excelData) => {
			excelData.rows.forEach((data, index) => {
				//cy.navigate_EmployeeProfile(data.InOutTime)

				var num = parseInt(index) + 1

				cy.xpath("//tbody/tr/td[4]").eq(index).invoke('text').then((text) => {
					softExpect(text.trim()).to.eq(data.InTime);
					//cy.wait(1000)
				})

				cy.xpath("//tbody/tr/td[5]").eq(index).invoke('text').then((text) => {
					softExpect(text.trim()).to.eq(data.OutTime);
					//cy.wait(1000)
				})
			})
		})

	})

	it('Do Time Consolidation', function () {
		//cy.navigate_EmployeeProfile(employeeId);
		payroll.doTimeConsolidation(month, year)
	})


	/*
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
	
		it('Add Earning Details', function () {
			//cy.navigate_EmployeeProfile(employeeId);
			payroll.addEarningDetails(fixedBasic)
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
			ESICONAMOUNT = ESICONAMOUNT + 1
			payroll.verifySalaryDetails(month, year, MonthDays, LopDays, PaidDays, fixedBasic, EarnedBasic, LeaveEncashRate, ESICONAMOUNT)
		})
	
		*/
})
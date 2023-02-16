
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

	var moduleName = "Attendance"
	var fileName = "machineLogImport.xlsx"
	var filePath = moduleName + '/' + fileName
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

	context('Attedance Settings', function () {

		it('Navigate to Attendance Setting', function () {
			cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=organization&submodule=smtpsettings')
			cy.wait(1000)
			cy.get('#attendance_detail_tab').click({ force: true })
			cy.wait(1000)
		})

		it('Employee Mapping', function () {

			cy.get("#Attendance_EmployeeMapping").click({ force: true })
			cy.wait(2000)

			cy.get('#loadMachineNo').select(machineName)

			cy.wait(1000)
			//	cy.get('#allCheck').click()
			cy.wait(3000)
			//	cy.get('#btnDeleteEmpMapping').click({force: true})
			cy.wait(3000)
			//	cy.get(".toast-message").click()


			cy.get('#UnMapped').click({ force: true })
			cy.wait(5000)

			cy.get('.well > #tablesorter > tbody').find('tr').each(function (row, i) {
				var num1 = parseFloat(i) + 1
				cy.get('.well > #tablesorter > tbody > tr:nth-child(' + num1 + ') > td:nth-child(2)').invoke('text').then((text) => {
					cy.log(text.trim())
					if (text.trim() == employeeId) {
						cy.get('.well > #tablesorter > tbody > tr:nth-child(' + num1 + ') > td:nth-child(4)').click({ force: true })
						cy.get('.well > #tablesorter > tbody > tr:nth-child(' + num1 + ') > td:nth-child(4)').type(employeeId)
						cy.get('.well > #tablesorter > tbody > tr:nth-child(' + num1 + ') > td:nth-child(1)>span>.chkEmp').click({ force: true })
					}
				})
			})

			cy.wait(2000)
			cy.get('#btnSaveEmpMapping').click({ force: true })
			cy.wait(2000)
			cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Records Saved Successfully.!')
			})
		})

		it('Add Shift Schedule form Employee profile', function () {
			cy.navigate_EmployeeProfile(employeeId);
			const { softAssert, softExpect } = chai;
			cy.wait(1000)
			cy.get('#attendance_detail_tab').click({ force: true })
			cy.wait(2000)
			cy.get('#Attendance_ShiftDetails').click({ force: true })
			cy.wait(5000)
			cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click()
			cy.wait(3000)
			cy.get('#ShiftName').select('General')
			cy.wait(1000)

			cy.get('#dateRange').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/04/' + FinancialYear_From + ' to 30/06/' + FinancialYear_From)
			})


			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({ force: true })
			cy.wait(5000)

			cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
			})

			cy.wait(10000)
			cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({ force: true })
			cy.wait(3000)
			cy.get('#ShiftName').select('General')
			cy.wait(1000)

			cy.get('#dateRange').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/07/' + FinancialYear_From + ' to 30/09/' + FinancialYear_From)
			})


			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({ force: true })
			cy.wait(5000)

			cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
			})

			cy.wait(10000)
			cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({ force: true })
			cy.wait(3000)
			cy.get('#ShiftName').select('General')
			cy.wait(1000)

			cy.get('#dateRange').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/10/' + FinancialYear_From + ' to 31/12/' + FinancialYear_From)
			})

			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({ force: true })
			cy.wait(5000)

			cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
			})

			cy.wait(10000)
			cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({ force: true })
			cy.wait(3000)
			cy.get('#ShiftName').select('General')
			cy.wait(1000)

			cy.get('#dateRange').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('01/01/' + FinancialYear_From + ' to 31/03/' + FinancialYear_From)
			})


			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({ force: true })
			cy.wait(5000)

			cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
			})
			cy.wait(5000)
		})

		it('Save Machine Log Import Setting', function () {

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

				cy.visit(Cypress.env('url') + 'Attendance/Settings/AttendanceImport#')
				cy.wait(2000)
				cy.get('#excelImport').select('Machine Log Import', { force: true })
				cy.wait(2000)

				cy.get('#SettingName').find('option').then(listing => {
					var len = Cypress.$(listing).length;
					cy.log(len)
					if (len == 1) {
						cy.get('a[onclick="showNewSetting()"]').click({ force: true })

						cy.get('#SettingNameNew').click({ force: true })
						cy.get('#SettingNameNew').clear()
						cy.get('#SettingNameNew').type(setting[time])

						cy.get("input[name='name']").click({ force: true })
					}
					else if (len == 2) {
						cy.get('a[onclick="showNewSetting()"]').click({ force: true })

						cy.get('#SettingNameNew').click({ force: true })
						cy.get('#SettingNameNew').clear()
						cy.get('#SettingNameNew').type(setting[time])

						cy.get("input[name='name']").click({ force: true })
					}
					else {

					}
				})


				cy.wait(2000)
				cy.get('#SettingName').select(settingName, { force: true })


				cy.wait(2000)
				cy.get('#StartingRow').click({ force: true })
				cy.get('#StartingRow').clear()
				cy.get('#StartingRow').type(startingRow)

				cy.get('#EndingRow').click({ force: true })
				cy.get('#EndingRow').clear()
				cy.get('#EndingRow').type(endingRow)

				cy.get('#MachineNo').select(machineNo, { force: true })
				cy.get('#DeviceEnrollNo').select(deviceEnrollNo, { force: true })
				cy.get('#InOutDate').select(inOutDate, { force: true })
				cy.get('#InOutTime').select(inOutTime, { force: true })



				cy.get('#savesetting').click()
				cy.wait(3000)
				cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())
					expect(text.trim()).equal('Record Saved successfully.!')
					//cy.get(".toast-message").click()
				})
			}
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
			//cy.wait(30000)
		})

		it('Verify imported Attendance', function () {

			//cy.wait(20000)
			const { softAssert, softExpect } = chai;
			cy.navigate_EmployeeProfile(employeeId);
			cy.navigate_EmployeeAttendanceInOutDetails()
			///		cy.apply_InOutCoreDetailsFilter()

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
						cy.wait(1000)
					})

					cy.xpath("//tbody/tr/td[5]").eq(index).invoke('text').then((text) => {
						softExpect(text.trim()).to.eq(data.OutTime);
						cy.wait(1000)
					})
				})
			})

		})
	})

	
	context('Payroll Settings', function () {
	
		it('Add Earning Details', function () {

			cy.navigate_EmployeeProfile(employeeId);
			cy.wait(1000)
			cy.get('#salary_detail_tab').click({ force: true })
			cy.wait(1000)
			cy.get('#Salary_EarningDetails').click({ force: true })

			cy.wait(5000)
			cy.xpath("//input[@name='FB']").click({ force: true })
			cy.xpath("//input[@name='FB']").clear().type(fixedBasic)

			cy.wait(1000)
			cy.get('#btnSaveEarningDetails').click({ force: true })
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Record Saved Successfully !')
				cy.log(text.trim())
			})
			cy.get(".toast-message").click({ force: true })
			//cy.reload()
			cy.get('#salary_detail_tab').click({ force: true })
			cy.wait(1000)
			cy.get('#Salary_EarningDetails').click({ force: true })
			cy.wait(5000)
			cy.xpath("//input[@name='FB']").then($input => {
				expect(parseInt($input.val())).to.equal(fixedBasic)
			})

		})
		

		it('Save Monthly Input for Month', function () {
			//cy.navigate_EmployeeProfile(employeeId);
			cy.wait(1000)
			cy.get('#payroll_detail_tab').click()
			//         cy.wait(1000)
			//set monthly input
			cy.get('#Transaction_MonthlyInput').click({ force: true })
			cy.get('#Transaction_MonthlyInput').click()
			cy.get('#Transaction_MonthlyInput').click({ force: true })
			cy.wait(5000)
			cy.get('#inputMonth').select(month)
			cy.get('#year').clear()
			cy.get('#year').type(year)
			//click on view button
			cy.get('#viewdata').click({ force: true })
			//cy.get('#editdata').click()
			cy.wait(5000)
			cy.xpath("//input[contains(@name,'LD')]").clear().type(0)
			cy.xpath("//input[contains(@name,'WEEKOFF_DAYS')]").clear().type(0)
			//click on save button
			cy.get('#savedata').click()
			//
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).to.contain('Record Save Successfully !')
			})
			cy.get(".toast-message").click({ force: true })
		})

		it('Payroll Process for Month', function () {
			cy.get('#payroll_detail_tab').click({ force: true })
			cy.wait(2000)
			cy.get('#Utilities_PayrollProcess').click({ force: true })
			cy.wait(2000)
			cy.get('#month').select(month, { force: true })
			cy.get('#year').click({ force: true })
			cy.get('#year').clear().type(year)
			cy.wait(1000)
			cy.get('#btnProcess').click({ force: true })
			cy.wait(4000)
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).to.contain('Payroll Process Completed Successfully')
			})
		})

		it('Verify Salary slip of Month', function () {
			cy.navigate_EmployeeProfile(employeeId);
			const { softAssert, softExpect } = chai;
			var PFRate = 12
			var PFAmount = percentage(PFRate, fixedBasic)

			var ESIRate = 0.75
			var ESIAmount = percentage(ESIRate, fixedBasic)

			var PROFESSIONALTAXRate = 100
			//var PROFESSIONALTAXAmount = percentage(PROFESSIONALTAXRate, fixedBasic)
			var PROFESSIONALTAXAmount = 175
			cy.log(PFAmount)
			cy.log(ESIAmount)
			cy.log(PROFESSIONALTAXAmount)

			//cy.navigate_EmployeeProfile()
			cy.wait(2000)
			cy.get('#salary_detail_tab').click({ force: true })
			cy.wait(3000)
			cy.get('#Salary_SalaryDetails').click({ force: true })
			cy.wait(7000)
			cy.get('#drpfromMonth').select(month, { force: true })
			cy.get('#txtfromYear').click({ force: true })
			cy.get('#txtfromYear').clear().type(year)
			cy.wait(2000)
			cy.get('[onclick="GetSalaryData()"]').click({ force: true })
			cy.wait(2000)

			cy.get('#tblEarn > :nth-child(3) > [style="text-align: right;"]').invoke('text').then((text) => {
				softExpect(text.trim()).to.eq(fixedBasic + '.00');
			})

			cy.get(':nth-child(5) > [style="text-align: right;"]').invoke('text').then((text) => {
				softExpect(text.trim()).to.eq(fixedBasic + '.00');
			})


			cy.get('#tblDed > :nth-child(2) > [style="text-align: right;"]').invoke('text').then((text) => {
				softExpect(text.trim()).to.eq(PFAmount + '.00');
			})

			cy.get('#tblDed > :nth-child(3) > [style="text-align: right;"]').invoke('text').then((text) => {
				softExpect(text.trim()).to.eq(ESIAmount + '.00');
			})

			cy.get('#tblDed > :nth-child(4) > [style="text-align: right;"]').invoke('text').then((text) => {
				softExpect(text.trim()).to.eq(PROFESSIONALTAXAmount + '.00');
			})

			var deductionAmount = PFAmount + ESIAmount + PROFESSIONALTAXAmount

			cy.get('#totalEar').invoke('text').then((text) => {
				softExpect(parseInt(text.trim())).to.eq(fixedBasic);
			})

			cy.get('#totalDed').invoke('text').then((text) => {
				softExpect(parseInt(text.trim())).to.eq(deductionAmount);
				//cy.wait(1000)
			})

			cy.get('#netPay').invoke('text').then((text) => {
				softExpect(parseInt(text.trim())).to.eq(fixedBasic - deductionAmount);
			})
		})

	})

})
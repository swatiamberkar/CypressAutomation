
import Expense from '../../Function/Expense'

describe('01_Approve_Manager_Externally_Finance_Externally', function () {
	const expense = new Expense()
	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = Day2 + '/' + Month + '/' + year
	const currentDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	var employeeID = 'SA1'
	var employeeName = 'Admin'
	var managerLevel = 2
	var managerID = 'exp01'
	var managerName = 'User '
	var managerID2 = 'exp02'
	var managerName2 = 'Manager1 '
	var managerID3 = 'exp03'
	var managerName3 = 'Manager2 '
	var financeID = 'exp04'
	var HrID = 'SA2'

	var Mode = 'Train'
	var Purpose = 'Meeting'
	var Status = 'Pending'

	var ClaimDate = currentDate
	var ClaimType = 'Local'
	var ClaimAmount = 1500
	var ApprovedAmountFromManager = 1500
	var ApprovedAmountFromFinance = 1500
	var FromDate = currentDate
	var ToDate = currentDate
	var Remark = 'Local Travel'
	var Remark1 = 'Testing'
	var filePath = 'Expense/ExpenseReport.pdf'
	var FromLocation = 'Mumbai'
	var ToLocation = 'Navi Mumbai'
	var VendorName = 'HDFC'
	var InvoiceNumberId = 'HDFC001'
	let transcationID = ''
	var manager1Remark = 'Approve by Manager 1'
	var managerRemark2 = 'Approve by Manager 2'
	var managerRemark3 = 'Approve by Manager 3'

	var manager1Status = 'Approved'

	var financeRemark = ''
	var financeStatus = 'FinanceApproved'

	//var Status = 'Approved'
	var ApproveStatus = 'Approved'
	var REJECTREMARK = '-'

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()
	})

	it('Add Claim Entry', function () {
		cy.EssLogin(employeeID, employeeID)
		expense.addClaimEntry(currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath,
			Remark, FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, Status, managerID, managerName)
	})

	it('Verify Details at Add Claim Entry', function () {
		//cy.EssLogin(employeeID, employeeID)
		expense.VerifyDetailsAfterAddClaimEntry(currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath,
			Remark, FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, Status,
			managerLevel, managerID, managerName, managerID2, managerName2, managerID3, managerName3)
	})

	it('Verify Notification At Manager', function () {
		cy.logout()
		cy.EssLogin(managerID, managerID)
		expense.verifyNotificationAtManager(employeeID)

	})

	it('Verify Details From MainPage At Manager Approval', function () {

		//cy.EssLogin(managerID, managerID)
		expense.verifyDetailsFromMainPageAtManagerApproval(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, ApproveStatus)
	})

	it('Verify Details From Detail Popup At Manager Approval', function () {
		// cy.EssLogin(managerID, managerID)
		expense.verifyDetailsFromDetailPopupAtManagerApproval(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, ApproveStatus)
	})

	it('Approve Externally At Manager 1', function () {
		//cy.EssLogin(managerID, managerID)
		expense.ApproveExternallyAtManager(manager1Remark)
	})

	it('Verify Expense Details At Manager 1 Report', function () {
		//cy.EssLogin(managerID, managerID)

		var ApprovedAmountFromFinance = 0
		var ApprovedAmountFromManager = 0
		var ApproveStatus = "Pending"
		var financeStatus = "Pending"
		var manager1Status = "Pending"
		var managerLevel = 1
		
		expense.verifyExpensedetailsAtManagerReport(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance,
			ApproveStatus, REJECTREMARK, managerID, managerName, manager1Remark,  manager1Status, managerID2, managerName2, managerRemark2,
			managerID3, managerName3, managerRemark3, managerLevel, financeRemark, financeStatus)

	})

	it('Verify Notification At Manager 2', function () {
		cy.logout()
		cy.EssLogin(managerID2, managerID2)
		expense.verifyNotificationAtManager(employeeID)

	})

	it('Verify Details From MainPage At Manager 2 Approval', function () {

		//cy.EssLogin(managerID2, managerID2)
		expense.verifyDetailsFromMainPageAtManagerApproval(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, ApproveStatus)
	})

	it('Verify Details From Detail Popup At Manager 2 Approval', function () {
		// cy.EssLogin(managerID2, managerID2)
		expense.verifyDetailsFromDetailPopupAtManagerApproval(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, ApproveStatus)

	})

	it('Approve Externally At Manager', function () {
		//cy.EssLogin(managerID2, managerID2)
		var manager1Remark = managerRemark2
		expense.ApproveExternallyAtManager(manager1Remark)
	})

	it('Verify Expense Details At Manager Report', function () {
		//cy.EssLogin(managerID2, managerID2)
		var ApprovedAmountFromFinance = 0
		var financeStatus = "Approved"
		expense.verifyExpensedetailsAtManagerReport(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance,
			ApproveStatus, REJECTREMARK, managerID, managerName, manager1Remark,  manager1Status, managerID2, managerName2, managerRemark2,
			managerID3, managerName3, managerRemark3, managerLevel, financeRemark, financeStatus)
	})

	it('Verify Details From MainPage At Finance Approval', function () {
		cy.logout()
		cy.EssLogin(financeID, financeID)
		expense.verifyDetailsFromMainPageAtFinanceApproval(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK,
			managerID, managerName, manager1Remark, manager1Status, financeRemark)
	})

	it('verify Details From Detail Popup At Finance Approval', function () {
		// cy.EssLogin(financeID, financeID)
		expense.verifyDetailsFromDetailPopupAtFinanceApproval(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK,
			managerID, managerName, manager1Remark, manager1Status, financeRemark)
	})

	it('Approve Externally At Finance', function () {
		//cy.EssLogin(financeID, financeID)
		expense.ApproveExternallyAtFinance(financeRemark)
	})


	it('Verify Expense Details At Finance Report', function () {
		//cy.EssLogin(financeID, financeID)
		expense.verifyExpenseDetailsAtFinanceReport(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance,
			ApproveStatus, REJECTREMARK, managerID, managerName, manager1Remark,  manager1Status, managerID2, managerName2, managerRemark2,
			managerID3, managerName3, managerRemark3, managerLevel, financeRemark, financeStatus)
	})

	it('verify Expense Details At HR Report', function () {
		cy.logout()
		cy.EssLogin(HrID, HrID)
		expense.verifyExpenseDetailsAtHRReport(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance,
			ApproveStatus, REJECTREMARK, managerID, managerName, manager1Remark,  manager1Status, managerID2, managerName2, managerRemark2,
			managerID3, managerName3, managerRemark3, managerLevel, financeRemark, financeStatus)
	})


})
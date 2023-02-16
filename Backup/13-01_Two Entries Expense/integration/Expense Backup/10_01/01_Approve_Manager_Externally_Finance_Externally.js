import Expense from '../../Function/Expense'

describe('02_Expense Approve Flow From Detail Popup', function () {
	const expense = new Expense()



	var companyCode = ''
	var employeeID = 'exp01'
	var employeeName = 'User'
	var managerID = 'exp02'
	var managerName = 'Manager1 '
	var managerLastname = 'Manager1'
	var managerID2 = 'exp03'
	var financeID = 'exp04'
    var HrID = 'SA2'
	var Mode = 'Train'
	var Purpose = 'Meeting'
	var Status = 'Pending'

	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = Day2 + '/' + Month + '/' + year
	const currentDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	var ClaimDate = currentDate
	var ClaimType = 'Local'
	var ClaimAmount = 1500
    var ApprovedAmountFromManager = 1200
    var ApprovedAmountFromFinance = 1200
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
	var manager1Remark = 'Approve'
	var manager1Status = "Approved"
	var financeRemark = 'Approve at Finance'
	var financeStatus = 'FinanceApproved'
	var Status = 'Pending'




	var REJECTREMARK = '-'


	function logout() {
		cy.get('.notification > :nth-child(4) > .nav-link').click({ force: true })
		cy.get('[href="/Account/SignOut"]').click({ force: true })
	}

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()
	})
/*
	it('Add Claim Entry', function () {
		cy.EssLogin(employeeID, employeeID)
		expense.addClaimEntry(ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath,
			Remark, FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, Status, managerID, managerName)
	})

	it('Verify Details at Add Claim Entry', function () {
		//cy.EssLogin(employeeID, employeeID)
		expense.VerifyDetailsAfterAddClaimEntry(ClaimDate, ClaimType, ClaimAmount, Remark,
			VendorName, InvoiceNumberId, Mode, Purpose, Status, managerID, managerName)
	})

	it('Verify Notification At Manager', function () {
		cy.logout()
		cy.EssLogin(managerID, managerID)
		expense.verifyNotificationAtManager(employeeID)

	})

	it('Verify Details From MainPage At Manager Approval', function () {

		//cy.EssLogin(managerID, managerID)
		expense.verifyDetailsFromMainPageAtManagerApproval(employeeID, currentDate, ClaimAmount, employeeName)
	})

	it('Verify Details From Detail Popup At Manager Approval', function () {
		// cy.EssLogin(managerID, managerID)
		expense.verifyDetailsFromDetailPopupAtManagerApproval(employeeID, currentDate, ClaimAmount, ClaimType, Remark, FromLocation, ToLocation, VendorName, InvoiceNumberId, Mode, Purpose,)

	})

	it('Approve From Detail At Manager With Change Amount', function () {

		//cy.EssLogin(managerID, managerID)
		expense.ApproveFromDetailAtManager(manager1Remark,ClaimAmount, ApprovedAmountFromManager)
	})


	it('verify Expense details At Manager Report With Change Amount', function () {
		//cy.EssLogin(managerID, managerID)
      var ApprovedAmountFromFinance = 0
		expense.verifyExpensedetailsAtManagerReport(employeeID, employeeName, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
            FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK, 
            Status, ApproveStatus, managerID, managerName, manager1Remark)
	})

	it('verify Details From MainPage At Finance Approval', function () {
		cy.logout()
        cy.EssLogin(financeID, financeID)
        expense.verifyDetailsFromMainPageAtFinanceApproval(employeeID, currentDate, ClaimAmount, employeeName, finance1Remark, ApprovedAmountFromManager, ApprovedAmountFromFinance)
    })

    it('verify Details From Detail Popup At Finance Approval', function () {
       // cy.EssLogin(financeID, financeID)
        expense.verifyDetailsFromDetailPopupAtFinanceApproval(employeeID, employeeName, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
            FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, ApproveStatus)
    })

    it('Approve From Detail At Finance', function () {
      //  cy.EssLogin(financeID, financeID)
        expense. ApproveFromDetailAtFinance(manager1Remark)
    })

*/

	it('verify Expense Details At Finance Report', function () {
		cy.EssLogin(financeID, financeID)
		expense.verifyExpenseDetailsAtFinanceReport(employeeID, employeeName,currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
            FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK,
            managerID, managerName, manager1Remark, manager1Status, financeRemark, financeStatus)
	})


	it('verify Expense Details At HR Report', function () {
        //cy.logout()
		cy.EssLogin(HrID, HrID)
		expense.verifyExpenseDetailsAtHRReport(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK,
			managerID, managerName, manager1Remark, manager1Status, financeRemark, financeStatus)
	})
	
})
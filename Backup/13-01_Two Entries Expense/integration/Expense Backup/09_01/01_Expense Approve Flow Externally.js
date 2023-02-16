
import Expense from '../../Function/Expense'

describe('01_Expense Approve Flow Externally', function () {
	const expense = new Expense()

	var companyCode = ''
	var employeeID = 'exp01'
	var employeeName = 'User'
	var managerID = 'exp02'
	var managerName = 'Manager1 '
	var HrID = 'SA2'
	var managerID2 = 'exp03'
	var financeID = 'exp04'
	var Mode = 'Train'
	var Purpose = 'Meeting'

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
	var manager1Remark = 'Approve'
	var financeRemark = 'Approve at Finance'
	var Status = 'FinanceApproved'
	var ApproveStatus = 'Approved'

	var ApprovedAmount = 1500
	var FinanceAmount = 0
	var finance1Remark = 'Approved'
	var REJECTREMARK = '-'


	function logout() {
		cy.get('.notification > :nth-child(4) > .nav-link').click({ force: true })
		cy.get('[href="/Account/SignOut"]').click({ force: true })
	}

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()
	})

/*	it('Add Claim Entry', function () {
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

	it('Approve Externally At Manager', function () {

		//cy.EssLogin(managerID, managerID)
		expense.ApproveExternallyAtManager(manager1Remark)
	})


	it('verify Expense details At Manager Report', function () {
		//cy.EssLogin(managerID, managerID)
		expense.verifyExpensedetailsAtManagerReport(employeeID, employeeName, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmount, FinanceAmount, REJECTREMARK,
			 Status, ApproveStatus, managerID, managerName, manager1Remark)
	})

	it('verify Details From MainPage At Finance Approval', function () {
		cy.logout()
        cy.EssLogin(financeID, financeID)
        expense.verifyDetailsFromMainPageAtFinanceApproval(employeeID, currentDate, ClaimAmount, employeeName, finance1Remark)
    })

    it('verify Details From Detail Popup At Finance Approval', function () {
       // cy.EssLogin(financeID, financeID)
        expense.verifyDetailsFromDetailPopupAtFinanceApproval(employeeID, employeeName, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
            FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmount, FinanceAmount, ApproveStatus)
    })

    it('Approve Externally At Finance', function () {
      //  cy.EssLogin(financeID, financeID)
        expense.ApproveExternallyAtFinance(manager1Remark)
    })


	it('verify Expense Details At Finance Report', function () {
		//cy.EssLogin(financeID, financeID)
		expense.verifyExpenseDetailsAtFinanceReport(employeeID, employeeName, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
			FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmount, FinanceAmount, REJECTREMARK, Status)
	})
*/
	it('verify Expense Details At HR Report', function () {
		//cy.EssLogin(HrID, HrID)
		expense.verifyExpenseDetailsAtHRReport(transcationID, employeeID, employeeName, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
        FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, Status, financeRemark)
	})

	
})
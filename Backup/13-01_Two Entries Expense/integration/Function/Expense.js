

class Expense {

	addClaimEntry(currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath,
		Remark, FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, Status, managerID, managerName) {

		cy.visit(Cypress.env('essUrl') + 'Expense/Transaction/ExpenseRequests?Menu=claimentry')
		cy.wait(2000)
		cy.get('#btnOpenForm').click({ force: true })
		cy.wait(2000)

		//cy.get('#btnOpenForm').click({ force: true })
		//cy.wait(2000)

/*		cy.get('#TransNoId').then($input => {
			let transcationID = $input.val()
			cy.log('transcationID:' + transcationID)
			cy.writeFile('cypress/fixtures/Expense/Expense.json', [{ "transcationID": transcationID }])
		})
*/
		cy.get('#TransNoId').then($input => {
			let transcationID = $input.val()
			cy.log('transcationID:' + transcationID)

			var filename = 'cypress/fixtures/Expense/Expense.json'
			cy.readFile(filename).then((list) => {
				list.push({ transcationID: transcationID})
				cy.writeFile(filename, list)
			})
		})



		cy.get('#claimdate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(ClaimDate)
		})

		cy.get('[onclick="Add()"]').click({ force: true })
		cy.wait(2000)
		cy.get('#claimtype').select(ClaimType)
		cy.get('#claimtype').select(ClaimType, { force: true })
		cy.get('#claimtype').select(ClaimType)
		cy.get('#claimAmt').click({ force: true })
		cy.get('#claimAmt').clear().type(ClaimAmount);

		cy.get('#fDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(FromDate)
		})
		cy.get('#toLocId').click({ force: true })

		cy.get('#tDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(ToDate)
		})
		cy.get('#Remark').click({ force: true })
		cy.get('#Remark').clear().type(Remark);
		//cy.get('#purpose').select('Hotel',{force: true})

		cy.fixture(filePath, 'binary')
			.then(Cypress.Blob.binaryStringToBlob)
			.then(fileContent => {
				cy.get('#txt_claimproof').attachFile({
					fileContent,
					fileName: filePath,
					mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
					encoding: 'utf8'
				})
			})

		cy.get('#mode').select(Mode);
		cy.get('#purpose').select(Purpose);

		cy.get('#fromLocId').clear({ force: true })
		cy.get('#fromLocId').type(FromLocation, { force: true });

		cy.get('#toLocId').clear({ force: true })
		cy.get('#toLocId').type(ToLocation, { force: true });

		cy.get('#btnAdd').click({ force: true })
		cy.wait(2000)


		cy.get('.trData > :nth-child(2) > span').should('contain.text', ClaimType)
		cy.get('.spDate').should('contain.text', ClaimAmount)
		cy.get('.spFromHour').should('contain.text', FromDate + ' - ' + ToDate)
		cy.get(':nth-child(5) > span').should('contain.text', Remark)
		cy.get(':nth-child(7) > span').should('contain.text', Mode)
		cy.get(':nth-child(9) > span').should('contain.text', Purpose)
		cy.get(':nth-child(13) > span').should('contain.text', FromLocation)
		cy.get(':nth-child(14) > span').should('contain.text', ToLocation)
		cy.get('[colspan="8"]').should('contain.text', ClaimAmount)


		cy.get('#Remarks').clear({ force: true })
		cy.get('#Remarks').type(Remark1, { force: true });

		cy.get('#VendorNameId').clear({ force: true })
		cy.get('#VendorNameId').type(VendorName, { force: true });

		cy.get('#InvoiceNumberId').clear({ force: true })
		cy.get('#InvoiceNumberId').type(InvoiceNumberId, { force: true });

		cy.get('#crtbtn').click({ force: true })
		cy.wait(5000)
		//cy.get('.noty_body').should('have.text', "Leave Applied Successfully!!!");


	}

	VerifyDetailsAfterAddClaimEntry(currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath,
		Remark, FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, Status,
		managerLevel, managerID, managerName, managerID2, managerName2, managerID3, managerName3) {
		const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') + 'Expense/Transaction/ExpenseRequests?Menu=claimentry')
		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID
				cy.log(transcationID)
				cy.get('#EStableSorter > tbody > tr> td:nth-child(5)').each(($el, index, $list) => {
					cy.log($el.text())
					if ($el.text() == transcationID.trim()) {
						cy.get(' tbody > tr> td:nth-child(5)').eq(index).should('have.text', transcationID)

						cy.get('#EStableSorter >  tbody > tr> td:nth-child(1)').eq(index).should('contain.text', currentDate)
						cy.get('#EStableSorter >  tbody > tr> td:nth-child(2)').eq(index).should('contain.text', ClaimDate)
						cy.get(' #EStableSorter > tbody > tr> td:nth-child(3)').eq(index).should('contain.text', ClaimAmount)
						cy.get(' #EStableSorter > tbody > tr> td:nth-child(4)').eq(index).should('contain.text', Status)
						cy.get(' #EStableSorter > tbody > tr> td:nth-child(5)').eq(index).should('contain.text', transcationID)

						cy.get(' #EStableSorter > tbody > tr> td:nth-child(6)>[title="Details"]').eq(index).click({ force: true })

						cy.get('.table-mc-light-blue tr> td:nth-child(1)').eq(0).contains(transcationID)
						cy.get('.table-mc-light-blue tr> td:nth-child(2)').eq(0).contains(VendorName)
						cy.get('.table-mc-light-blue tr> td:nth-child(3)').eq(0).contains(InvoiceNumberId)

						cy.get('#tblDetails > tbody > tr > :nth-child(3)').should('have.text', ClaimType);
						cy.get('#tblDetails > tbody > tr > :nth-child(4)').should('have.text', FromDate + ' - ' + ToDate);
						cy.get('#tblDetails > tbody > tr > :nth-child(5)').should('have.text', Mode);
						cy.get('#tblDetails > tbody > tr > :nth-child(6)').should('have.text', Purpose);
						cy.get('#amtp').should('have.text', ClaimAmount);
						cy.get('tbody > tr > :nth-child(9)').should('have.text', Remark);
						cy.get(':nth-child(3) > .table > tbody > tr > :nth-child(1)').should('have.text', transcationID);
						cy.get(':nth-child(3) > .table > tbody > tr > :nth-child(2)').should('have.text', VendorName);
						cy.get(':nth-child(3) > .table > tbody > tr > :nth-child(3)').should('have.text', InvoiceNumberId);

						cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(1)').eq(0).should('have.text', '1');
						cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(2)').eq(0).should('have.text', managerID);
						cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(3)').eq(0).should('have.text', managerName);
						cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(4)').eq(0).invoke('text').then((text) => {
							assert.equal(Status.trim(), text.trim(), "Status is not match")
							//softExpect(text).to.eq(Status);
						})
						if (managerLevel == 2 || managerLevel == 2) {
							cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(1)').eq(1).should('have.text', '2');
							cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(2)').eq(1).should('have.text', managerID2);
							cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(3)').eq(1).should('have.text', managerName2);
							cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(4)').eq(1).invoke('text').then((text) => {
								assert.equal(Status.trim(), text.trim(), "Status is not match")
								//softExpect(text).to.eq(Status);
							})
						}

						else if (managerLevel == 3) {
							cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(1)').eq(2).should('have.text', '3');
							cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(2)').eq(2).should('have.text', managerID3);
							cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(3)').eq(2).should('have.text', managerName3);
							//cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(4)').eq(2).should('have.text', Status);

							cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(4)').eq(2).invoke('text').then((text) => {
								assert.equal(Status.trim(), text.trim(), "Status is not match")
								//softExpect(text).to.eq(Status);
							})
						}

						//cy.get('.table-responsive-vertical > #EStableSorter > tbody > tr > :nth-child(4)').should('have.text', Status);
						cy.get('#apprej > .modal-dialog > .modal-content > .modal-body').click();
					}
				})
			})
		})
	}

	verifyNotificationAtManager(employeeID) {
		const { softAssert, softExpect } = chai;
		cy.get('#empCount').eq(0).click({ force: true })
		cy.wait(2000)

		cy.get('.content-body >h6').eq(0).invoke('text').then((title) => {
			cy.get('.content-body >p').eq(0).invoke('text').then((Note) => {
				cy.log("title: " + title)
				cy.log("Note: " + Note)
				softExpect(title.trim()).to.contains('Expense Entry Submitted');
				softExpect(Note.trim()).to.contains(employeeID);

			})
		})
	}

	verifyDetailsFromMainPageAtManagerApproval(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
		FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, ApproveStatus) {
		const { softAssert, softExpect } = chai;

		//cy.ManagerLogin()		
		cy.visit(Cypress.env('essUrl') + 'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)

		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID

				cy.get('tbody > tr > :nth-child(10)').each(($el, index, $list) => {
					if ($el.text() == transcationID.trim()) {
						cy.get('tbody >tr> :nth-child(10)').eq(index).should('have.text', transcationID);

						cy.get('tbody >tr> :nth-child(3)').eq(index).should('contain.text', employeeID);
						cy.get('tbody>tr> :nth-child(4)').eq(index).should('contain.text', employeeName);

						cy.readFile('cypress/fixtures/Company.json').then((text) => {
							text.forEach(function (entry) {
								var company = entry.comapnayname
								cy.get('tbody >tr> :nth-child(5)').eq(index).invoke('text').then((LeaveType) => {
									expect(LeaveType.trim()).to.equal(company)
								})
							})
						})
						cy.get('tbody >tr> :nth-child(6)').eq(index).should('have.text', currentDate);
						cy.get('tbody >tr> :nth-child(7)').eq(index).should('have.text', ClaimDate);
						cy.get('tbody >tr> :nth-child(8)').eq(index).should('contain.text', ClaimAmount);
						cy.get('tbody >tr> [data-title="Approved Amount"] > #approvedAmnt').eq(index).should('contain.value', ApprovedAmountFromManager);
						cy.get('tbody >tr> :nth-child(10)').eq(index).should('have.text', transcationID);
					}
				})
			})
		})

	}
	verifyDetailsFromDetailPopupAtManagerApproval(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
		FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, ApproveStatus) {
		cy.visit(Cypress.env('essUrl') + 'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)
		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID

				cy.get('tbody > tr > :nth-child(10)').each(($el, index, $list) => {
					if ($el.text() == transcationID.trim()) {

						// cy.get('tbody >tr> :nth-child(3)').eq(index).should('contain.text', employeeID);



						cy.get('[data-title="Action"] > [data-toggle="modal"]').eq(index).click({ force: true })

						cy.get('#code').should('have.text', employeeID);
						cy.get('#fnm').should('contain.text', employeeName);
						cy.get('#tblDetails > tbody > tr > :nth-child(3)').should('have.text', ClaimType);
						cy.get('#tblDetails > tbody > tr > :nth-child(4)').should('have.text', FromDate + ' - ' + ToDate);
						cy.get('#tblDetails > tbody > tr > :nth-child(5)').should('have.text', Mode);
						cy.get('#tblDetails > tbody > tr > :nth-child(6)').should('have.text', Purpose);
						cy.get('#amtp').should('have.text', ClaimAmount);
						cy.xpath("//input[contains(@id,'appamt')]").should('contain.value', ApprovedAmountFromManager);

						cy.get('#tblDetails > tbody > tr > :nth-child(10)').should('have.text', Remark);
						cy.get('#tblDetails > tbody > tr > :nth-child(11)').should('have.text', FromLocation);
						cy.get('#tblDetails > tbody > tr > :nth-child(12)').should('have.text', ToLocation);
						cy.get(':nth-child(3) > .table > tbody > tr > :nth-child(1)').should('have.text', transcationID);
						cy.get(':nth-child(3) > .table > tbody > tr > :nth-child(2)').should('have.text', VendorName);
						cy.get(':nth-child(3) > .table > tbody > tr > :nth-child(3)').should('have.text', InvoiceNumberId);
						cy.get('.btn-danger').eq(1).click({ force: true })
						cy.wait(3000)

					}
				})
			})
		})

	}

	ApproveExternallyAtManager(manager1Remark) {
		const { softAssert, softExpect } = chai;
		cy.visit(Cypress.env('essUrl') + 'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)

		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID

				cy.get('tbody > tr > :nth-child(10)').each(($el, index, $list) => {
					if ($el.text() == transcationID.trim()) {


						cy.get('tr > [data-title="Accept"] > #rdoAccept').eq(index).check();
						cy.get('tr > [data-title="Remarks"] > #txtRemarks').eq(index).clear({ force: true }).type(manager1Remark);
						cy.get('#btnsave').click();
						cy.wait(2000)

						cy.get(".noty_body").invoke('text').then((text) => {
							softExpect(text.trim()).to.eq("Process Running In Background!");
							cy.wait(3000)
						})
					}
				})
			})
		})


	}
	ApproveFromDetailAtManager(manager1Remark, ClaimAmount, ApprovedAmountFromManager) {
		cy.visit(Cypress.env('essUrl') + 'Expense/Transaction/ExpenseApprovals?Menu=managerapproval')
		cy.wait(2000)

		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID

				cy.get('tbody > tr > :nth-child(10)').each(($el, index, $list) => {
					if ($el.text() == transcationID.trim()) {
						//click on detail button
						cy.get('[data-title="Action"] > [data-toggle="modal"]').eq(index).click({ force: true })

						cy.get('#tblDetails > tbody > tr > [data-title="Remarks"] > #txtRemarks').type(manager1Remark, { force: true });
						cy.get('#notes').type(manager1Remark, { force: true });


						if (ClaimAmount != ApprovedAmountFromManager) {
							cy.xpath("//input[contains(@id,'appamt')]").clear({ force: true }).type(ApprovedAmountFromManager, { force: true })
						}

						cy.get('#accept').click({ force: true })
						/*
						cy.get(".noty_body").invoke('text').then((text) => {
							softExpect(text.trim()).to.eq("Records Saved Successfully.!");
							cy.wait(3000)
							//cy.get(".noty_body").click({force: true})
							cy.wait(2000)
						})*/

					}
				})
			})
		})


	}

	verifyDetailsFromMainPageAtFinanceApproval(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
		FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK,
		managerID, managerName, manager1Remark, manager1Status, financeRemark) {
		const { softAssert, softExpect } = chai;

		//cy.ManagerLogin()		
		cy.visit(Cypress.env('essUrl') + 'Expense/Transaction/FinanceApproval?Menu=closeclaimentry')
		cy.wait(2000)
		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID

				cy.get('tbody > tr > :nth-child(12)').each(($el, index, $list) => {
					if ($el.text() == transcationID.trim()) {


						cy.get('tbody > tr> td:nth-child(4)').eq(index).should('have.text', employeeID);
						cy.get('tbody > tr> td:nth-child(5)').eq(index).should('contain.text', employeeName);
						cy.get('tbody > tr> td:nth-child(6)').eq(index).should('have.text', currentDate);
						cy.get('tbody > tr> td:nth-child(7)').eq(index).should('have.text', currentDate)
						cy.get('tbody > tr> td:nth-child(8)').eq(index).should('have.text', ClaimAmount)
						cy.get('tbody > tr> td:nth-child(9)').eq(index).should('contain.text', ApprovedAmountFromManager)
						cy.get('tbody > tr> td:nth-child(10)').eq(index).should('contain.text', ApprovedAmountFromFinance)
						cy.get('tbody > tr> td:nth-child(11)').eq(index).should('contain.text', manager1Status)
						cy.get('tbody > tr> td:nth-child(12)').eq(index).should('contain.text', transcationID)

					}
				})
			})
		})

	}

	verifyExpensedetailsAtManagerReport(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
		FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance,
		ApproveStatus, REJECTREMARK, managerID, managerName, manager1Remark, manager1Status, managerID2, managerName2, managerRemark2,
		managerID3, managerName3, managerRemark3, managerLevel, financeRemark, financeStatus) {
		const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') + 'Expense/Reports/MyTeamExpenseReport?Menu=expensemanagerreport')
		cy.wait(5000)

		cy.get('#bystatus').select('All')

		cy.get('#dateRange').click({ force: true }).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(ClaimDate + ' to ' + ClaimDate)
		})
		// cy.get('#select2-byempid-container').click({ force: true })
		// cy.get('[type="search"]').type(employeeID)
		// cy.wait(3000)
		// cy.get('.select2-results__option').click({ force: true })
		// cy.wait(3000)

		cy.get('#search').click({ force: true })

		cy.wait(3000)
		cy.get('#EStableSorter_length > label > .form-control').select('100')
		cy.wait(3000)
		var indexValue =
			cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
				text.forEach(function (entry) {
					var transcationID = entry.transcationID

					//array.forEach(obj => this.functionName(params));

					cy.get('#EStableSorter>tbody>tr>:nth-child(14)').each((element, index) => {
						if (element.text() == transcationID.trim()) {

							cy.get('#EStableSorter>tbody>tr> :nth-child(14)').eq(index).should('contain.text', transcationID);

							cy.get('#EStableSorter>tbody>tr> :nth-child(3)').eq(index).should('contain.text', employeeID);
							cy.get('#EStableSorter>tbody>tr> :nth-child(4)').eq(index).should('contain.text', employeeName);

							cy.readFile('cypress/fixtures/Company.json').then((text) => {
								text.forEach(function (entry) {
									var companyName = entry.comapnayname
									cy.get('#EStableSorter>tbody>tr> :nth-child(5)').eq(index).invoke('text').then((company) => {
										expect(company.trim()).to.equal(companyName)
									})
								})
							})

							cy.get('#EStableSorter>tbody>tr> :nth-child(6)').eq(index).should('contain.text', ClaimType);
							cy.get('#EStableSorter>tbody>tr> :nth-child(7)').eq(index).should('contain.text', currentDate);
							cy.get('#EStableSorter>tbody>tr> :nth-child(8)').eq(index).should('contain.text', ClaimDate);
							cy.get('#EStableSorter>tbody>tr> :nth-child(9)').eq(index).should('contain.text', ClaimAmount);


							cy.get('#EStableSorter>tbody>tr> :nth-child(10)').eq(index).invoke('text').then((text) => {
								softExpect(parseInt(text.trim())).to.eq(ApprovedAmountFromManager);
							})

							cy.get('#EStableSorter>tbody>tr> :nth-child(11)').eq(index).should('contain.text', ApprovedAmountFromFinance);
							cy.get('#EStableSorter>tbody>tr> :nth-child(12) .tag').eq(index).should('contain.text', ApproveStatus);
							cy.get('#EStableSorter>tbody>tr> :nth-child(14)').eq(index).should('contain.text', transcationID);


							cy.get('#EStableSorter> tbody > tr > :nth-child(15) > .btn').eq(index).click({ force: true })


							cy.get('#EStableSorter> tbody > tr > :nth-child(16) > .btn').eq(index).click({ force: true })
							cy.get('#fnm').should('contain.text', employeeName)
							cy.get('#status').should('have.text', manager1Status);
							cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(5) > :nth-child(2)').should('have.text', transcationID);


						}
					})

				})
			})


		this.verifyManagerRemark(managerLevel, managerID, managerName, manager1Remark, managerID2, managerName2, managerRemark2,
			managerID3, managerName3, managerRemark3)

		this.verifyDetailsPopup(employeeID, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, Remark,
			VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK,
			financeRemark, financeStatus)




	}

	verifyDetailsFromDetailPopupAtFinanceApproval(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
		FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK,
		managerID, managerName, manager1Remark, manager1Status, financeRemark) {
		const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') + 'Expense/Transaction/FinanceApproval?Menu=closeclaimentry')
		cy.wait(2000)
		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID
				cy.get('tbody > tr > :nth-child(12)').each(($el, index, $list) => {
					if ($el.text() == transcationID.trim()) {
						cy.get('tbody > tr > :nth-child(12)').should('contain.text', transcationID);

						cy.get('[title="Details"]').eq(index).click({ force: true });

						cy.get('#code').should('have.text', employeeID);
						cy.get('#fnm').should('contain.text', employeeName)

						cy.get('#status').should('have.text', manager1Status);
						cy.get('#tblDetails > tbody > tr > :nth-child(3)').should('contain.text', ClaimType)
						cy.get('#tblDetails > tbody > tr > :nth-child(4)').should('contain.text', FromDate + ' - ' + ToDate);
						cy.get('#tblDetails > tbody > tr > :nth-child(5)').should('contain.text', Mode);
						cy.get('#tblDetails > tbody > tr > :nth-child(6)').should('contain.text', Purpose);
						cy.get('#amtp').should('contain.text', ClaimAmount);
						cy.get('#tblDetails > tbody > tr > :nth-child(8)').should('contain.text', ApprovedAmountFromManager);
						cy.get('#txtFinance').should('contain.value', ApprovedAmountFromFinance);
						cy.get('#tblDetails > tbody > tr > :nth-child(11)').should('contain.text', Remark);

						cy.get(':nth-child(12) > .btn').click();


						cy.get('#MngrComments > tr > :nth-child(1)').should('contain.text', managerID);
						cy.get('#MngrComments > tr > :nth-child(2)').should('contain.text', managerName);
						cy.get('#MngrComments > tr > [style="text-align: center;"]').should('contain.text', '1');
						cy.get('#MngrComments > tr > :nth-child(4)').should('contain.text', manager1Remark);
						cy.get('#remarkModal > .modal-dialog > .modal-content > .modal-footer > .btn').click();


						cy.get('#tblDetails > tbody > tr > :nth-child(13)').should('contain.text', FromLocation);
						cy.get('#tblDetails > tbody > tr > :nth-child(14)').should('contain.text', ToLocation);
						cy.get(':nth-child(3) > .table > tbody > tr > :nth-child(1)').should('contain.text', transcationID);
						cy.get(':nth-child(3) > .table > tbody > tr > :nth-child(2)').should('contain.text', VendorName);
						cy.get(':nth-child(3) > .table > tbody > tr > :nth-child(3)').should('contain.text', InvoiceNumberId);
					}
				})
			})
		})
	}

	ApproveExternallyAtFinance(financeRemark) {
		const { softAssert, softExpect } = chai;
		cy.visit(Cypress.env('essUrl') + 'Expense/Transaction/FinanceApproval?Menu=closeclaimentry')
		cy.wait(2000)
		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID

				cy.get('tbody > tr > :nth-child(12)').each(($el, index, $list) => {

					if ($el.text() == transcationID.trim()) {

						cy.get('tr > [data-title="Accept"] > #rdoAccept').eq(index).check();
						if (financeRemark != "") {
							cy.get('tr > [data-title="Remarks"] > #txtRemarks').eq(index).clear({ force: true }).type(financeRemark);
						}
					}
				})
			})
		})
						cy.get('#btnsave').click();
						cy.wait(2000)
						cy.get(".noty_body").invoke('text').then((text) => {
							softExpect(text.trim()).to.eq("Process Running In Background!");
							cy.wait(3000)	
			
		})
	}

	ApproveFromDetailAtFinance(financeRemark) {
		const { softAssert, softExpect } = chai;
		cy.visit(Cypress.env('essUrl') + 'Expense/Transaction/FinanceApproval?Menu=closeclaimentry')
		cy.wait(2000)
		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID
				cy.get('tbody > tr > :nth-child(12)').each(($el, index, $list) => {
					if ($el.text() == transcationID.trim()) {
						//click on detail button
						cy.get('[title="Details"]').eq(index).click({ force: true });
						// cy.get('[data-title="Action"] > [data-toggle="modal"]').eq(index).click({ force: true })
						cy.get('#tblDetails > tbody > tr > [data-title="Remarks"] > #txtRemarks').type(financeRemark, { force: true });
						cy.get('#Remark').type(financeRemark, { force: true });
						cy.get('#acceptentry').click({ force: true })
						cy.get(".noty_body").invoke('text').then((text) => {
							softExpect(text.trim()).to.eq("Expense accept and closed successfully.");
							cy.wait(3000)
							//cy.get(".noty_body").click({force: true})
							cy.wait(2000)
						})
					}
				})
			})
		})
	}

	verifyExpenseDetailsAtFinanceReport(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
		FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance,
		ApproveStatus, REJECTREMARK, managerID, managerName, manager1Remark,  manager1Status, managerID2, managerName2, managerRemark2,
		managerID3, managerName3, managerRemark3, managerLevel, financeRemark, financeStatus) {
		const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') + 'Expense/Reports/FinanceReport?Menu=financereport')
		cy.wait(5000)
		cy.get('#EStableSorter_length > label > .form-control').select('100')
		cy.wait(3000)
		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID
				cy.get('tbody > tr > :nth-child(13)').each(($el, index, $list) => {
					if ($el.text() == transcationID.trim()) {
						cy.get('tbody > tr > :nth-child(13)').eq(index).should('have.text', transcationID);
						cy.get('tbody > tr > :nth-child(3)').eq(index).should('have.text', employeeID);
						cy.get('tbody > tr > :nth-child(4)').eq(index).should('contain.text', employeeName);
						cy.get('tbody > tr > :nth-child(5)').eq(index).should('contain.text', ClaimType);
						cy.get('tbody > tr > :nth-child(6)').eq(index).should('contain.text', currentDate);
						cy.get('tbody > tr > :nth-child(7)').eq(index).should('contain.text', ClaimDate);
						cy.get('tbody > tr > :nth-child(8)').eq(index).should('contain.text', ClaimAmount);
						cy.get('tbody > tr > :nth-child(9)').eq(index).should('contain.text', ApprovedAmountFromManager);
						cy.get('tbody > tr > :nth-child(10)').eq(index).should('contain.text', ApprovedAmountFromFinance);
						cy.get('tbody > tr > :nth-child(11)').eq(index).should('contain.text', currentDate);

						cy.get('tbody > tr > :nth-child(14) > .btn').eq(index).click({ force: true })

						cy.get('tbody > tr > :nth-child(15) > .btn').eq(index).click({ force: true })
						cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(5) > :nth-child(2)').should('have.text', transcationID);

					}
				})

			})
		})

		this.verifyManagerRemark(managerLevel, managerID, managerName, manager1Remark, managerID2, managerName2, managerRemark2,
			managerID3, managerName3, managerRemark3)

		this.verifyDetailsPopup(employeeID, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, Remark,
			VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK,
			financeRemark, financeStatus)
	}


	verifyExpenseDetailsAtHRReport(employeeID, employeeName, currentDate, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, filePath, Remark,
		FromLocation, ToLocation, Remark1, VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance,
		ApproveStatus, REJECTREMARK, managerID, managerName, manager1Remark,  manager1Status, managerID2, managerName2, managerRemark2,
		managerID3, managerName3, managerRemark3, managerLevel, financeRemark, financeStatus) {
		const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') + 'Expense/Reports/HRReport?Menu=hrreport')
		cy.wait(2000)
		cy.get('#EStableSorter_length > label > .form-control').select('100')
		cy.wait(2000)


		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID
				cy.log(transcationID)
				cy.get('tbody > tr > :nth-child(14)').each(($el, index, $list) => {
					cy.log($el.text())
					if ($el.text() == transcationID.trim()) {

						cy.get('tbody > tr > :nth-child(14)').eq(index).should('have.text', transcationID);
						cy.get('tbody > tr > :nth-child(3)').eq(index).should('have.text', employeeID);
						cy.get('tbody > tr > :nth-child(4)').eq(index).should('contain.text', employeeName);
						cy.get('tbody > tr > :nth-child(5)').eq(index).should('contain.text', ClaimType);
						cy.get('tbody > tr > :nth-child(6)').eq(index).should('contain.text', currentDate);
						cy.get('tbody > tr > :nth-child(7)').eq(index).should('contain.text', ClaimDate);
						cy.get('tbody > tr > :nth-child(8)').eq(index).should('contain.text', ClaimAmount);
						cy.get('tbody > tr > :nth-child(9)').eq(index).should('contain.text', ApprovedAmountFromManager);
						cy.get('tbody > tr > :nth-child(10)').eq(index).should('contain.text', ApprovedAmountFromFinance);
						cy.get('tbody > tr > :nth-child(11)').eq(index).should('contain.text', financeStatus);

						cy.get('tbody > tr > :nth-child(12) > .btn').eq(index).click({ force: true })

						cy.get('tbody > tr > :nth-child(15) > .btn').eq(index).click({ force: true })
						cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(5) > :nth-child(2)').should('have.text', transcationID);
						
					}
				})

			})
		})

		this.verifyManagerRemark(managerLevel, managerID, managerName, manager1Remark, managerID2, managerName2, managerRemark2,
			managerID3, managerName3, managerRemark3)

		this.verifyDetailsPopup(employeeID, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, Remark,
			VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK,
			financeRemark, financeStatus)

	}


	verifyManagerRemark(managerLevel, managerID, managerName, manager1Remark, managerID2, managerName2, manager1Remark2,
		managerID3, managerName3, manager1Remark3) {
		cy.get('#MngrComments > tr > :nth-child(1)').eq(0).should('contain.text', managerID);
		cy.get('#MngrComments > tr > :nth-child(2)').eq(0).should('contain.text', managerName);
		cy.get('#MngrComments > tr > [style="text-align: center;"]').eq(0).should('contain.text', '1');
		cy.get('#MngrComments > tr > :nth-child(4)').eq(0).should('contain.text', manager1Remark);

		if (managerLevel == 2 || managerLevel == 3) {
			cy.get('#MngrComments > tr > :nth-child(1)').eq(1).should('contain.text', managerID2);
			cy.get('#MngrComments > tr > :nth-child(2)').eq(1).should('contain.text', managerName2);
			cy.get('#MngrComments > tr > [style="text-align: center;"]').eq(1).should('contain.text', '2');
			cy.get('#MngrComments > tr > :nth-child(4)').eq(1).should('contain.text', manager1Remark2);
		}

		if (managerLevel == 3) {
			cy.get('#MngrComments > tr > :nth-child(1)').eq(2).should('contain.text', managerID3);
			cy.get('#MngrComments > tr > :nth-child(2)').eq(2).should('contain.text', managerName3);
			cy.get('#MngrComments > tr > [style="text-align: center;"]').eq(2).should('contain.text', '3');
			cy.get('#MngrComments > tr > :nth-child(4)').eq(2).should('contain.text', manager1Remark3);

		}
		cy.get('#remarkModal > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
		cy.wait(1000)

	}


	verifyDetailsPopup(employeeID, ClaimDate, ClaimType, ClaimAmount, FromDate, ToDate, Remark,
		VendorName, InvoiceNumberId, Mode, Purpose, ApprovedAmountFromManager, ApprovedAmountFromFinance, REJECTREMARK,
		financeRemark, financeStatus) {
		const { softAssert, softExpect, softTrue } = chai;

		cy.readFile('cypress/fixtures/Expense/Expense.json').then((text) => {
			text.forEach(function (entry) {
				var transcationID = entry.transcationID

				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(1) > :nth-child(2)').should('have.text', employeeID);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(1) > :nth-child(4)').should('have.text', ClaimType);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(2) > :nth-child(2)').should('have.text', ClaimDate);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(2) > :nth-child(4)').should('have.text', ClaimAmount);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(2) > :nth-child(6)').should('have.text', ApprovedAmountFromManager);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(2) > :nth-child(8)').should('have.text', ApprovedAmountFromFinance);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(3) > :nth-child(2)').should('have.text', FromDate);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(3) > :nth-child(4)').should('have.text', ToDate);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(3) > :nth-child(6)').should('have.text', Mode);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(4) > :nth-child(2)').should('have.text', Purpose);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(4) > :nth-child(4)').should('have.text', Remark);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(4) > :nth-child(6)').should('contain.text', financeStatus.trim());
				//cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(5) > :nth-child(2)').should('have.text', transcationID);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(5) > :nth-child(4)').should('have.text', VendorName);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(5) > :nth-child(6)').should('have.text', InvoiceNumberId);
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(6) > :nth-child(2)').invoke('text').then((text) => {
					softExpect(text.trim()).to.eq(financeRemark);
				})
				cy.get('#claimdata > .table-responsive-vertical > .table > tbody > :nth-child(6) > :nth-child(4)').should('have.text', REJECTREMARK);
				cy.get('#apprej > .modal-dialog > .modal-content > .modal-footer > .btn').click({force: true})
				cy.wait(1000)

			})
		})

	}


}



export default Expense
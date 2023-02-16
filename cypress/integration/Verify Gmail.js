
describe("New user registration", async function() {

    it("Register Form: Email is delievered", function() {
      const test_id = 'cy39test'
      const incoming_mailbox = test_id+'@gmail.co';
      cy.task("gmail:check", {
          from: "cy39test@gmail.com",
          to: incoming_mailbox,
          subject: "cy39test@gmail.com"
        })
        .then(email => {
          assert.isNotNull(email, `Email was not found`);
        });
    });



  });
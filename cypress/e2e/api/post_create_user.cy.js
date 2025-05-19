describe('Reqres User API', () => {
    const url = 'https://reqres.in/api/register';

    before(function(){
        cy.fixture('postCreateUserData.json').then((users) => {
            this.users = users;
        })
    })

    it('POST create user', function(){
        this.users.forEach(({status, responseCode, error, email, password}) => {
            cy.log(`User with ${status}`);

            let requestBody = { email, password };

            if (email !== undefined && password !== undefined) {
                requestBody.email = email;
                requestBody.password = password;
            } else if (email !== undefined) {
                requestBody.email = email;
            } else {
                requestBody.password = password;
            }
            cy.request({
                method: 'POST',
                url: `${url}`,
                body: requestBody,
                headers: {
                    'x-api-key': 'reqres-free-v1'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(responseCode);
                if (responseCode == 200){
                    expect(response.body).to.have.property('id', 4);
                    expect(response.body).to.have.property('token', 'QpwL5tke4Pnpja7X4')
                } else {
                    expect(response.body).to.have.property('error', error);
                }
            })
        })
    })
})
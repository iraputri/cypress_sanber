describe('Reqres User API', () => {
    const url = 'https://reqres.in/api/users/';

    before(function(){
        cy.fixture('getUserByIDData.json').then((users) => {
            this.users = users;
        })
    })

    it('GET user by ID', function(){
        this.users.forEach(({status, id, responseCode, expectData}) => {
            cy.log(`User is ${status}`);
            cy.request({
                method: 'GET',
                url: `${url}${id}`,
                headers: {
                    'x-api-key': 'reqres-free-v1'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(responseCode);
                if (expectData) {
                    expect(response.body.data).to.not.be.empty;
                    expect(response.body.data).to.have.property('id', id);
                } else {
                    expect(response.body).to.deep.equal({});
                }
            })
        })
    })
})
describe('Reqres User API', () => {
    const url = 'https://reqres.in/api/users/';

    before(function(){
        cy.fixture('patchUpdateUserData').then((users) => {
            this.users = users;
        })
    })

    it('PATCH update user', function(){
        this.users.forEach(({status, id, name, job}) => {
            cy.log(`Update with ${status}`);
            cy.request({
                method: 'PATCH',
                url: `${url}${id}`,
                body: { name, job },
                headers: {
                    'x-api-key': 'reqres-free-v1'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('name', name);
                expect(response.body).to.have.property('job', job);
            })
        })
    })
})
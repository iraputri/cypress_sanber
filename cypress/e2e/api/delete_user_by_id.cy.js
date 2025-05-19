describe('Reqres User API', () => {
    const url = 'https://reqres.in/api/users/';

    before(function(){
        cy.fixture('deleteUserByIDData.json').then((users) => {
            this.users = users;
        })
    })

    it('DELETE user by ID', function(){
        this.users.forEach(({status, id}) => {
            cy.log(`User is ${status}`);
            cy.request({
                method: 'DELETE',
                url: `${url}${id}`,
                headers: {
                    'x-api-key': 'reqres-free-v1'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(204);
            })
        })
    })
})
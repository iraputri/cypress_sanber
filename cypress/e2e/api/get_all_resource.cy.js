describe('Reqres Resource API', () => {
    const url = 'https://reqres.in/api/unknown';

    it('GET all unknown resource', function(){
        cy.request({
            method: 'GET',
            url: `${url}`,
            headers: {
                'x-api-key': 'reqres-free-v1'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.data).to.not.be.empty;
        })
    })
})
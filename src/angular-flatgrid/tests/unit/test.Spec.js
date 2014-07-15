describe('JavaScript addition operator', function () {
    var checkThis = true;
    //checkThis = !checkThis;
    it('adds two numbers together', function () {
        expect(1 + 2).toEqual(3);
    });
    it("should indicate true",function(){
       expect(checkThis).toBeTruthy();
    });
});
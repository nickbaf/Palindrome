describe('Score test', () => {
  
    var s=new Score("nick","a man a plan a canal panama")
    it('name should be nick', () => {
        
      expect(s.name).toBe("Nick")
      
    })
    it('score should be 27', () => {
      expect(s.points).toBe(27)
    })

    s.updateScore("banabbanabbanabbanabbanabbanab")
    it('score should be 30', () => {
      expect(s.points).toBe(30)
    })
    s.updateScore("blah")
    it('score should still be 30', () => {
      expect(s.points).toBe(30)
    }) 
  })
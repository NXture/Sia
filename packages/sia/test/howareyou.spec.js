describe('sia:howareyou', () => {
    test('answers how she is doing', async () => {
      global.nlu.brain.execute = jest.fn()
      await global.nlu.process('How are you?')
  
      const [obj] = global.nlu.brain.execute.mock.calls
      await global.brain.execute(obj[0])
  
      expect(global.brain.finalOutput.codes).toIncludeSameMembers(['howareyou'])
    })
  })
  
describe('Translation', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should change language', async () => {
    await expect(element(by.id('selectLanguage'))).toBeVisible()
    await element(by.id('selectLanguage')).tap()
    await element(by.text('English (International)')).tap()
  })

  it('should swap languages', async () => {
    await expect(element(by.id('swapLanguages'))).toBeVisible()
    await element(by.id('swapLanguages')).multiTap(2)
  })
  
  it('should translate into morse', async () => {
    await expect(element(by.id('textToTranslateInput'))).toBeVisible()
    await element(by.id('textToTranslateInput')).typeText('test')
    await expect(element(by.id('translation'))).toHaveText('- . ... -')
  })
  
  it('keyboard visible', async () => {
    await element(by.id('swapLanguages')).tap()

    await expect(element(by.id('keyboard:dash'))).toBeVisible()
    await expect(element(by.id('keyboard:dot'))).toBeVisible()
    await expect(element(by.id('keyboard:backspace'))).toBeVisible()
    await expect(element(by.id('keyboard:space'))).toBeVisible()
    await expect(element(by.id('keyboard:paste'))).toBeVisible()
  })

  it('should translate from morse', async () => {
    await element(by.id('swapLanguages')).tap()
    
    await element(by.id('keyboard:dash')).tap() // t
    await element(by.id('keyboard:space')).tap()
    await element(by.id('keyboard:dot')).tap() // e
    await element(by.id('keyboard:space')).tap()
    await element(by.id('keyboard:dot')).multiTap(3) // s
    await element(by.id('keyboard:space')).tap()
    await element(by.id('keyboard:dash')).tap() // t

    await element(by.id('keyboard:dash')).multiTap(5) // -----
    await element(by.id('keyboard:space')).tap()
    await element(by.id('keyboard:backspace')).multiTap(6) // cleaning dummy dashes
    await expect(element(by.id('translation'))).toHaveText('test')
  })
})
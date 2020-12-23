const { DeviceEventEmitter } = require("react-native")

describe('Header', () => {
  // beforeEach(async () => {
  //   await device.reloadReactNative()
  // })

  it('should have header', async () => {
    await expect(element(by.id('header'))).toBeVisible()
  })
  
  it('should display application name', async () => {
    await expect(element(by.id('header:app_name'))).toHaveText('Morselator')
  })
  
  it('should change theme', async () => {
    await element(by.id('header:theme_button')).multiTap(2)
  })
})
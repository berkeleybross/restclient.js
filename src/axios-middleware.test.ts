import { axiosMiddleware, isSuccess } from './axios-middleware'

describe('axiosMiddleware', () => {
  it('Exports axiosMiddleware', () => {
    expect(axiosMiddleware).not.toBeFalsy()
  })
})

describe('isSuccess', () => {
  test.each([[199, 300, 301, 400, 404, 410, 500]])(
    'Returns false if status indicates failure (%j)',
    async status => {
      // Act
      let result = isSuccess('GET', status)

      // Assert
      expect(result).toBe(false)
    }
  )

  test.each([[200, 201, 298, 299]])(
    'Returns true if status is valid (%j)',
    async status => {
      // Act
      let result = isSuccess('GET', status)

      // Assert
      expect(result).toBe(true)
    }
  )

  test.each([[404, 410]])(
    'Allows delete methods to have 404 and 410 (%j)',
    async status => {
      // Act
      let result = isSuccess('DELETE', status)

      // Assert
      expect(result).toBe(true)
    }
  )

  test('Returns false if status is not a number', async () => {
    // Act
    let result = isSuccess('GET', '200' as any)

    // Assert
    expect(result).toBe(false)
  })
})
import { capitalize } from '../../lib/stringUtil';

describe('capitalize', () => {
  it('capitalizes foo results in Foo', () => {
    expect(capitalize('foo')).toBe('Foo')
  })

  it('capitalizes Foo results in Foo', () => {
    expect(capitalize('Foo')).toBe('Foo')
  })

  it('capitalizes undefined results in undefined', () => {
    expect(capitalize(null)).toBeUndefined()
  })
});

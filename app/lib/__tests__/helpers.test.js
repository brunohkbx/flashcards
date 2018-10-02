import { waitFor } from '../helpers';

describe('waitFor', () => {
  it('calls setTimeout with the specified time', () => {
    jest.useFakeTimers();

    waitFor(150);

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 150);
  });
});

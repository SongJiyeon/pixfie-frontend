import React from 'react';
import renderer from 'react-test-renderer';

import { MypageScreen } from '../src/components/screens/MypageScreen';

jest.useFakeTimers();

describe('<MypageScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MypageScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

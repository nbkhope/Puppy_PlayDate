import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import { SubmitButton } from '../../../src/components/common';

describe('SubmitButton component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SubmitButton />);
  });

  test('it should contain a TouchableHighlight', () => {
    expect(component.find('TouchableHighlight').length).toBe(1);
  });

  test('it should contain a Text within the touchable component', () => {
    expect(component.find('TouchableHighlight').children().length).toBe(1);
    expect(component.find('TouchableHighlight').children().name()).toBe('Text');
  })
});

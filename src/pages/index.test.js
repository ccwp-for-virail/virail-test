import React from 'react';
import {shallow, mount} from 'enzyme';
import Home from "./index";
import Table from "../components/Table";
import Row from "../components/Row";
import { COLUMNS } from "../config";

describe('<Home />', () => {
  let wrapper;

  const days = ['2020-02-21',
    '2020-02-22',
    '2020-02-23',
    '2020-02-24',
    '2020-02-25',
    '2020-02-26',
    '2020-02-27'];

  beforeEach(() => {
    wrapper = shallow(<Home days={days}/>);
  });

  it('should render one Table', () => {
    expect(wrapper.find(Table)).toHaveLength(1);
  });

  it('should pass columns to the Table', () => {
    expect(wrapper.find(Table).props().columns).toEqual(COLUMNS);
  });

  it('should render seven Rows', () => {
    expect(wrapper.find(Row)).toHaveLength(7);
  });
});

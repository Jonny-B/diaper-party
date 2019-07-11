import React from 'react';
import {createShallow} from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16/build';
import {configure} from 'enzyme/build';
import GetUsers from '../../components/GetUsers'

configure({adapter: new Adapter()});

describe('GetUsers', () => {
    let shallow;

    beforeEach(() => {
        shallow = createShallow();
    });

    it('should render', () => {
        let wrap = shallow(<GetUsers/>);
        expect(wrap.name()).toEqual("GetUsers");
    })
});
import React from 'react';
import {createShallow} from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16/build';
import {configure} from 'enzyme/build';
import LogIn from '../../components/LogIn'

configure({adapter: new Adapter()});

describe('LogIn', () => {
    let shallow;

    beforeEach(() => {
        shallow = createShallow();
    });

    it('should render', () => {
        let wrap = shallow(<LogIn/>);
        expect(wrap.name()).toEqual("LogIn");
    })
});
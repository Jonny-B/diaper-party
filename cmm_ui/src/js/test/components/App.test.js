import React from 'react';
import {createShallow} from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16/build';
import {configure} from 'enzyme/build';
import App from '../../components/App'

configure({adapter: new Adapter()});

describe('App', () => {
    let shallow;

    beforeEach(() => {
        shallow = createShallow();
    });

    it('should render', () => {
        let wrap = shallow(<App/>);
        expect(wrap.name()).toEqual("App");
    })
});
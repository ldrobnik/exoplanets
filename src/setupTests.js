//configures the enzmye adapter for tests

import requestAnimationFrame from './tempPolyfills';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({
    adapter: new Adapter(),
    disableLifecycleMethods: true //needed to enable modification of props through different tests
});
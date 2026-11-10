import { TextEncoder, TextDecoder } from 'util';

// React Router 7 needs these APIs, which CRA's jsdom does not provide.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.IS_REACT_ACT_ENVIRONMENT = true;

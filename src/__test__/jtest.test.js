import { isGreaterEqual } from '../client/js/app.js'
import { isEmpty } from '../server/index.js'

describe('Client test', () => {
    test('check isGreaterEqual function working properly ',
        () => {
            expect(isGreaterEqual('2021-07-05', '2020-06-02')).toBeTruthy();
        }
    );
});

describe('Server test', () => {
    test('check isEmpty function is working properly',
        () => {
            expect(isEmpty({ total: 8 })).toBeFalsy();
        }
    )
})
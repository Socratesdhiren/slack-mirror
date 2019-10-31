import { http404Error, http500Error } from './httpErrorAction';
import { HTTP_404_ERROR, HTTP_500_ERROR } from '../constant/actionTypes';

describe('ACTION --- httpErrorAction', () => {
    it('should handle the http 400 error', () => {
        const httpError = http404Error('This is 400 error');
        expect(httpError).toEqual({
            type: 'HTTP_404_ERROR',
            error: 'This is 400 error',
        });
    });

    it('should handle the http 500 error', () => {
        const httpError = http500Error('This is 500 error');
        expect(httpError).toEqual({
            type: 'HTTP_500_ERROR',
            error: 'This is 500 error',
        });
    });
});

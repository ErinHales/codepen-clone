const restructureResponsePen = require('../../../server/controllers/helpers/restructureResponsePen');

describe('restructure pen tests', () => {
    const pen = {
        pen_id: 1,
        user_id: 1,
        name: 'pen',
        html: '',
        css: '',
        js: '',
        html_tag_class: '',
        head_tag: '',
        css_stylesheet: [],
        js_script: []
    }
    const results = restructureResponsePen(pen)
    test('should return defined', () => {
        expect(results).toBeDefined()
    })
    test('should be an object', () => {
        expect(typeof results).toEqual('object')
    })
    test('object should container scripts key', () => {
        expect(results.hasOwnProperty('scripts')).toBeTruthy()
    })
    test('scripts should have three properties', () => {
        expect(Object.keys(results.scripts).length).toBe(3)
    })
    test('the js property in the nested scripts object should be an array', () => {
        console.log(results.scripts.js)
        expect(Array.isArray(results.scripts.js)).toBeTruthy()
    })
})
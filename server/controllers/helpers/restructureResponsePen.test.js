const restructureResponsePen = require('./restructureResponsePen');

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
        expect(results).toBe
    })
})
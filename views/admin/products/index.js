const layout = require('../layout');

module.exports = ({products}) => {

    const renderedProducts = products.map((product) => {
        return `
        <h1>${product.title}</h1>
        `
    }).join('');


    return layout({
        content: `
    <h1 class"title">Products</h1>
    <br>
    ${renderedProducts}
    
    `
    });
};

const Products = require('../model/product_model.js');
const {
    getPostData
} = require('../util/get_post_data.js')

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};

// @desc gets all products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Products.findAll();
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(products));
    } catch (err) {
        console.log('Get All Products Error:', err);
    }
};

// @desc gets single products
// @desc GET /api/products/id
async function getProduct(req, res, id) {
    try {
        const product = await Products.findById(id);
        if (!product) {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                'message': 'Product Not Found'
            }));
        } else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify(product));
        }
    } catch (err) {
        console.log('Get All Products Error:', err);
    }
};

async function createProduct(req, res) {
    try {

        const body = await getPostData(req);

        const {
            title,
            description,
            price
        } = JSON.parse(body)

        const product = {
            title,
            description,
            price
        }
        console.log(product);

        const newProduct = await Products.create(product);
        res.writeHead(201, {
            'Content-Type': 'application/json'
        });
        return res.end(JSON.stringify(newProduct));

    } catch (err) {
        console.log('Create New Product Error:', err);
    }

}

async function updateProduct(req, res,id) {
    try {
        const product = await Products.findById(id)
        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                'message': 'Product Not Found'
            }));
        } else {

            const body = await getPostData(req);

            // This comes from the body data.
            const {
                title,
                description,
                price
            } = JSON.parse(body)

            // The || operator = don't have to fill in all fields of the update body.
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price,
            }

            const updateProduct = await Products.update(id,productData);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            return res.end(JSON.stringify(updateProduct));
        }
    } catch (err) {
        console.log('Create New Product Error:', err);
    }
}

async function deleteProduct(req, res,id) {
    try {
        const product = await Products.findById(id)
        if (!product) {
            res.writeHead(404, {
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({
                'message': 'Product Not Found'
            }));
        } else {
            await Products.remove(id);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            return res.end(JSON.stringify({'message':`Product (${id}) Successfully Deleted`}));
        }
    } catch (err) {
        console.log('Create New Product Error:', err);
    }

}

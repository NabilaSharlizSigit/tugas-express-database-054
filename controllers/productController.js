let products = [
    { id: 1, name: "Buku", price: 15000 },
    { id: 2, name: "Pulpen", price: 5000 },
];

const getAllProducts = (req, res) => {
    res.status(200).json(products);
}

const getProductById = (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if(!product){
        return res.status(404).json({
            message: "Produk tidak ditemukan."
        });
    }

    res.status(200).json(product);
};

const addProduct = (req, res) => {
    const { name, price } = req.body;

    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price
    };

    products.push(newProduct);
    res.status(201).json(newProduct);
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct
}
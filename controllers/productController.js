const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const getAllProducts = async (req, res) => {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
}

const getProductById = async (req, res) => {
    const id = Number(req.params.id);
    const product = await prisma.product.findUnique({ where: { id }});

    if(!product){
        return res.status(404).json({
            message: "Produk tidak ditemukan."
        });
    }

    res.status(200).json(product);
};

const addProduct = async (req, res) => {
    const { name, price } = req.body;
    const newProduct = await prisma.product.create({ data: { name, price }});
    res.status(201).json(newProduct);
}

const updateProduct = async (req, res) => {
    const id = Number(req.params.id);
    const { name, price } = req.body;
    const existing = await prisma.product.findUnique({ where: { id }});
    if(!existing){
        return res.status(404).json({ message: "Produk tidak ditemukan." });
    }
    const updated = await prisma.product.update({ where: { id }, data: { name, price }});
    res.status(200).json(updated);
}

const deleteProducts = async(req, res) => {
    const id = Number(req.params.id);
    const existing = await prisma.product.findUnique({ where: { id }});
    if(!existing){
        return res.status(404).json({ message: "Produk tidak ditemukan." });
    }
    await prisma.product.delete({ where: { id }});
    res.status(200).json({ message: "Produk berhasil dihapus." });
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProducts
}
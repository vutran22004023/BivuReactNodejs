import {Productservices} from '../services/index.js'


const getAllProduct = async(req, res) => {
    try{
        const {limit, page,sort, filter} = req.query
        const response = await Productservices.getAllProduct(limit || 10, Number(page) || 0,sort, filter )
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailProduct = async(req,res) => {
    try{
        const productid = req.params.id
        if(!productid) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await Productservices.getDetailProduct(productid)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const createProduct = async (req, res) => {
    try {
    const {name,image,type,rating,description,discount,categorySize,slug,linksshopee,idColor, dealsoc} = req.body;

    if(!name || !image || !type || !description || !categorySize || !slug) {
        return res.status(200).json({
            status: 'ERR',
            message: "Chưa điền đầy đủ thông tin sản phẩm"
        })
    }

    const response = await Productservices.createProduct(req.body)
    return res.status(200).json(response)
    }catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const updateProduct = async(req, res) => {
    try{
        const productid = req.params.id
        const data = req.body

        if(!productid) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await Productservices.updateProduct(productid,data)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteProduct = async(req, res) => {
    try{
        const productid = req.params.id
        if(!productid) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await Productservices.deleteProduct(productid)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteManyProduct = async(req, res) => {
    try {
        const ids = req.body.id
        if(!ids) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await Productservices.deleteProductMany(ids)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAlltypeProduct = async(req, res) => {
    try {
        const response = await Productservices.getAllTypeProduct()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getColor = async(req, res) => {
    try {
        const response = await Productservices.getAllColor()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getColorDetail = async (req, res) => {

    try{
        const id = req.params.id
        if(!id) {
            return res.status(200).json({
                status: 'Err',
                message: 'id không tồn tại'
            })
        }
        const response = await Productservices.getDetailColor(id)
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProductsdealsoc = async(req, res) => {
    try{
        const response = await Productservices.getAllProductsdealsoc()
        return res.status(200).json(response)
    }catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}


export default {
    getAllProduct,
    getDetailProduct,
    updateProduct,
    deleteProduct,
    createProduct,
    deleteManyProduct,
    getAlltypeProduct,
    getColor,
    getColorDetail,
    getAllProductsdealsoc
}
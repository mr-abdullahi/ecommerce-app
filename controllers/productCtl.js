const upload = require('../routes/upload')
const Product = require('../models/productModel')
const fs = require('fs')
const path = require('path')

const productCtl = {

    createProduct: async(req, res) => {

        try {

            if(!req.file) return res.status(400).json({msg: 'file not uploaded'})
   
            const{product_id, title, price, description, content, image, category, } = req.body
            

            const product = await Product.findOne({product_id})
            if(product)  return res.status(400).json({msg: 'this product is already exist'})

            const obj = {
                
                    data: "/images/" + req.file.filename,
                    contentType: "image/png"
            }

        
            const newProduct = new Product({

                product_id,
                title : title.toLowerCase(),
                price,
                description,
                content,
                image: obj,
                category,
                

            })

            await newProduct.save()
            res.json({msg: 'Product Created'})
          



        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getProduct: async(req, res) => {
        try {
            
           const product = await Product.find()
           res.json({product})


        } catch (error) {

            return res.status(500).json({msg: error.message})
        }
    },
    updateProduct: async(req, res) => {
        try {
            
            const{product_id, title, price, description, content, image, category} = req.body

            if(!image) return res.status(400).json({msg: 'image is not uploaded'})

            await Product.findByIdAndUpdate({_id: req.params.id},{
                product_id, 
                title : title.toLowerCase(),
                 price, 
                 description, 
                 content, 
                 image, 
                 category,
            } 
                )
                

                res.json({msg: 'Product Updated'})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteProduct: async(req, res) => {
        try {

          const product =  await Product.findByIdAndDelete({_id: req.params.id})

            fs.unlinkSync('C:/Users/Abdullahi/Desktop/halgan-ecommerce'+product.image.data);
            

            return res.status(400).json({msg: 'Product Deleted'})

        } catch (error) {

            return res.status(500).json({msg: error.message})
        }
    },



}

module.exports = productCtl
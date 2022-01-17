const Category = require('../models/categoryModel')

const categoryCtl = {
    createCategory: async (req, res) => {
        try {
           
            const {name} = req.body
            const category = await Category.findOne({name})
            if(category)  return res.status(400).json({msg: 'this category is already exist'})

            const newCategory = new Category({
                name
            })

            await newCategory.save()
            res.json({msg: 'created category'})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getCategory: async (req, res) => {
        try {
            
            const category = await Category.find()
                res.json(category)

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateCategory: async (req, res) => {
        try {
            
            const {name} = req.body
            const category = await Category.findByIdAndUpdate({_id: req.params.id}, {name})

            res.json({msg: 'updated category'})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteCategory: async (req, res) => {
        try {
            
            await Category.findByIdAndDelete({_id: req.params.id})
            res.json({msg: 'Deleted category'})

        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = categoryCtl
const { default: mongoose } = require("mongoose");
const { Products } = require("../models");


const Get_All_Products = async (req, res) => {
    try {
        const products = await Products.find({}); 

        if (!products.length) {
            return res.status(404).json({ msg: "No products found", data: [] });
        }

        res.status(200).json({ msg: "Data fetched successfully", data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};
const Get_Single_Product = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ msg: "Product ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid Product ID format" });
        }
        const product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({ msg: "No product found with that ID" });
        }

        res.status(200).json({ msg: "Product fetched successfully", data: product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};




const Upload_Products = async (req, res) => {
    try {
        const { system, product_image, product_description, product_details } = req.body;
        if (!system || !product_image || !product_description || !product_details) {
            return res.status(400).json({ msg: "All fields are required!" });
        }

        const {
            Roof_area_required,
            Annual_energy_generation,
            Cost_to_consumer,
            Annual_saving,
            System_life,
            Payback_period
        } = product_details;

        if (
            Roof_area_required === undefined ||
            Annual_energy_generation === undefined ||
            Cost_to_consumer === undefined ||
            Annual_saving === undefined ||
            System_life === undefined ||
            Payback_period === undefined
        ) {
            return res.status(400).json({ msg: "All product details are required!" });
        }
        const product = new Products({
            system,
            product_image,
            product_description,
            product_details: {
                Roof_area_required,
                Annual_energy_generation,
                Cost_to_consumer,
                Annual_saving,
                System_life,
                Payback_period
            }
        });

        await product.save(); 

        res.status(201).json({ msg: "Product saved successfully", product });
    } catch (error) {
        console.error("Error uploading product:", error);
        res.status(500).json({ msg: "Internal Server Error Occurred", error: error.message });
    }
};




module.exports={
    Get_All_Products,
    Upload_Products,
    Get_Single_Product
}
// categories

/**
 * {
        categoryId: Mongoose.Schema.Types.ObjectId,
        categoryName: String,
        categoryDescription: String,
        isPerishable: Boolean,
    }
 */


    // when it comes to groceries, we have to maintain batches because there will be cases where bananas come once daily, with shelf life 4 days
    // 


// product
/**
 * {
        productId: Mongoose.Schema.Types.ObjectId,
        productName: String,
        displayName: String,
        productDescription: String,  // ('Small Blue', 'Medium Red', etc. sizes for apparel)
        productWeight: Number,
        productUom: String,
        
        productQuantity: Number,
        lowStockQuantity: Number,

        isActive: Boolean,
        barcodeNumber: Number,
        pricing: {
            mrp: Number,
            discountPercent: Number,
            discount: Number,
        },
        categoryId: Mongoose.ObjectId (referring to Schema.categories.categoryId),
        isPerishable: Boolean, (gotten from categoryId.isPerishable)
        shelfLife: Number
    }
 */


// stock
    /**
     * 
        {
            stockId: Mongoose.Schema.Types.ObjectId,
            productId: Mongoose.Schema.Types.ObjectId,
            productQuantity: Number,
            productUom: String, //can be obtained from productId
            lowStockQuantity: Number,
            dateLastUpdated: Date
        }
     */


        
//batches
    /**
     * 
     {
         batchId: Mongoose.Schema.Types.ObjectId,
         productId: Mongoose.Schema.Types.ObjectId, // (referring to Schema product.productId)
         categoryId: Mongoose.Schema.Types.ObjectID, // referring to Schema category.categoryId
         inwardDate: Date,
         batchQuantity: Number,
         batchUom: String // once product Id is provided, the batchUom can be assigned
     }
     */

//batches will increment stock, a batch will be formed for each product batch
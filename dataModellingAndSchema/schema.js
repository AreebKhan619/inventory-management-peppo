// company
/**
 * 
 {
    _id: Mongoose.Schema.Types.ObjectId,
    companyName: String,
}
 */


// outlets

/**
 * 
    {
        _id: Mongoose.Schema.Types.ObjectId,
        companyId:  Mongoose.Schema.Types.ObjectId, //(from company._id)
        outletName: String,
        address: {
            line1: String,
            line2: String,
            pincode: Number,
            coordinates,
        },
        pointsOfContact: [
            {
                type: String,
                name: String,
                contactNo: Number
            }
        ]
    }
 */

// categories

/**
 * {
        _id: Mongoose.Schema.Types.ObjectId,
        categoryName: String,
        description: String,
        isPerishable: Boolean,
    }
 */


    // when it comes to groceries, we have to maintain batches because there will be cases where bananas come once daily, with shelf life 4 days
    // 


// product
/**
 * {
        _id: Mongoose.Schema.Types.ObjectId,
        productName: String,
        displayName: String,
        description: String,  // ('Small Blue', 'Medium Red', etc. sizes for apparel)
        unitQty: Number,
        unitUom: String,

        isActive: Boolean,
        barcodeNumber: Number,
        pricing: {
            mrp: Number,
            discountAmt: Number,
            sellingPrice: Number
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
            _id: Mongoose.Schema.Types.ObjectId,
            outletId: Mongoose.Schema.Types.ObjectId,
            productId: Mongoose.Schema.Types.ObjectId,
            inStockQty: Number,
            productUom: String, //can be obtained from productId
            lowStockQty: Number,
            lastUpdated: Date,
            storeId: Mongoose.Schema.Types.ObjectId
        }
     */


        
//batches
    /**
     * 
     {
         _id: Mongoose.Schema.Types.ObjectId,
         outletId: Mongoose.Schema.Types.ObjectId,
         productId: Mongoose.Schema.Types.ObjectId, // (referring to Schema product.productId)

         inwardDate: Date,
        mfgDate: Date, // useful in case the product selected is perishable in nature
        expDate: Date,

         batchQty: Number,
         batchUom: String // once product Id is provided, the batchUom can be assigned, and can be a superlative of the product's UoM
         isConsumed: Boolean
     }
     */

//batches will increment stock, a batch will be formed for each product batch
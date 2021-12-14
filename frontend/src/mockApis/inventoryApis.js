import productsData from "../data/products.json"
import batchesData from "../data/batches.json"
import categoriesData from "../data/categories.json"
import companyData from "../data/company.json"
import outletsData from "../data/outlets.json"
import stockData from "../data/stock.json"
import { getCategory, getProduct } from "../functions/utils"


export async function getInventoryData(outletId) {

    if (!outletId) return []

    let filteredStocks = stockData.filter(el => el.outletId === outletId)

    // console.log(filteredStocks)

    let inventoryData = productsData.map(el => {

        const _sameProds = filteredStocks.filter(_el => _el.productId === el._id)
        const totalInStock = _sameProds.reduce((acc, object) => acc + object.inStockQty, 0)

        return ({
            // ...stockData.find(_el => _el.productId === el._id),
            ..._sameProds[0],
            ...el,
            inStockQty: totalInStock,
            category: getCategory(el.categoryId)?.categoryName || ""
        })
    })

    return inventoryData
}


export async function getBatchData(outletId) {
    if (!outletId) return []


    let filteredBatches = batchesData.filter(el => el.outletId === outletId)

    let batchData = filteredBatches.map(_el => {
        const { productName, displayName, unitQty, unitUom } = getProduct(_el.productId) || ""
        return ({
            ..._el,
            productName,
            displayName,
            unitQty,
            unitUom
        })
    })

    return batchData
}
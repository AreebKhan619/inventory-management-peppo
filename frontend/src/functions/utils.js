import categoriesData from "../data/categories.json"
import productData from "../data/products.json"


const memoForCategory = {}

export const getCategory = categoryId => {
    if (!memoForCategory[categoryId]) {
        const _category = categoriesData.find(el => el._id === categoryId)
        memoForCategory[categoryId] = _category
        return _category
    }
    return memoForCategory[categoryId]
}


export const getCatList = () => {
    return categoriesData.map(el => ({
        text: el.categoryName,
        value: el.categoryName
    }))
}

const memoForProducts = {}
export const getProduct = productId => {
    if (!memoForProducts[productId]) {
        const _product = productData.find(el => el._id === productId)
        memoForProducts[productId] = _product
        return _product
    }
    return memoForProducts[productId]
}


const getLowStock = (outletId) => {

}

const getNearingExpiry = (outletId) => {

}

const getSalesWorth = (outletId) => {

}
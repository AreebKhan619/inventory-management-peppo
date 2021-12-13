import categoriesData from "../data/categories.json"

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
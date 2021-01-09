import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const getValues = async(tableObj, currentId, dir, searchResultSize, fieldName, fieldValueQuery) => {
    var regExp = new RegExp(fieldValueQuery, "i")
    if (currentId === "") {
        const data = await tableObj
            .find({ [fieldName]: regExp })
            .sort({ '_id': -1 })
            .limit(searchResultSize)
            .select({"body": 0})
            .lean()
        return data
    }
    else if (dir === "next") {
        const data = await tableObj
            .find({ [fieldName]: regExp, "_id": { $lte: ObjectId(currentId) } })
            .skip(searchResultSize)
            .limit(searchResultSize)
            .sort({ '_id': -1 })
            .select({"body": 0})
            .lean()
        return data
    }
    const data = await tableObj
        .find({ [fieldName]: regExp, "_id": { $gt: ObjectId(currentId) } })
        .limit(searchResultSize)
        .sort({ '_id': 1 })
        .select({"body": 0})
        .lean()
    return data
}

export const saveDocument = async(req, collectionObject) => {
    const { _id } = req.body

    if(_id){
        const updated = await collectionObject.updateOne({_id}, req.body)
        return updated
    }

    const created = await collectionObject.insertMany([req.body])
    return created[0]
}
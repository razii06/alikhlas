import { db } from '../configs/db.js';
import { ObjectId, ReturnDocument } from 'mongodb';

const collection = await db.collection('users');

export const test = async (req, res) => {
    let result = await collection.find({}).toArray();
    res.status(200).json(result);
}

export const getUser = async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id)};
        const user = await collection.findOne(query);

        if (!user) {
            return next({ status: 404, message: 'User not found!' });
        }
        res.status(200).json(user);
    }catch (error) {
        next({ status: 500, error});
    }
};

export const updateUser = async (req, res) => {
    try {
        if(req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const query = { _id: new ObjectId(req.params.id)};
        const data = {
            $set: {
                ...req.body,
                updateAt: new Date().toISOString(),
            },
        };
        const options = {
            ReturnDocument: 'after',
        };
        const updatedUser = await collection.findOneAndUpdate(query, data, options);
        const { password: pass, updateAt, createAt, ...rest } = updatedUser;
        res.status(200).json(updatedUser);
    } catch (error) {
        next({ status: 500, error });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        await collection.deleteOne(query);
        res.status(200).json({message: 'User has been deleted!' });
    } catch (error) {
        next({ status: 500, error });
    }
};
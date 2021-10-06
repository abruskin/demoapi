import fs from "fs";
let memoList = [];
import {query} from '../../lib/db.js';

 async function post(req, res) {
     console.log(req.body.id);
     const cql = `
         INSERT INTO aruskin.memo_by_user (id, create_timestamp, user_id, content, tags)
         VALUES(now(), toTimestamp(now()), ?, ?, ?);
`;
     const params = [
         req.body.id,
         req.body.content,
         req.body.tags
     ];
     try {
         await query(cql, params);
         res.send({
             message: 'created'
         });
     } catch (error) {
         console.log(error)
         res.status(500).send({
             message: "error",

     });
     }
 }


async function getAll(req, res) {
     const cql = `SELECT * FROM aruskin.memo_by_user WHERE user_id = ?`;
     const params = [
         req.body.id
     ];
     try {
         let memoList = await query(cql, params);
         res.send({
             memoList: memoList
         });
     } catch (error) {
         res.status(500).send({
             message: 'error'
         });
    }
}

async function getById(req, res){
    const cql = `
        SELECT * FROM aruskin.memo_by_user
        WHERE id= ? AND user_id=? AND create_timestamp =?`;
    const params = [req.params.id, req.body.id, new Date(req.body.create_timestamp)];
    try {
        let memoList = await query(cql, params);
        res.send({
            memo: memoList [0]
        });
    } catch (error) {
        if(error.code === 8704) {
            res.status(400).send({
                message: 'invalid id'
            });
        };
        res.status(500).send({
            message: 'error'
        });
    }
}

async function put(req, res){
    const cql = `
        UPDATE aruskin.memo_by_user 
        SET content=?
        WHERE id= ? AND user_id=? AND create_timestamp =?`;
    const params = [req.body.content, req.params.id, req.body.id, new Date(req.body.create_timestamp)];

    try {
        let memoList = await query(cql, params);
        res.send({
            message: 'updated'
        });
    } catch (error) {
        if(error.code === 8704) {
            res.status(400).send({
                message: 'invalid id'
            });
            return
        };
        res.status(500).send({
            message: 'error'
        });
    }
}

async function del(req, res){
    const cql = `DELETE FROM aruskin.memo_by_user  WHERE id= ? AND user_id=? AND create_timestamp =?`;
    const params = [req.params.id, req.body.id, new Date(req.body.create_timestamp)];

    try {
        let memoList = await query(cql, params);
        res.send({
            message: 'deleted'
        });
    } catch (error) {
        if(error.code === 8704) {
            res.status(400).send({
                message: 'invalid id'
            });
        };
        res.status(500).send({
            message: 'error'
        });
    }
}

export default {
    post,
    getAll,
    getById,
    put,
    del,
}

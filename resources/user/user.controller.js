import {query} from '../../lib/db.js';
import {createToken} from "../../lib/jwt.js";

async function login(req, res) {
    const cql = `
        SELECT * FROM aruskin.users WHERE username = ?;
    `;

    const params = [
        req.body.username
    ];

    try {
        const userList = await query(cql, params);
        const user = userList[0];

        if (req.body.password !== user.pass) {
            return res.send({
                message: 'invalid login'
            });
        }

        const token = await createToken(user.id);
        res.send({
            token: token
        });

    } catch (error) {
        res.status(500).send({
            message: 'error'
        });
    }
}

// async function login(req, res) {
//     const cql = `SELECT *
//                  FROM aruskin.users
//                  WHERE username = ? ALLOW FILTERING`
//     ;
//     const params = [
//         req.body.username
//     ];
//     try {
//         const userList = await query(cql, params);
//         const user = userList[0];
//
//         if (req.body.password !== user.pass) {
//             return res.send({
//                 message: 'invalid login'
//             });
//         }
//
//     const token = await createToken(user.id);
//     res.send({
//         token: token
//     });
//
// }
//
// catch
// (error)
// {
//     res.status(500).send({
//         message: 'error'
//     });
// }
// }


async function create(req, res) {
    const cql = `INSERT INTO aruskin.users (id, username, pass)
                 VALUES (now(), ?, ?)`;
    const params = [req.body.username, req.body.password]
    try {
        await query(cql, params);
        res.send({
            message: 'created'
        });
    } catch (error) {
        res.status(500).send({
            message: 'error'
        });
    }
}

export default {
    login,
    create
}
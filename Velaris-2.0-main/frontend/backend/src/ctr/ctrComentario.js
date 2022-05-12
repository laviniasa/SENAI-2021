const Comentario = require('../model/Comentario')

const create = async(req, res) => {
    const data = req.body;

    let ret = [];

    try{
        ret = await Comentario.create(data);

        delete ret.dataValues.senha;
    }catch(err){
        if(err.parent.code == 'ER_DUP_ENTRY'){
            ret = {
                msg: 'Email já cadastrado'
            }
            res.status(400);
        }
    }
    res.json(ret)
}

const read = async(req, res) => {
    const id = req.params.id;

    let filtro = {};

    if(id != undefined) filtro = { where: { id:id } }
    const ret = await Comentario.findAll(filtro);

    res.json(ret);

}

const update = async(req, res) => {
    const id = req.params.id;

    const data = req.body;

    let ret = await Comentario.update(data, {
        where : { id:id }
    })

    ret = await Comentario.findAll({
        attributes: {
            exclude: ['senha']
        },
        where : { id:id }
    })


    res.json(ret);
}

const del = async(req, res) => {
    const id = req.params.id;

    const ret = await Comentario.destroy({
        where : { id:id }
    })

    if(ret == 1){
        res.json('Id '+id+' removido com sucesso')
    }else{
        res.status(400)
    }

}

module.exports = {
    create,
    read,
    update,
    del,

}
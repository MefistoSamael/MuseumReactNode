const ApiError = require("../error/ApiError");
const {Exposition, ArtForm} = require("../models/models");

class ExpositionController{
    async create(req, res, next){
        try{
            const {name, themeId} = req.body;

            const exposition = await Exposition.create({name, themeId});

            return res.json(exposition);
        } catch (e) {
            next(ApiError.internal(`Ошибка при создании экспозиции: ${e.message}`));
        }
    }

    async getAll(req, res, next){
        try{
            const {themeId} = req.body;
            var expositions;

            if (themeId) {
                expositions = await Exposition.findAll({where: {themeId}});
            } else {
                expositions = await Exposition.findAll();
            }

            return res.json(expositions);
        } catch (error){
            next(ApiError.internal('Ошибка при получение всех экспозиций'))
        }
    }

    async getById(req, res, next){
        try{
            const {id} = req.params;
            let exposition = await Exposition.findByPk(id);

            return res.json(exposition);
        } catch (error){
            next(ApiError.internal(`Ошибка при получение экспозиции: ${error.message}`))
        }
    }


    async update(req, res, next){
        try{
            const {id} = req.params;
            const {name, themeId} = req.body;


            console.log(themeId)
            const exhibit = await Exposition.update({ name, themeId}, {
                where: {
                    id: id
                },
                returning: true, // Возвращать обновленную запись
            });

            return res.json(exhibit);
        } catch (error){
            next(ApiError.internal(`Ошибка при получение экспозиции: ${error.message}`))
        }
    }

    async delete(req, res, next){
        try{
            const id = req.params.id;
            const deletedRowCount = await Exposition.destroy({
                where: {
                    id: id
                }
            });
            if (deletedRowCount === 0) {
                return next(ApiError.notFound('Экспозиция с таким id не найдена'));
            }
            return res.json({ message: 'Экспозиция успешно удалена' });
        }catch (error) {
            next(ApiError.internal('Ошибка при удалении экспозиции'));
        }

    }
}

module.exports = new ExpositionController()
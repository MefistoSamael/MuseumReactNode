const { ArtForm } = require('../models/models');
const ApiError = require("../error/ApiError");

class ArtFormController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const artForm = await ArtForm.create({ name });
            return res.json(artForm);
        } catch (error) {
            next(ApiError.internal('Ошибка при создании формы искусства'));
        }
    }

    async getAll(req, res, next) {
        try {
            const artForms = await ArtForm.findAll();
            return res.json(artForms);
        } catch (error) {
            next(ApiError.internal(`Ошибка при получении списка форм искусства: ${error.message}`));
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const artForm = await ArtForm.findByPk(id);
            if (!artForm) {
                return next(ApiError.notFound('Форма искусства с таким id не найдена'));
            }
            return res.json(artForm);
        } catch (error) {
            next(ApiError.internal('Ошибка при получении формы искусства по id'));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const { name } = req.body;
            const [updatedRowsCount, updatedArtForm] = await ArtForm.update({ name }, {
                where: {
                    id: id
                },
                returning: true, // Возвращать обновленную запись
            });
            if (updatedRowsCount === 0) {
                return next(ApiError.notFound('Форма искусства с таким id не найдена'));
            }
            return res.json(updatedArtForm[0]);
        } catch (error) {
            next(ApiError.internal('Ошибка при обновлении формы искусства'));
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const deletedRowCount = await ArtForm.destroy({
                where: {
                    id: id
                }
            });
            if (deletedRowCount === 0) {
                return next(ApiError.notFound('Форма искусства с таким id не найдена'));
            }
            return res.json({ message: 'Форма искусства успешно удалена' });
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении формы искусства'));
        }
    }
}

module.exports = new ArtFormController();

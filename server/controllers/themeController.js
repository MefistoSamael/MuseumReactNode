const { Theme } = require('../models/models');
const ApiError = require('../error/ApiError');

class ThemeController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            const theme = await Theme.create({ name });
            return res.json(theme);
        } catch (error) {
            next(ApiError.internal('Ошибка при создании темы'));
        }
    }

    async getAll(req, res, next) {
        try {
            const themes = await Theme.findAll();
            return res.json(themes);
        } catch (error) {
            next(ApiError.internal('Ошибка при получении списка тем'));
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const theme = await Theme.findByPk(id);
            if (!theme) {
                return next(ApiError.notFound('Тема с таким id не найдена'));
            }
            return res.json(theme);
        } catch (error) {
            next(ApiError.internal('Ошибка при получении темы по id'));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const { name } = req.body;
            const [updatedRowsCount, updatedTheme] = await Theme.update({ name }, {
                where: { id },
                returning: true,
            });
            if (updatedRowsCount === 0) {
                return next(ApiError.notFound('Тема с таким id не найдена'));
            }
            return res.json(updatedTheme[0]);
        } catch (error) {
            next(ApiError.internal('Ошибка при обновлении темы'));
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const deletedRowCount = await Theme.destroy({ where: { id } });
            if (deletedRowCount === 0) {
                return next(ApiError.notFound('Тема с таким id не найдена'));
            }
            return res.json({ message: 'Тема успешно удалена' });
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении темы'));
        }
    }
}

module.exports = new ThemeController();

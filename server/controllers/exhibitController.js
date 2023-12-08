const {Exhibit, ExhibitArtForm, ArtForm} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require('uuid');
const path = require('path');

class ExhibitController {
    async create(req, res, next) {
        try {
            const { name, admission_date, expositionId, } = req.body;

            // конвертуируем массив строк в массив чисел
            const artFormIds  = req.body.artFormIds.split(" ").map((str) => +str);

            const { photo_path } = req.files;

            // Генерируем уникальное имя файла
            const fileName = uuid.v4() + '.jpg';

            // Сохраняем файл в указанную директорию
            await photo_path.mv(path.resolve(__dirname, '..', 'static', fileName));

            // Создаем экспонат в базе данных
            const exhibit = await Exhibit.create({
                name,
                admission_date,
                expositionId,
                photo_path: fileName
            });

            // Связываем экспонат с формами искусства
            if (artFormIds && artFormIds.length > 0) {
                for(const i of artFormIds) {
                         await ExhibitArtForm.create({
                             exhibitId: exhibit.id,
                             artformId: i
                         });
                }
            }

            return res.json(exhibit);
        } catch (e) {
            next(ApiError.internal(`Ошибка при создании экспоната: ${e.message}`));
        }
    }

    async getAll(req, res, next) {
        try {
            const expositionId = req.query.expositionId;

            var exhibits = new Array(0);

            // конвертуируем массив строк в массив чисел
            var artFormIds = req.body.artFormIds;
            if (artFormIds !== undefined)
                artFormIds = artFormIds.split(" ").map((str) => +str);

            if (artFormIds)
            {
                let exhibitsIds = {};

                const exhibitsArtForms = await ExhibitArtForm.findAll();
                for (const elem of exhibitsArtForms)
                {
                    if (artFormIds.includes(elem.artformId))
                        if (!exhibitsIds[elem.exhibitId])
                        {
                            exhibitsIds[elem.exhibitId] = 1;
                        }
                        else
                        {
                            exhibitsIds[elem.exhibitId]++;
                        }
                }

                for (let elem in exhibitsIds)
                {
                    if (exhibitsIds[elem] !== artFormIds.length)
                        delete exhibitsIds[elem];
                }
                if (!expositionId)
                {
                    for (const elem in exhibitsIds)
                        exhibits.push(await Exhibit.findAll({where:
                                {
                                    id: elem
                                }}));
                }
                else
                {
                    for (const elem in exhibitsIds)
                        exhibits.push(await Exhibit.findAll({where:
                                {
                                    id: elem,
                                    expositionId: expositionId
                                }}))
                }
            }
            else
            {
                if (expositionId){
                    exhibits = await  Exhibit.findAll({where: {expositionId}});
                }

                else
                    exhibits = await Exhibit.findAll();
            }


            return res.json(exhibits);
        } catch (error) {
            next(ApiError.internal(`Ошибка при получении всех экспонатов ${error.message}`));
        }
    }

    async getById(req, res, next) {
        try {
            const id = req.params.id;
            const exhibit = await Exhibit.findByPk(id);
            return res.json(exhibit);
        } catch (error) {
            next(ApiError.internal(`Ошибка при получении экспоната: ${error.message}`));
        }
    }

    async update(req, res, next) {
        try {
            const id = req.params.id;
            const { name, admission_date, expositionId,  } = req.body;

            // конвертуируем массив строк в массив чисел
            const artFormIds  = req.body.artFormIds.split(" ").map((str) => +str);

            const exhibit = await Exhibit.findByPk(id);

            // отчищаем старые связи
            await ExhibitArtForm.destroy({ where: { exhibitId: id } })

            if (!exhibit) {
                return next(ApiError.notFound('Экспонат с таким id не найден'));
            }

            // Обновляем данные экспоната
            await exhibit.update({
                name,
                admission_date,
                expositionId,
            });

            // Связываем экспонат с формами искусства
            if (artFormIds && artFormIds.length > 0) {
                for(const i of artFormIds) {
                    await ExhibitArtForm.create({
                        exhibitId: exhibit.id,
                        artformId: i
                    });
                }
            }

            return res.json(exhibit);
        } catch (error) {
            next(ApiError.internal(`Ошибка при обновлении экспоната: ${error.message}`));
        }
    }

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            const deletedRowCount = await Exhibit.destroy({
                where: {
                    id: id
                }
            });

            if (deletedRowCount === 0) {
                return next(ApiError.notFound('Экспонат с таким id не найден'));
            }

            return res.json({ message: 'Экспонат успешно удален' });
        } catch (error) {
            next(ApiError.internal('Ошибка при удалении экспоната'));
        }
    }
}

module.exports = new ExhibitController();

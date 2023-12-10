import BtcService from '../service/BtcService.js';

/** Класс Контроллер - общается с клиентом и внутр. сервером. Обрабатывает запросы и ответы.
 * @param {Object} req
 * @param {Object} res
 */

class BtcController {
  async getAll(req, res) {
    try {
      const data = await BtcService.getAll();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getDataPeriod(req, res) {
    try {
      const data = await BtcService.getDataByPeriod(req.body);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new BtcController();

import * as Yup from 'yup';
import Tools from '../shcemas/Tools';

class UserController {
  async index(req, res) {
    const { tag } = req.query;

    let where = null;
    if (tag) {
      where = { tags: tag };
    }

    const tools = await Tools.find(where);
    return res.status(200).json(tools);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      link: Yup.string().required(),
      description: Yup.string().required(),
      tags: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { title, link, description, tags } = req.body;

    const tool = await Tools.create({ title, link, description, tags });

    return res.status(201).json(tool);
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const tool = await Tools.findById(id);
    tool.remove();

    return res.status(204).json({});
  }
}

export default new UserController();

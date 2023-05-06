import Joi from "joi"

export const validateExercise = () => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    price: Joi.number().required(),
    createdAt: Joi.date().iso().required(),
    updatedAt: Joi.date().iso().required(),
  })

  return async (req, res, next) => {
    const { error } = await schema.validateAsync(req.body)
    if (error) {
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message })
    }
    next()
  }
}

export default validateExercise

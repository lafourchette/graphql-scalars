import { GraphQLScalarType, GraphQLError, Kind  } from "graphql"
import * as Joi from "@hapi/joi"

const isValidDateTime = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i);

const validate = value => {
  Joi.assert(new Date(Date.parse(value)), Joi.date().iso(), new TypeError(`Value is not a valid Date: ${value}`))
  return value;
}

export const DateTimeScalar = `scalar DateTime`

export const DateTime = new GraphQLScalarType({
  name: `DateTime`,

  description: `String of ISO-8601 date compliant.`,

  serialize(value) {
    return validate(value)
  },

  parseValue(value) {
    return validate(value)
  },

  parseLiteral({ kind, value }) {
    if (kind !== Kind.STRING) {
      throw new GraphQLError(`Can only parse strings to dates but got a: ${kind}`)
    }

    if (!isValidDateTime.test(value)) {
      throw new GraphQLError(`Value is not a valid Date format (YYYY-MM-DDTHH:MM:SS.SSSZ): ${value}`)
    }

    return validate(value)
  }
})

/* global describe, it, expect */
import { Kind } from "graphql/language"
import { DateTime } from "../"

describe(`DateTime`, () => {
  describe(`valid`, () => {
    it(`serialize`, () => {
      const now = `2018-07-24T01:28:47.940Z`;
      expect(DateTime.serialize(now)).toEqual(now)
    })

    it(`serialize (String)`, () => {
      const now = `2018-07-24T01:28:47.940Z`
      expect(DateTime.serialize(now)).toEqual(`2018-07-24T01:28:47.940Z`)
    })

    it(`parseValue`, () => {
      const now = `2018-07-24T01:28:47.940Z`
      expect(DateTime.parseValue(now)).toEqual(now)
    })

    it(`parseLiteral`, () => {
      const result = `2017-01-02T03:04:05.00Z`
      expect(
        DateTime.parseLiteral({
          value: `2017-01-02T03:04:05.00Z`,
          kind: Kind.STRING
        })
      ).toEqual(result)
    })
  })

  describe(`invalid`, () => {
    describe(`not a valid date`, () => {
      it(`serialize`, () => {
        expect(() => DateTime.serialize(`this is not a date`)).toThrow(/Value is not a valid Date/)
      })

      it(`parseValue`, () => {
        expect(() => DateTime.parseValue(`this is not a date`)).toThrow(/Value is not a valid Date/)
      })

      it(`parseLiteral`, () => {
        expect(() => DateTime.parseLiteral({ value: 123, kind: Kind.INT }))
          .toThrow(/Can only parse strings to dates but got a/)

        expect(() => DateTime.parseLiteral({ value: `this is not a date`, kind: Kind.STRING }))
          .toThrow(/Value is not a valid Date/)
      })
    })
  })
})

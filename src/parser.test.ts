import fs from "node:fs/promises";
import { describe, test, assert, expect } from "vitest";
import { parser, REPLACED_TO } from "./parser";

describe("parser", () => {
  test("s", () => {
    assert.equal(
      parser(`requires %1 parameter%s1`),
      `requires ${REPLACED_TO[0]} parameter${REPLACED_TO[1]}`
    );
  });

  test("select", () => {
    assert.equal(
      parser(`must be a %select{unary|binary|unary or binary}2 operator`),
      `must be a ${REPLACED_TO[0]} operator`
    );
  });

  test.skip("plural", () => {
    assert.equal(
      parser(`you have %1 %plural{1:mouse|:mice}1 connected to your computer`),
      `you have ${REPLACED_TO[0]} ${REPLACED_TO[1]} connected to your computer`
    );
  });

  test("ordinal", () => {
    assert.equal(
      parser(`ambiguity in %ordinal0 argument`),
      `ambiguity in ${REPLACED_TO[0]} argument`
    );
  });

  test("objcclass", () => {
    assert.equal(
      parser(`method %objcclass0 not found`),
      `method ${REPLACED_TO[0]} not found`
    );
  });

  test("objcinstance", () => {
    assert.equal(
      parser(`method %objcinstance0 not found`),
      `method ${REPLACED_TO[0]} not found`
    );
  });

  test("q", () => {
    assert.equal(
      parser(`candidate found by name lookup is %q0`),
      `candidate found by name lookup is ${REPLACED_TO[0]}`
    );
  });

  test("diff", () => {
    assert.equal(
      parser(
        `no known conversion %diff{from $ to $|from argument type to parameter type}1,2`
      ),
      `no known conversion ${REPLACED_TO[0]}`
    );
  });

  test("snapshot", async () => {
    const data = await fs.readFile("text.txt", "utf8");
    data.split("\n").forEach((text) => {
      expect(parser(text)).toMatchSnapshot();
    });
  });
});

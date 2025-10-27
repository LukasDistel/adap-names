import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";
import { delimiter } from "path";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test insert start", () => {
    let n: Name = new Name(["cs", "fau", "de"]);
    n.insert(0, "oss");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test insert end", () => {
    let n: Name = new Name(["oss", "cs", "fau"]);
    n.insert(3, "de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test invalid position insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    expect(() => {
        n.insert(4, "cs");
    }).toThrow("invalid insert position");
  });
  it("test remove", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.remove(1);
    expect(n.asString()).toBe("oss.de");
  });
  it("test append", () => {
    let n: Name = new Name(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test no components", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.getNoComponents()).toBe(4);
  });
  it("test getComponent", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.getComponent(3)).toBe('de');
  });
  it("test getComponent invalid position", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(() => {
        n.getComponent(4);
    }).toThrow("given index is out of range");
  });
  it("test setComponent", () => {
    let n: Name = new Name(["oss", "cs", "fau", "com"]);
    n.setComponent(3, 'de')
    expect(n.getComponent(3)).toBe('de');
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Human readable String Tests", () => {
  it("delimiter character in component", () => {
    // to have the componenet o.ss the dot needs to be masked, meaning in runtime the correct escaped component is o\\.ss
    let n: Name = new Name(["o\\.ss", "cs", "fau", "de"], '.');
    expect(n.asString()).toBe("o.ss.cs.fau.de");
  });
  it("escape character in component", () => {
    // component o\ss correctly escaped is o\\ss
    let n: Name = new Name(["o\\ss", "cs", "fau", "de"], '.');
    expect(n.asString()).toBe("o\\ss.cs.fau.de");
  });
  it("escape+delimiter character in component", () => {
    // to have the component o\.ss returned in the string, . and \ need to be escaped --> o\\\\.ss
    let n: Name = new Name(["o\\\\.ss", "cs", "fau", "de"], '.');
    expect(n.asString()).toBe("o\\.ss.cs.fau.de");
  });
  it("change delimiter", () => {
    // to have the componenet o.ss the dot needs to be masked, meaning in runtime the correct escaped component is o\\.ss
    let n: Name = new Name(["o\\.ss", "cs", "fau", "de"], '.');
    expect(n.asString('#')).toBe("o.ss#cs#fau#de");
  });
});

describe("Data String Tests", () => {
  it("delimiter character in component", () => {
    // to have the componenet o.ss the dot needs to be masked, meaning in runtime the correct escaped component is o\\.ss
    let n: Name = new Name(["o\\.ss", "cs", "fau", "de"], '.');
    expect(n.asDataString()).toBe("o\\.ss.cs.fau.de");
  });
  it("escape character in component", () => {
    // component o\ss correctly escaped is o\\ss
    let n: Name = new Name(["o\\ss", "cs", "fau", "de"], '.');
    expect(n.asDataString()).toBe("o\\ss.cs.fau.de");
  });
  it("escape+delimiter character in component", () => {
    // to have the component o\.ss returned in the string, . and \ need to be escaped --> o\\\\.ss
    let n: Name = new Name(["o\\\\.ss", "cs", "fau", "de"], '.');
    expect(n.asDataString()).toBe("o\\\\.ss.cs.fau.de");
  });
  it("changed delimiter", () => {
    // to have the component o\.ss returned in the string, . and \ need to be escaped --> o\\\\.ss
    let n: Name = new Name(["o\\\\#ss", "cs", "fau", "de"], '#');
    expect(n.asDataString()).toBe("o\\\\#ss#cs#fau#de");
  });
});
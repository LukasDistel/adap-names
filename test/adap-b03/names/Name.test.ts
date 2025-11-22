import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b03/names/Name";
import { StringName } from "../../../src/adap-b03/names/StringName";
import { StringArrayName } from "../../../src/adap-b03/names/StringArrayName";
import exp from "constants";

describe("Basic StringName function tests", () => {
  it("Basic initialization", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    expect(n.asDataString()).toBe("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4)
  });
  it("Empty initialization", () => {
    let n: Name = new StringName("");
    expect(n.asDataString()).toBe("");
    expect(n.getNoComponents()).toBe(1);
  });
  it("Remove empty component", () => {
    let n: Name = new StringName("");
    expect(n.asDataString()).toBe("");
    expect(n.getNoComponents()).toBe(1);
    n.remove(0)
    expect(n.getNoComponents()).toBe(0);
    expect(n.isEmpty()).toBe(true);
    expect(n.asDataString()).toBe("");
  });
  it("Add to empty name vs add to empty string", () => {
    let n: Name = new StringName("");
    n.append("oss")
    expect(n.asDataString()).toBe(".oss");
    expect(n.getNoComponents()).toBe(2);
    n.remove(1)
    expect(n.asDataString()).toBe("");
    n.remove(0)
    expect(n.isEmpty()).toBe(true);
    n.append("oss")
    expect(n.getNoComponents()).toBe(1);
    expect(n.asDataString()).toBe("oss");
  });
  it("single delimiter initialization", () => {
    let n: Name = new StringName("#", '#');
    expect(n.asDataString()).toBe("#");
    expect(n.getNoComponents()).toBe(2);
  });
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4);
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4);
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
    expect(n.getNoComponents()).toBe(3);
  });
  it("test insert start", () => {
    let n: Name = new StringName("cs.fau.de");
    n.insert(0, "oss");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test insert end", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.insert(3, "de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test invalid position insert", () => {
    let n: Name = new StringName("oss.fau.de");
    expect(() => {
        n.insert(4, "cs");
    }).toThrow("given index is out of range");
  });
  it("test no components", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4);
  });
  it("test getComponent", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    expect(n.getComponent(3)).toBe('de');
  });
  it("test getComponent invalid position", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    expect(() => {
        n.getComponent(4);
    }).toThrow("given index is out of range");
  });
  it("test setComponent", () => {
    let n: Name = new StringName("oss.cs.fau.com");
    n.setComponent(3, 'de')
    expect(n.getComponent(3)).toBe('de');
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4)
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4)
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
    expect(n.getNoComponents()).toBe(3)
  });
  it("test empty", () => {
    let n: Name = new StringArrayName(["oss"]);
    n.remove(0);
    expect(n.isEmpty()).toBe(true);
    expect(n.getNoComponents()).toBe(0)
  });
  it("Remove empty component", () => {
    let n: Name = new StringArrayName([""]);
    expect(n.asDataString()).toBe("");
    expect(n.getNoComponents()).toBe(1);
    n.remove(0)
    expect(n.getNoComponents()).toBe(0);
    expect(n.isEmpty()).toBe(true);
    expect(n.asDataString()).toBe("");
  });
  it("Add to empty name vs add to empty string", () => {
    let n: Name = new StringArrayName([""]);
    n.append("oss")
    expect(n.asDataString()).toBe(".oss");
    expect(n.getNoComponents()).toBe(2);
    n.remove(0)
    n.remove(0)
    expect(n.isEmpty()).toBe(true);
    n.append("oss")
    expect(n.getNoComponents()).toBe(1);
    expect(n.asDataString()).toBe("oss");
  });
  it("test insert start", () => {
    let n: Name = new StringArrayName(["cs", "fau", "de"]);
    n.insert(0, "oss");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test insert end", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.insert(3, "de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test invalid position insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    expect(() => {
        n.insert(4, "cs");
    }).toThrow("invalid insert position");
  });
  it("test no components", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.getNoComponents()).toBe(4);
  });
  it("test getComponent", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.getComponent(3)).toBe('de');
  });
  it("test getComponent invalid position", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(() => {
        n.getComponent(4);
    }).toThrow("given index is out of range");
  });
  it("test setComponent", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "com"]);
    n.setComponent(3, 'de')
    expect(n.getComponent(3)).toBe('de');
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("Human readable String Tests", () => {
  it("delimiter character in component", () => {
    // to have the componenet o.ss the dot needs to be masked, meaning in runtime the correct escaped component is o\\.ss
    let n: Name = new StringName("o\\.ss.cs.fau.de", '.');
    expect(n.asString()).toBe("o.ss.cs.fau.de");
  });
  it("escape character in component", () => {
    // component o\ss correctly escaped is o\\ss
    let n: Name = new StringName("o\\ss.cs.fau.de", '.');
    expect(n.asString()).toBe("o\\ss.cs.fau.de");
  });
  it("escape+delimiter character in component", () => {
    // to have the component o\.ss returned in the string, . and \ need to be escaped --> o\\\\.ss
    let n: Name = new StringName("o\\\\.ss.cs.fau.de", '.');
    expect(n.asString()).toBe("o\\.ss.cs.fau.de");
  });
  it("change delimiter", () => {
    // to have the componenet o.ss the dot needs to be masked, meaning in runtime the correct escaped component is o\\.ss
    let n: Name = new StringName("o\\.ss.cs.fau.de", '.');
    expect(n.asString('#')).toBe("o.ss#cs#fau#de");
  });
  it("delimiter character in component", () => {
    // to have the componenet o.ss the dot needs to be masked, meaning in runtime the correct escaped component is o\\.ss
    let n: Name = new StringArrayName(["o\\.ss", "cs", "fau", "de"], '.');
    expect(n.asString()).toBe("o.ss.cs.fau.de");
  });
  it("escape character in component", () => {
    // component o\ss correctly escaped is o\\ss
    let n: Name = new StringArrayName(["o\\ss", "cs", "fau", "de"], '.');
    expect(n.asString()).toBe("o\\ss.cs.fau.de");
  });
  it("escape+delimiter character in component", () => {
    // to have the component o\.ss returned in the string, . and \ need to be escaped --> o\\\\.ss
    let n: Name = new StringArrayName(["o\\\\.ss", "cs", "fau", "de"], '.');
    expect(n.asString()).toBe("o\\.ss.cs.fau.de");
  });
  it("change delimiter", () => {
    // to have the componenet o.ss the dot needs to be masked, meaning in runtime the correct escaped component is o\\.ss
    let n: Name = new StringArrayName(["o\\.ss", "cs", "fau", "de"], '.');
    expect(n.asString('#')).toBe("o.ss#cs#fau#de");
  });
});

describe("Data String Tests", () => {
  it("delimiter character in component", () => {
    // to have the componenet o.ss the dot needs to be masked, meaning in runtime the correct escaped component is o\\.ss
    let n: Name = new StringName("o\\.ss.cs.fau.de", '.');
    expect(n.asDataString()).toBe("o\\.ss.cs.fau.de");
  });
  it("escape character in component", () => {
    // component o\ss correctly escaped is o\\ss
    let n: Name = new StringName("o\\ss.cs.fau.de", '.');
    expect(n.asDataString()).toBe("o\\ss.cs.fau.de");
  });
  it("escape+delimiter character in component", () => {
    // to have the component o\.ss returned in the string, . and \ need to be escaped --> o\\\\.ss
    let n: Name = new StringName("o\\\\.ss.cs.fau.de", '.');
    expect(n.asDataString()).toBe("o\\\\.ss.cs.fau.de");
  });
  it("changed delimiter", () => {
    // to have the component o\.ss returned in the string, . and \ need to be escaped --> o\\\\.ss
    let n: Name = new StringName("o\\\\#ss#cs#fau#de", '#');
    expect(n.asDataString()).toBe("o\\\\#ss#cs#fau#de");
  });
  it("delimiter character in component", () => {
    // to have the componenet o.ss the dot needs to be masked, meaning in runtime the correct escaped component is o\\.ss
    let n: Name = new StringArrayName(["o\\.ss", "cs", "fau", "de"], '.');
    expect(n.asDataString()).toBe("o\\.ss.cs.fau.de");
  });
  it("escape character in component", () => {
    // component o\ss correctly escaped is o\\ss
    let n: Name = new StringArrayName(["o\\ss", "cs", "fau", "de"], '.');
    expect(n.asDataString()).toBe("o\\ss.cs.fau.de");
  });
  it("escape+delimiter character in component", () => {
    // to have the component o\.ss returned in the string, . and \ need to be escaped --> o\\\\.ss
    let n: Name = new StringArrayName(["o\\\\.ss", "cs", "fau", "de"], '.');
    expect(n.asDataString()).toBe("o\\\\.ss.cs.fau.de");
  });
  it("changed delimiter", () => {
    // to have the component o\.ss returned in the string, . and \ need to be escaped --> o\\\\.ss
    let n: Name = new StringArrayName(["o\\\\#ss", "cs", "fau", "de"], '#');
    expect(n.asDataString()).toBe("o\\\\#ss#cs#fau#de");
  });
});

describe("Concatenation Tests", () => {
  it("two stringArrayNames", () => {
    let a: Name = new StringArrayName(["oss", "cs"]);
    let b: Name = new StringArrayName(["fau", "de"]);
    a.concat(b);
    expect(a.asString()).toBe("oss.cs.fau.de");
    expect(a.getNoComponents()).toBe(4)
  });
  it("two stringNames", () => {
    let a: Name = new StringName("oss.cs");
    let b: Name = new StringName("fau.de");
    a.concat(b);
    expect(a.asString()).toBe("oss.cs.fau.de");
    expect(a.getNoComponents()).toBe(4)
  });
  it("stringArrayName + stringName", () => {
    let a: Name = new StringArrayName(["oss", "cs"]);
    let b: Name = new StringName("fau.de");
    a.concat(b);
    expect(a.asString()).toBe("oss.cs.fau.de");
    expect(a.getNoComponents()).toBe(4)
  });
  it("stringName + stringArrayName", () => {
    let a: Name = new StringName("oss.cs");
    let b: Name = new StringArrayName(["fau", "de"]);
    a.concat(b);
    expect(a.asString()).toBe("oss.cs.fau.de");
    expect(a.getNoComponents()).toBe(4)
  });
  it("stringArrayName + stringName with different delimiter", () => {
    let a: Name = new StringArrayName(["oss", "cs"]);
    let b: Name = new StringName("fau#de", '#');
    a.concat(b);
    expect(a.asString()).toBe("oss.cs.fau.de");
    expect(a.getNoComponents()).toBe(4)
  });
  it("stringName + stringArrayName with different delimiter", () => {
    let a: Name = new StringName("oss.cs");
    let b: Name = new StringArrayName(["fau", "de"], '#');
    a.concat(b);
    expect(a.asString()).toBe("oss.cs.fau.de");
    expect(a.getNoComponents()).toBe(4)
  });
  it("stringArrayName + stringName with different delimiter and escaped delimiter in component", () => {
    let a: Name = new StringArrayName(["oss", "cs"]);
    let b: Name = new StringName("fau#de#te.s\\#t", '#');
    a.concat(b);
    expect(a.asDataString()).toBe("oss.cs.fau.de.te\\.s#t");
    expect(a.getNoComponents()).toBe(5)
  });
  it("stringName + stringArrayName with different delimiter and escaped delimiter in component", () => {
    let a: Name = new StringName("oss.cs");
    let b: Name = new StringArrayName(["fau", "de", "te.s\\#t"], '#');
    a.concat(b);
    expect(a.asDataString()).toBe("oss.cs.fau.de.te\\.s#t");
    expect(a.getNoComponents()).toBe(5)
  });
});

describe("Equality Tests", () => {
  it("basic equality", () => {
    let a: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let b: Name = new StringName("oss.cs.fau.de");
    expect(a.isEqual(b)).toBe(true);
    expect(b.isEqual(a)).toBe(true);
    expect(a.getHashCode()).toBe(b.getHashCode())
  });
  it("basic inequality", () => {
    let a: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let b: Name = new StringName("oss.cs.fau.com");
    expect(a.isEqual(b)).toBe(false);
    expect(b.isEqual(a)).toBe(false);
    expect(a.getHashCode()).not.toBe(b.getHashCode())
  });
  it("empty equality/inequality", () => {
    let a: Name = new StringArrayName([]);
    let b: Name = new StringName("");
    expect(a.isEqual(b)).toBe(false);
    expect(b.isEqual(a)).toBe(false);
    expect(a.getHashCode()).not.toBe(b.getHashCode())
    b.remove(0)
    expect(a.isEqual(b)).toBe(true);
    expect(b.isEqual(a)).toBe(true);
    expect(a.getHashCode()).toBe(b.getHashCode())
  });
  it("empty with different delimiter/inequality", () => {
    let a: Name = new StringArrayName([], '#');
    let b: Name = new StringName("");
    b.remove(0)
    expect(a.isEqual(b)).toBe(false);
    expect(b.isEqual(a)).toBe(false);
    expect(a.getHashCode()).not.toBe(b.getHashCode())
  });
});

describe("Cloning Tests", () => {
  it("StringArrayName clone creates new object instance", () => {
    let name: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    let clone: Name = name.clone();
    expect(name).not.toBe(clone);
    expect(name.isEqual(clone)).toBe(true);
  });
  it("StringName clone creates new object instance", () => {
    let name: Name = new StringName("oss.cs.fau.de");
    let clone: Name = name.clone();
    expect(name).not.toBe(clone);
    expect(name.isEqual(clone)).toBe(true);
  });
    it("custom delimiter", () => {
    let name: Name = new StringArrayName(["oss", "cs", "fau"], "#");
    let clone: Name = name.clone();
    expect(clone.getDelimiterCharacter()).toBe("#");
    expect(name.isEqual(clone)).toBe(true);
    clone.append("de");
    expect(clone.asString()).toBe("oss#cs#fau#de"); 
  });
  it("cloning empty StringName", () => {
    let empty: Name = new StringName("");
    empty.remove(0);
    let clone = empty.clone();
    expect(clone.isEmpty()).toBe(true);
    expect(clone.isEqual(empty)).toBe(true);
    expect(clone).not.toBe(empty);
  });
});
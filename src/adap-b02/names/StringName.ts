import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        this.name = source;
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }
        this.noComponents = this.asComponentArray().length;
    }

    public asString(delimiter: string = this.delimiter): string {
        const components = this.asComponentArray();
        for (let i = 0; i < components.length; i++) {
            components[i] = components[i].replaceAll(ESCAPE_CHARACTER+this.delimiter, this.delimiter);
        }
        return components.join(delimiter);
    }

    public asDataString(): string {
        return this.name;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        if (this.getNoComponents() == 0) {
            return true;
        }
        return false;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        if (x < 0 || x >= this.getNoComponents()) {
            throw new Error("given index is out of range");
        }
        const components = this.asComponentArray();
        return components[x];
    }

    public setComponent(n: number, c: string): void {
        if (n < 0 || n >= this.getNoComponents()) {
            throw new Error("given index is out of range");
        }
        const components = this.asComponentArray();
        components[n] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        if (n < 0 || n > this.getNoComponents()) {
            throw new Error("given index is out of range");
        }
        const components = this.asComponentArray();
        components.splice(n, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1
    }

    public append(c: string): void {
        this.name = this.name + this.delimiter + c
        this.noComponents += 1
    }

    public remove(n: number): void {
        if (n < 0 || n >= this.getNoComponents()) {
            throw new Error("given index is out of range");
        }
        const components = this.asComponentArray();
        components.splice(n, 1)
        this.name = components.join(this.delimiter);
        this.noComponents -= 1
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            let component = other.getComponent(i);
            if (other.getDelimiterCharacter() !=  this.delimiter) {
                component = this.unescapeComponent(component, other.getDelimiterCharacter())
                component = this.escapeComponent(component, this.delimiter)
            }
            this.append(component);
        }
    }

    private asComponentArray(): string[] {
        const regex_escaped_delim = this.delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
        const regex_escaped_escape_char = ESCAPE_CHARACTER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 

        const splitPattern = `(?<!${regex_escaped_escape_char})${regex_escaped_delim}`;
        const regex = new RegExp(splitPattern);

        return this.name.split(regex)
    }

    private escapeComponent(c: string, delimiter: string): string {
        return c.replaceAll(delimiter, ESCAPE_CHARACTER+delimiter);
    }

    private unescapeComponent(c: string, delimiter: string): string {
        return c.replaceAll(ESCAPE_CHARACTER+delimiter, delimiter);
    }
}
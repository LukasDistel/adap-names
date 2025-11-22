import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = this.asComponentArray().length;
    }

    public clone(): StringName {
        const clone = new StringName(this.name, this.delimiter);
        if (this.isEmpty()) {
            clone.remove(0);
        }
        return clone;
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
        if (this.isEmpty()) {
            this.name = c
        } else {
            this.name = this.name + this.delimiter + c
        }
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

    private asComponentArray(): string[] {
        const regex_escaped_delim = this.delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
        const regex_escaped_escape_char = ESCAPE_CHARACTER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 

        const splitPattern = `(?<!${regex_escaped_escape_char})${regex_escaped_delim}`;
        const regex = new RegExp(splitPattern);

        return this.name.split(regex)
    }

}
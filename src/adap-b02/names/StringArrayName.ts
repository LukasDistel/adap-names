import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        // copy the components
        this.components = [...source];
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }
    }

    public asString(delimiter: string = this.delimiter): string {
        const components = [...this.components];
        for (let i = 0; i < this.components.length; i++) {
            components[i] = components[i].replaceAll(ESCAPE_CHARACTER+this.delimiter, this.delimiter);
        }
        return components.join(delimiter);
    }

    public asDataString(): string {
        return this.components.join(this.delimiter);
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
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error("given index is out of range");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error("given index is out of range");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i > this.getNoComponents()) {
            throw new Error("invalid insert position");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new Error("given index is out of range");
        }
        this.components.splice(i, 1)
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

    private escapeComponent(c: string, delimiter: string): string {
        return c.replaceAll(delimiter, ESCAPE_CHARACTER+delimiter);
    }

    private unescapeComponent(c: string, delimiter: string): string {
        return c.replaceAll(ESCAPE_CHARACTER+delimiter, delimiter);
    }
    
}
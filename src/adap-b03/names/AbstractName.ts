import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        if (delimiter != undefined) {
            this.delimiter = delimiter;
        }
    }

    abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        const components = []
        for (let i = 0; i < this.getNoComponents(); i++) {
            let component = this.getComponent(i)
            component = component.replaceAll(ESCAPE_CHARACTER+this.delimiter, this.delimiter);
            components.push(component)
        }
        return components.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        const components = []
        for (let i = 0; i < this.getNoComponents(); i++) {
            components.push(this.getComponent(i))
        }
        return components.join(this.delimiter);
    }

    public isEqual(other: Name): boolean {
        const sameDataString = this.asDataString() == other.asDataString()
        const sameNoCharacters = this.getNoComponents() == other.getNoComponents()
        const sameDelimiter = this.getDelimiterCharacter() == other.getDelimiterCharacter()
        return sameDataString && sameNoCharacters && sameDelimiter
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = `${this.getDelimiterCharacter()}${this.getNoComponents()}${this.asDataString()}`;
        for (let i: number = 0; i < s.length; i++) {
            let c: number = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        if (this.getNoComponents() == 0) {
            return true;
        }
        return false;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

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
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertIsValidDelimiterCharacter(delimiter);
        this.delimiter = delimiter;
    }

    public clone(): Name {
        const clone = this.makeClone();

        MethodFailedException.assert(clone != this, 'Clone is the same object')
        MethodFailedException.assert(this.isEqual(clone), 'Clone is not equal to original')

        return clone
    }

    protected abstract makeClone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        this.assertIsValidDelimiterCharacter(delimiter);

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
        IllegalArgumentException.assert(other != null, 'other can not be null');

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

    public abstract getNoComponents(): number;

    public getComponent(i: number): string {
        this.assertIsValidIndex(i);

        const component = this.doGetComponent(i);

        MethodFailedException.assert(component != null, 'Returned Component was null')

        return component
    }

    protected abstract doGetComponent(i: number): string;

    public setComponent(i: number, c: string): void {
        this.assertIsValidIndex(i);
        this.assertIsValidComponent(c);
        const previous_length = this.getNoComponents()

        this.doSetComponent(i, c);

        MethodFailedException.assert(c == this.doGetComponent(i), 'Component was not succesfully set');
        MethodFailedException.assert(previous_length == this.getNoComponents(), 'Number of components changed');

        this.asssertIsValidInternalState();
    }

    protected abstract doSetComponent(i: number, c: string): void;

    public insert(i: number, c: string): void {
        IllegalArgumentException.assert((i >= 0 || i <= this.getNoComponents()), 'Index out of range');
        this.assertIsValidComponent(c);
        const previous_length = this.getNoComponents()

        this.doInsert(i, c);

        MethodFailedException.assert(c == this.doGetComponent(i), 'Component was not succesfully inserted');
        MethodFailedException.assert(previous_length+1 == this.getNoComponents(), 'Number of components did not increase by one');

        this.asssertIsValidInternalState();
    }

    protected abstract doInsert(i: number, c: string): void;

    public append(c: string): void {
        this.assertIsValidComponent(c);
        const previous_length = this.getNoComponents()

        this.doAppend(c);

        MethodFailedException.assert(c == this.doGetComponent(this.getNoComponents()-1), 'Component was not succesfully appended');
        MethodFailedException.assert(previous_length+1 == this.getNoComponents(), 'Number of components did not increase by one');

        this.asssertIsValidInternalState();
    }

    protected abstract doAppend(c: string): void;

    public remove(i: number): void {
        this.assertIsValidIndex(i);
        const previous_length = this.getNoComponents();

        this.doRemove(i);

        MethodFailedException.assert(previous_length-1 == this.getNoComponents(), 'Number of components did not deacrease by one');

        this.asssertIsValidInternalState();
    }

    protected abstract doRemove(i: number): void;

    public concat(other: Name): void {
        IllegalArgumentException.assert(other != null, 'other can not be null');
        const previous_length = this.getNoComponents();

        for (let i = 0; i < other.getNoComponents(); i++) {
            let component = other.getComponent(i);
            if (other.getDelimiterCharacter() !=  this.delimiter) {
                component = this.unescapeComponent(component, other.getDelimiterCharacter())
                component = this.escapeComponent(component, this.delimiter)
            }
            this.append(component);
        }

        MethodFailedException.assert(previous_length+other.getNoComponents() == this.getNoComponents(), 'Number of components does not match previous length + other length');

        this.asssertIsValidInternalState()
    }

    private escapeComponent(c: string, delimiter: string): string {
        return c.replaceAll(delimiter, ESCAPE_CHARACTER+delimiter);
    }

    private unescapeComponent(c: string, delimiter: string): string {
        return c.replaceAll(ESCAPE_CHARACTER+delimiter, delimiter);
    }

    protected assertIsValidDelimiterCharacter(delimiter: string): void {
        IllegalArgumentException.assert(delimiter.length == 1, 'Delimiter must be one single character');
        IllegalArgumentException.assert(delimiter != ESCAPE_CHARACTER, 'Delimiter can not be set to be same as Escape Character');
    }

    protected asssertIsValidInternalState(): void {
        this.assertDelimiterIsValidInternalState();
        this.assertNameIsValidInternalState();
    }

    protected assertDelimiterIsValidInternalState(): void {
        InvalidStateException.assert(this.delimiter.length == 1, 'Delimiter must be one single character');
        InvalidStateException.assert(this.delimiter != ESCAPE_CHARACTER, 'Delimiter can not be same as Escape Character');
    }

    protected abstract assertNameIsValidInternalState(): void;

    protected assertIsValidIndex(index: number): void {
        IllegalArgumentException.assert((index >= 0 || index < this.getNoComponents()), 'Index out of range');
    }

    protected assertIsValidComponent(c: string): void {
        IllegalArgumentException.assert(c != null, 'Component must be a string');
        IllegalArgumentException.assert(c.split(this.getDelimiterCharacter()).length == c.split(ESCAPE_CHARACTER+this.getDelimiterCharacter()).length, 'Component is not properly masked, delimiter characters need to be escaped')
        IllegalArgumentException.assert(c.slice(-1) != ESCAPE_CHARACTER, 'Last character of component can not be escape character')
    }
}
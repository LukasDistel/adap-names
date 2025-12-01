import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...source];
    }

    protected assertNameIsValidInternalState(): void {
        InvalidStateException.assert(this.components != null, 'Component Array can not be null');
        for (let index = 0; index < this.getNoComponents(); index++) {
            InvalidStateException.assert(this.doGetComponent(index) != null, 'Component Array contains null component');            
        }
    }

    public makeClone(): StringArrayName {
        return new StringArrayName(this.components, this.delimiter)
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    protected doGetComponent(i: number): string {
        return this.components[i];
    }

    public doSetComponent(i: number, c: string): void {
        this.components[i] = c;
    }

    public doInsert(i: number, c: string): void {
        this.components.splice(i, 0, c);
    }

    public doAppend(c: string): void {
        this.components.push(c);
    }

    public doRemove(i: number): void {
        this.components.splice(i, 1)
    }

}
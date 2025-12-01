import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        IllegalArgumentException.assert(this.doGetFileState() != FileState.DELETED, 'Can not open a deleted file');
        IllegalArgumentException.assert(this.doGetFileState() != FileState.OPEN, 'Can not open a already opened file');

        // do something
    }

    public read(noBytes: number): Int8Array {
        IllegalArgumentException.assert(this.doGetFileState() == FileState.OPEN, 'Can only read from an open file');
        IllegalArgumentException.assert(noBytes >= 0, 'Can not read negative amount of bytes')

        // read something
        return new Int8Array();
    }

    public close(): void {
        IllegalArgumentException.assert(this.doGetFileState() != FileState.DELETED, 'Can not close a deleted file');
        IllegalArgumentException.assert(this.doGetFileState() != FileState.CLOSED, 'Can not close a closed file');
        IllegalArgumentException.assert(this.doGetFileState() == FileState.OPEN, 'Can not close a file that is not open');

        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}
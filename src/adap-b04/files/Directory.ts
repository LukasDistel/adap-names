import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        IllegalArgumentException.assert(!this.hasChildNode(cn), 'Child node already exist')
        this.assertIsValidNode(cn);

        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        IllegalArgumentException.assert(this.hasChildNode(cn), 'Child node does not exist')
        this.assertIsValidNode(cn);

        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    protected assertIsValidNode(n: Node): void {
        IllegalArgumentException.assert(n != null, 'Input is not a valid Node');
    }
}
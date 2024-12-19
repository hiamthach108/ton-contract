import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type TutorialConfig = {};

export function tutorialConfigToCell(config: TutorialConfig): Cell {
    return beginCell().endCell();
}

export class Tutorial implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Tutorial(address);
    }

    static createFromConfig(config: TutorialConfig, code: Cell, workchain = 0) {
        const data = tutorialConfigToCell(config);
        const init = { code, data };
        return new Tutorial(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}

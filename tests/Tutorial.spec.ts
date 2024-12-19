import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Tutorial } from '../wrappers/Tutorial';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Tutorial', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Tutorial');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tutorial: SandboxContract<Tutorial>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tutorial = blockchain.openContract(Tutorial.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tutorial.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tutorial.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tutorial are ready to use
    });
});

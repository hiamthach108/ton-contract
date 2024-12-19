import { toNano } from '@ton/core';
import { Tutorial } from '../wrappers/Tutorial';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tutorial = provider.open(Tutorial.createFromConfig({}, await compile('Tutorial')));

    await tutorial.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(tutorial.address);

    // run methods on `tutorial`
}

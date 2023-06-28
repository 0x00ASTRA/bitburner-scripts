/** A script for buying servers
 * 
 * ex: ./buyServer.js 1024 hack 
 * -> buys the max amount of servers
 *    possible with 1TB RAM and hostname 'hack'.  
 */

/** @param {NS} ns */
export async function main(ns) {
	// get the max amount of servers you can purchase
	const limit = ns.getPurchasedServerLimit();
	const size = ns.args[0] ? (ns.args[0]) : (1024); // RAM size
	const name = ns.args[1] ? (ns.args[1]) : ('arch');

	for (let i = 0; i <= limit; i++) {
		let done = false;

		while (!done) {
			try {
				ns.purchaseServer(name, size);
				ns.toast('New Server In the arsenal', 'success');
				done = true;
			}
			catch (error) {
				ns.toast(error, 'error', 4000);
			}
		}
	}
}
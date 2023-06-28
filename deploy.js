/** @param {NS} ns */
export async function main(ns) {
	const scanList = ns.scan('home');
	const script = ns.args[0];
	const scriptRam = ns.getScriptRam(script);
	let target;

	ns.args[1] ? (target = ns.args[1]) : (target = null);

	for (const item of scanList) {
		if (item.includes('arch')) {
			// kill all running scripts
			ns.killall(item);

			// copy the script to the server
			ns.scp(script, item, 'home');

			// calculate threads
			const free = ns.getServerMaxRam(item) - ns.getServerUsedRam(item);
			const threads = Math.floor(free / scriptRam);

			// execute the script
			target ? (ns.exec(script, item, threads, target)) : (ns.exec(script, item, threads));
		}
	}
}
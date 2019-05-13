const etherToWei = (value) => value * 1000000000000000000;
const weiToEther = (value) => Math.round(value / 1000000000000000000 * 100) / 100;

export { weiToEther, etherToWei };

const { ether, BN } = require("@openzeppelin/test-helpers")
const JSON = '0xc0B356E1365B4F2Fcca0Cf31f17e11c81A0313C7_quidax'
const param = require("./deploy_config/" + JSON + ".json");
let config = {}
config.JulPadPresale = param.JulPadPresale;
config.JulPadToken = param.JulPadToken
config.JulPadPresaleTimer = param.JulPadPresaleTimer;

config.tierLock = {
  rewardToken: '0x32dFFc3fE8E3EF3571bF8a72c0d0015C5373f41D', // JULb
  TierLimit: [
    '1', // start tier - 1 julb
    (25 * 1e18).toLocaleString().replace(/,/g, ''), // bronze tier - 25 julb
    (100 * 1e18).toLocaleString().replace(/,/g, ''), // silver tier - 100 julb
    (500 * 1e18).toLocaleString().replace(/,/g, ''), // gold tier - 500 julb
    (2500 * 1e18).toLocaleString().replace(/,/g, ''), // platinum tier - 5000 julb
  ],
  TierBP: [
    1000, 1000, 2500, 3000, 3500
    // 10%, 10%, 25%, 30%, 35%
  ],
  unlockTimestamp: [
    10 * 24 * 3600, // 10 days
    20 * 24 * 3600, // 20 days
    30 * 24 * 3600, // 30 days
    60 * 24 * 3600, // 60 days
    90 * 24 * 3600, // 90 days
  ],
  unlockBP: [
    7000, 7500, 8000, 9000, 9500
    // 70%, 75%, 80%, 90%, 95%
  ]
};
module.exports = config

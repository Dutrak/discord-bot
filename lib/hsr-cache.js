import { starRailClient } from './hsr.js';

starRailClient.cachedAssetsManager.activateAutoCacheUpdater({
  instant: true,
  timeout: 60 * 60 * 1000, // 1 hour
  onUpdateStart: async () => {
      console.log('Updating Star Rail Data...');
  },
  onUpdateEnd: async () => {
    starRailClient.cachedAssetsManager.refreshAllData();
      console.log('Updating Completed!');
  },
});